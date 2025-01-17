import { useEffect, useRef, useCallback, useState } from "react";

export default function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (char) str += "!@#~#$%^&*()}:<>";
  
    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
  
    setPassword(pass);
  }, [length, number, char]);

  // useRef hook
  const passwordRef = useRef(null);

  const copyPasswordToClipBord = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current.setSelectionRange(0, 25);
    window.navigator.clipboard.writeText(password);
  }, [password]) 

  useEffect(() => {
    passwordGenerator();
  }, [length, number, passwordGenerator, char]);

  // const handleCopy = () => {
  //   navigator.clipboard.writeText(password);
  //   alert("Password copied to clipboard!");
  // };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl shadow-lg px-6 py-8 my-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
      <h1 className="text-center mb-4 text-3xl font-extrabold">Password Generator</h1>
      <div className="flex shadow-lg rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          readOnly
          className="outline-none rounded-l-lg w-full py-3 px-4 bg-gray-200 text-black"
          ref={passwordRef}
        />
        <button 
          onClick={copyPasswordToClipBord}
          className="text-white px-4 py-2 bg-blue-600 rounded-r-lg hover:bg-blue-700 transition-all duration-200"
        >
          Copy
        </button>
      </div>

      <div className="flex text-sm gap-x-7 justify-between mb-4">
        <div className="flex items-center gap-x-3">
          <input
            type="range"
            name="length"
            min={6}
            max={50}
            value={length}
            className="cursor-pointer accent-blue-600"
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label className="text-lg">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-3">
          <input
            type="checkbox"
            checked={number}
            className="cursor-pointer accent-blue-600"
            onChange={() => setNumber((prev) => !prev)}
          />
          <label className="text-lg">Include Numbers</label>
        </div>
        <div className="flex items-center gap-x-3">
          <input
            type="checkbox"
            checked={char}
            className="cursor-pointer accent-blue-600"
            onChange={() => setChar((prev) => !prev)}
          />
          <label className="text-lg">Include Characters</label>
        </div>
      </div>
    </div>
  );
}