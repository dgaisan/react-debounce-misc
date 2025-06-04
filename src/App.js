import React from "react";

import "./styles.css";

import DebounceWithCleanupV1 from "./components/debounce-with-cleanup-v1";
import DebounceWithCleanupV2 from "./components/debounce-with-cleanup-v2";

function App() {
  return (
    <div className="App">
      <div className="Container">
        <h3>V1</h3>
        <DebounceWithCleanupV1 />
      </div>
      <div className="Container">
        <h3>V2</h3>
        <DebounceWithCleanupV2 />
      </div>
    </div>
  );
}

export default App;