import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // Ref for password input
  const passwordRef = useRef(null);

  // Password generator function
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+{}[]<>?";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  // useEffect to regenerate password on dependency change
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  // Copy password to clipboard
  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      passwordRef.current.classList.add("ring-green-500");
      setTimeout(() => passwordRef.current.classList.remove("ring-green-500"), 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Password Generator</h1>

        {/* Password Display */}
        <div className="flex items-center gap-x-2 mb-4">
          <input
            type="text"
            value={password}
            className="w-full py-2 px-3 text-lg text-gray-900 rounded-lg outline-none ring-2 ring-gray-700 focus:ring-blue-500"
            placeholder="Your Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          {/* Length Slider */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Password Length</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="w-2/3 cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <span className="text-sm">{length}</span>
          </div>

          {/* Options */}
          <div className="flex justify-between">
            <label className="flex items-center gap-x-2">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="cursor-pointer"
              />
              <span className="text-sm">Include Numbers</span>
            </label>

            <label className="flex items-center gap-x-2">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="cursor-pointer"
              />
              <span className="text-sm">Include Special Characters</span>
            </label>
          </div>
        </div>

        {/* Regenerate Password Button */}
        <button
          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium"
          onClick={passwordGenerator}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
