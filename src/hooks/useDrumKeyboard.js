
import { useEffect } from "react";

const IGNORED_TAGS = new Set([
  "INPUT",
  "TEXTAREA",
  "SELECT",
]);

function isTypingTarget(target) {
  if (!(target instanceof Element)) {
    return false;
  }

  if (IGNORED_TAGS.has(target.tagName)) {
    return true;
  }

  if (target.isContentEditable) {
    return true;
  }

  return Boolean(
    target.closest('[contenteditable="true"], [role="textbox"]'),
  );
}

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

      // Ignore keyboard shortcuts during IME composition.
      if (event.isComposing) {
        return;
      }

      // Isolate shortcuts from editable elements.
      if (isTypingTarget(event.target)) {
        return;
      }

      // Identify physical keyboard keys.
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
