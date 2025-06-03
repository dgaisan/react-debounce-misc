import React, { useEffect, useState, useRef} from "react";
import ReactDOM from "react-dom";
import debounce from "lodash.debounce";

// const fn = debounce(callback, timeout);
// https://lodash.com/docs/4.17.11#debounce
/**
1. Display the input value under the input field
after certain time (e.g. 1s) using debounce

2. Once the debounced value appears,
After certain time (e.g. 5s), clear both the values

Use case:
- User types, stops
- 1 second passes
- Display value appears
- User starts typing, and keeps typing for longer than 5 seconds, but suddenly values gets cleared. why?


3. Display a countdown on the right of the input,
which updates every second and shows how much time
is remaining before clearing

 */

import "./styles.css";

/**
 function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
 */
function App() {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => setText(""), 5000);
    return () => {
      console.log("unmounted")
      clearTimeout(timeoutId);
      inputRef.current.value = "";
    }
  }, [text]);

  const handleTextChange = (value) => {
    setText(value);
  };

  const debounced = debounce(handleTextChange, 1000);

  return (
    <div className="App">
      <h1>Search input...</h1>
      <input ref={inputRef} onChange={e => {
        console.log("onchange fired", e.target.value)
        debounced(e.target.value)
      }} />
      <div>
        {text}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
