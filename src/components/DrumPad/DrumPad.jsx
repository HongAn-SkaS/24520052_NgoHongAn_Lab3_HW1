import "./DrumPad.css";
export function DrumPad({
  pad,
  isActive,
  onTrigger,
}) {
  const handleClick = () => {
    onTrigger(pad.id);
  };

  return (
    <button
      className={`drum-pad${isActive ? " drum-pad--active" : ""}`}
      type="button"
      aria-label={`${pad.name} drum pad, keyboard shortcut ${pad.key}`}
      aria-pressed={isActive}
      onClick={handleClick}
    >
      <span className="drum-pad__key" aria-hidden="true">
        {pad.key}
      </span>

      <span className="drum-pad__name">
        {pad.name}
      </span>

      <span className="drum-pad__description">
        {pad.description}
      </span>
    </button>
  );
}
