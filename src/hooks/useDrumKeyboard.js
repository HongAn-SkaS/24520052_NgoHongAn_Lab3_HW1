
import { useEffect } from "react";

const IGNORED_TAGS = new Set([
  "INPUT",
  "TEXTAREA",
  "SELECT",
]);

export function useDrumKeyboard(
  padMap,
  onTriggerPad,
  isEnabled = true,
) {
  useEffect(() => {
    if (!isEnabled) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      // Prevent operating-system key-hold repetition.
      if (event.repeat) {
        return;
      }

      // Ignore shortcuts while interacting with form controls.
      if (IGNORED_TAGS.has(event.target.tagName)) {
        return;
      }

      // Use physical keyboard codes, never event.key or keyCode.
      const pad = padMap.get(event.code);

      if (!pad) {
        return;
      }

      event.preventDefault();
      onTriggerPad(pad.id);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [padMap, onTriggerPad, isEnabled]);
}
