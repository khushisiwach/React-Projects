import React, { useState } from 'react';
import './index.css'; // Import the CSS file

function App() {
  const [color, setColor] = useState("olive");

  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: color }}>
      <div className="container">
        <button onClick={() => setColor("red")} style={{ backgroundColor: "red" }}>
          Red
        </button>
        <button onClick={() => setColor("green")} style={{ backgroundColor: "green" }}>
          Green
        </button>
        <button onClick={() => setColor("blue")} style={{ backgroundColor: "blue" }}>
          Blue
        </button>
      </div>
    </div>
  );
}

export default App;
