
import { useCallback, useEffect, useRef, useState } from "react";

import { DRUM_PADS, DRUM_PAD_MAP } from "../../data/drumPads";
import { useDrumKeyboard } from "../../hooks/useDrumKeyboard";
import { useAudioEngine } from "../../hooks/useAudioEngine";

import { DrumPad } from "../DrumPad/DrumPad";
import { DecibelMeter } from "../DecibelMeter/DecibelMeter";
import { HitHistory } from "../HitHistory/HitHistory";

import "./DrumKit.css";

export function DrumKit() {
  const [hitHistory, setHitHistory] = useState([]);
  const [latestAnnouncement, setLatestAnnouncement] = useState("");
  const [activePadId, setActivePadId] = useState(null);
  const [isEnabled, setIsEnabled] = useState(true);

  const hitIdRef = useRef(0);
  const activeTimerRef = useRef(null);

  const { playSound, analyserRef, isAudioReady } = useAudioEngine();

  const releasePad = useCallback(() => {
    window.clearTimeout(activeTimerRef.current);
    activeTimerRef.current = null;
    setActivePadId(null);
  }, []);

  const triggerPad = useCallback(
    (padId) => {
      const pad = DRUM_PADS.find((item) => item.id === padId);

      if (!pad) {
        return;
      }

      void playSound(pad.sound);

      setActivePadId(padId);

      window.clearTimeout(activeTimerRef.current);

      activeTimerRef.current = window.setTimeout(() => {
        setActivePadId(null);
        activeTimerRef.current = null;
      }, 160);

      hitIdRef.current += 1;

      const hitNumber = hitIdRef.current;
      const now = new Date();

      const hit = {
        id: hitNumber,
        padId: pad.id,
        padName: pad.name,
        key: pad.key,
        timestamp: now.toISOString(),
        displayTime: now.toLocaleTimeString(),
      };

      setHitHistory((previousHits) =>
        [hit, ...previousHits].slice(0, 8)
      );

      setLatestAnnouncement(
        `Hit ${hitNumber}: ${pad.name}, keyboard shortcut ${pad.key}`
      );
    },
    [playSound, setActivePadId]
  );

  useDrumKeyboard(
    DRUM_PAD_MAP,
    triggerPad,
    isEnabled,
    releasePad
  );

  useEffect(() => {
    return () => {
      window.clearTimeout(activeTimerRef.current);
    };
  }, []);

  return (
    <section className="drum-kit" aria-labelledby="drum-kit-title">
      <header className="drum-kit__header">
        <section>
          <h2 id="drum-kit-title">Drum Machine</h2>
          <p>Play using your keyboard or select a drum pad.</p>
        </section>

        <button
          className="drum-kit__toggle"
          type="button"
          aria-pressed={isEnabled}
          aria-label="Toggle drum keyboard shortcuts"
          onClick={() => setIsEnabled((previous) => !previous)}
        >
          Keyboard: {isEnabled ? "On" : "Off"}
        </button>
      </header>

      <p className="drum-kit__audio-status" role="status">
        {isAudioReady
          ? "Audio engine ready"
          : "Audio engine waiting for interaction"}
      </p>

      <section className="drum-kit__grid" aria-label="Drum pads">
        {DRUM_PADS.map((pad) => (
          <DrumPad
            key={pad.id}
            pad={pad}
            isActive={activePadId === pad.id}
            onTrigger={triggerPad}
          />
        ))}
      </section>

      <DecibelMeter
        analyserRef={analyserRef}
        isAudioReady={isAudioReady}
      />

      <HitHistory
        hits={hitHistory}
        announcement={latestAnnouncement}
      />
    </section>
  );
}
