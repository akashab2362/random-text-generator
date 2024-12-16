import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberChecked, setNumberChecked] = useState(false);
  const [characterChecked, setCharacterChecked] = useState(false);
  const [text, setText] = useState("");
  const textRef = useRef(null);

  const textGenerator = useCallback(() => {
    let generatedText = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberChecked) str += "1234567890";
    if (characterChecked) str += "!@#$%^&*()_+-=[]{}|\":?><,./;'`~";
    for (let i = 0; i < length; i++) {
      generatedText += str.charAt(Math.floor(Math.random() * str.length));
    }
    setText(generatedText);
  }, [length, numberChecked, characterChecked, setText]);

  useEffect(() => {
    textGenerator();
  }, [length, numberChecked, characterChecked]);

  const copyTextToClipboard = useCallback(() => {
    textRef.current?.select();
    window.navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <>
      <h1 className="text-white text-4xl text-center font-bold">
        Text Generator
      </h1>
      <div className="flex bg-blue-950 w-2/5 mx-auto mt-12 flex-col justify-center h-60 gap-14 rounded-xl">
        <div className="flex justify-center">
          <input
            type="text"
            value={text}
            className="w-2/3 py-4 rounded-l-xl pl-10"
            placeholder="text"
            readOnly
            ref={textRef}
          />
          <button
            className="bg-blue-800 w-20 py-4 rounded-r-xl hov active:bg-blue-950"
            onClick={copyTextToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex justify-center gap-8 text-white">
          <label>
            <input
              type="range"
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
              className="mx-4"
              min={0}
              max={20}
            />
            Length: {length}
          </label>
          <label>
            <input
              type="checkbox"
              defaultChecked={numberChecked}
              className="mr-1"
              onChange={() => {
                setNumberChecked((prev) => !prev);
              }}
            />
            Number
          </label>
          <label>
            <input
              type="checkbox"
              defaultChecked={characterChecked}
              className="mr-1"
              onChange={() => {
                setCharacterChecked((prev) => !prev);
              }}
            />
            Character
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
