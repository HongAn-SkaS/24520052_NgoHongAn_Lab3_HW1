
import { useCallback, useEffect, useRef, useState } from "react";

import { DRUM_PADS, DRUM_PAD_MAP } from "../../data/drumPads";
import { useDrumKeyboard } from "../../hooks/useDrumKeyboard";
import { DrumPad } from "../DrumPad/DrumPad";

import "./DrumKit.css";
import { useAudioEngine } from "../../hooks/useAudioEngine";

export function DrumKit() {
  const {
  playSound,
  isAudioReady,
} = useAudioEngine();

  const [activePadId, setActivePadId] = useState(null);
  const [isEnabled, setIsEnabled] = useState(true);

  const activeTimerRef = useRef(null);

  const triggerPad = useCallback((padId) => {
  const pad = DRUM_PADS.find(
    (item) => item.id === padId,
  );

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
}, [playSound]);

  // Register physical keyboard shortcuts.
  useDrumKeyboard(DRUM_PAD_MAP, triggerPad, isEnabled);

  // Clean up the active-state timer on unmount.
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
          onClick={() => setIsEnabled((previous) => !previous)}
        >
          Keyboard: {isEnabled ? "On" : "Off"}
        </button>
      </header>

      <p
  className="drum-kit__audio-status"
  role="status"
>
  {isAudioReady
    ? "Audio engine ready"
    : "Audio engine waiting for interaction"}
</p>

      <section
        className="drum-kit__grid"
        aria-label="Drum pads"
      >
        {DRUM_PADS.map((pad) => (
          <DrumPad
            key={pad.id}
            pad={pad}
            isActive={activePadId === pad.id}
            onTrigger={triggerPad}
          />
        ))}
      </section>
    </section>
  );
}
