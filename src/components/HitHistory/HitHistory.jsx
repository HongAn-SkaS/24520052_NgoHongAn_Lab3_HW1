
import "./HitHistory.css";

export function HitHistory({ hits, announcement }) {
  return (
    <section
      className="hit-history"
      aria-labelledby="hit-history-title"
    >
      <header className="hit-history__header">
        <h2 id="hit-history-title">Hit History</h2>
        <p>{hits.length} recent hits</p>
      </header>

      <output
        className="hit-history__announcement"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </output>

      {hits.length === 0 ? (
  <p className="hit-history__empty">No drum hits yet.</p>
) : (
  <ol className="hit-history__list" aria-label="Recent drum hits">
    {hits.map((hit) => (
      <li className="hit-history__item" key={hit.id}>
        <span className="hit-history__name">{hit.padName}</span>
        <kbd>{hit.key}</kbd>
        <time dateTime={hit.timestamp}>{hit.displayTime}</time>
      </li>
    ))}
  </ol>
)}
    </section>
  );
}
