import "./App.css";
import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // copied message will disappear after 2 sec
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      <div className="w-full max-w-md mx-auto shadow-lg rounded-2xl px-6 py-5 bg-gradient-to-br from-gray-800 to-gray-900 text-orange-400">
        <h1 className="text-3xl text-center font-bold mb-6">🔒 Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-gray-700">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4 bg-gray-700 text-white text-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 transition-all"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="flex flex-col gap-y-4 text-sm">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={5}
              max={30}
              value={length}
              className="cursor-pointer accent-orange-400"
              onChange={(e) => { setLength(Number(e.target.value)) }}
            />
            <label className="text-white font-medium">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed(prev => !prev)
              }}
              className="accent-orange-400"
            />
            <label htmlFor="numberInput" className="text-white">Include Numbers</label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed(prev => !prev)
              }}
              className="accent-orange-400"
            />
            <label htmlFor="characterInput" className="text-white">Include Symbols</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

