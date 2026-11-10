
import { useEffect, useState } from "react";
import "./DecibelMeter.css";

const MIN_DECIBELS = -60;
const MAX_DECIBELS = 0;

function calculateAudioLevel(analyser) {
  const samples = new Uint8Array(analyser.fftSize);

  analyser.getByteTimeDomainData(samples);

  let sumOfSquares = 0;

  for (const sample of samples) {
    const normalizedSample = (sample - 128) / 128;
    sumOfSquares += normalizedSample * normalizedSample;
  }

  const rms = Math.sqrt(sumOfSquares / samples.length);

  if (rms === 0) {
    return MIN_DECIBELS;
  }

  return Math.max(
    MIN_DECIBELS,
    20 * Math.log10(rms)
  );
}

export function DecibelMeter({ analyserRef, isAudioReady }) {
  const [decibels, setDecibels] = useState(MIN_DECIBELS);

  useEffect(() => {
    const analyser = analyserRef.current;

    if (!isAudioReady || !analyser) {
      setDecibels(MIN_DECIBELS);
      return undefined;
    }

    let animationFrameId;

    const updateMeter = () => {
      const currentLevel = calculateAudioLevel(analyser);

      setDecibels(currentLevel);

      animationFrameId = window.requestAnimationFrame(updateMeter);
    };

    animationFrameId = window.requestAnimationFrame(updateMeter);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [analyserRef, isAudioReady]);

  const percentage =
    ((decibels - MIN_DECIBELS) /
      (MAX_DECIBELS - MIN_DECIBELS)) * 100;

  
return (
  <section
    className="decibel-meter"
    aria-labelledby="decibel-meter-title"
  >
    <header className="decibel-meter__header">
      <h2 id="decibel-meter-title">Audio Level</h2>

      <output className="decibel-meter__value">
        {decibels.toFixed(1)} dBFS
      </output>
    </header>

    <meter
      className="decibel-meter__track"
      min={MIN_DECIBELS}
      max={MAX_DECIBELS}
      value={decibels}
      aria-label="Current audio signal level"
    >
      {percentage}%
    </meter>

    <footer className="decibel-meter__scale">
      <span>-60 dBFS</span>
      <span>-30 dBFS</span>
      <span>0 dBFS</span>
    </footer>
  </section>
);

  
}
