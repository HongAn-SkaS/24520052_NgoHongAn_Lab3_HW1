
import { useCallback, useEffect, useRef, useState } from "react";

function createNoiseBuffer(audioContext, duration) {
  const frameCount = Math.floor(
    audioContext.sampleRate * duration,
  );

  const buffer = audioContext.createBuffer(
    1,
    frameCount,
    audioContext.sampleRate,
  );

  const channelData = buffer.getChannelData(0);

  for (let i = 0; i < frameCount; i += 1) {
    channelData[i] = Math.random() * 2 - 1;
  }

  return buffer;
}

function createNoiseSound(
  audioContext,
  destination,
  options,
) {
  const {
    duration,
    frequency,
    volume,
    bursts = 1,
  } = options;

  const now = audioContext.currentTime;

  for (let i = 0; i < bursts; i += 1) {
    const startTime = now + i * 0.035;

    const source = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();

    source.buffer = createNoiseBuffer(
      audioContext,
      duration,
    );

    filter.type = "highpass";
    filter.frequency.setValueAtTime(
      frequency,
      startTime,
    );

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(
      volume / bursts,
      startTime + 0.005,
    );
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      startTime + duration,
    );

    source.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    source.start(startTime);
    source.stop(startTime + duration);
  }
}

function createOscillatorSound(
  audioContext,
  destination,
  options,
) {
  const {
    frequency,
    endFrequency = frequency,
    duration,
    volume,
    type = "sine",
  } = options;

  const now = audioContext.currentTime;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = type;

  oscillator.frequency.setValueAtTime(
    frequency,
    now,
  );

  oscillator.frequency.exponentialRampToValueAtTime(
    endFrequency,
    now + duration,
  );

  gain.gain.setValueAtTime(0.0001, now);

  gain.gain.exponentialRampToValueAtTime(
    volume,
    now + 0.005,
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + duration,
  );

  oscillator.connect(gain);
  gain.connect(destination);

  oscillator.start(now);
  oscillator.stop(now + duration);
}

function playDrumSound(
  audioContext,
  destination,
  sound,
) {
  switch (sound) {
    case "clap":
      createNoiseSound(audioContext, destination, {
        duration: 0.16,
        frequency: 1000,
        volume: 0.7,
        bursts: 3,
      });
      break;

    case "hihat":
      createNoiseSound(audioContext, destination, {
        duration: 0.08,
        frequency: 7000,
        volume: 0.35,
      });
      break;

    case "kick":
      createOscillatorSound(audioContext, destination, {
        frequency: 150,
        endFrequency: 42,
        duration: 0.35,
        volume: 0.9,
      });
      break;

    case "openhat":
      createNoiseSound(audioContext, destination, {
        duration: 0.45,
        frequency: 5500,
        volume: 0.4,
      });
      break;

    case "boom":
      createOscillatorSound(audioContext, destination, {
        frequency: 100,
        endFrequency: 28,
        duration: 0.65,
        volume: 0.95,
      });
      break;

    case "ride":
      createNoiseSound(audioContext, destination, {
        duration: 0.55,
        frequency: 4500,
        volume: 0.3,
      });
      break;

    case "snare":
      createNoiseSound(audioContext, destination, {
        duration: 0.2,
        frequency: 1200,
        volume: 0.65,
      });

      createOscillatorSound(audioContext, destination, {
        frequency: 190,
        endFrequency: 110,
        duration: 0.12,
        volume: 0.3,
      });
      break;

    default:
      break;
  }
}

export function useAudioEngine() {
  const audioContextRef = useRef(null);
  const masterGainRef = useRef(null);
  const analyserRef = useRef(null);

  const [isAudioReady, setIsAudioReady] = useState(false);

  const initializeAudio = useCallback(() => {
    if (audioContextRef.current) {
      return audioContextRef.current;
    }

    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      throw new Error("Web Audio API is not supported.");
    }

    const audioContext = new AudioContextClass();

    const masterGain = audioContext.createGain();
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 256;

    masterGain.gain.value = 0.7;

    masterGain.connect(analyser);
    analyser.connect(audioContext.destination);

    audioContextRef.current = audioContext;
    masterGainRef.current = masterGain;
    analyserRef.current = analyser;

    setIsAudioReady(true);

    return audioContext;
  }, []);

  
const playSound = useCallback(async (sound) => {
  try {
    const audioContext = initializeAudio();

    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    const isRunning = audioContext.state === "running";

    setIsAudioReady(isRunning);

    if (!isRunning) {
      return;
    }

    playDrumSound(
      audioContext,
      masterGainRef.current,
      sound
    );
  } catch (error) {
    setIsAudioReady(false);
    console.error("Audio playback failed:", error);
  }
}, [initializeAudio]);


  useEffect(() => {
    return () => {
      const audioContext = audioContextRef.current;

      audioContextRef.current = null;
      masterGainRef.current = null;
      analyserRef.current = null;

      if (audioContext && audioContext.state !== "closed") {
        void audioContext.close();
      }
    };
  }, []);

  return {
    playSound,
    analyserRef,
    isAudioReady,
  };
}
