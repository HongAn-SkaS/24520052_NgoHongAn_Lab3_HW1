
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
    target.closest('[contenteditable="true"], [role="textbox"]')
  );
}

export function useDrumKeyboard(
  padMap,
  onTriggerPad,
  isEnabled = true,
  onReleasePad
) {
  useEffect(() => {
    if (!isEnabled) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.repeat || event.isComposing) {
        return;
      }

      if (isTypingTarget(event.target)) {
        return;
      }

      const pad = padMap.get(event.code);

      if (!pad) {
        return;
      }

      event.preventDefault();
      onTriggerPad(pad.id);
    };

    const handleKeyUp = (event) => {
      if (isTypingTarget(event.target)) {
        return;
      }

      const pad = padMap.get(event.code);

      if (!pad) {
        return;
      }

      event.preventDefault();
      onReleasePad?.(pad.id);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [padMap, onTriggerPad, onReleasePad, isEnabled]);
}
