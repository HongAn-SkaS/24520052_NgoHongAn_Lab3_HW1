
import { DrumKit } from "./components/DrumKit/DrumKit";
import "./App.css";

function App() {
  return (
    <main className="studio">
      <header className="studio__header">
        <p className="studio__eyebrow">UIT S3T · PRODUCTION STUDIO</p>
        <h1>Drum Kit</h1>
        <p>Build your rhythm. Play your sound.</p>
      </header>

      <DrumKit />
    </main>
  );
}

export default App;
