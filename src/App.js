import React, { useEffect, useState, useRef, useMemo } from "react";
import debounce from "lodash.debounce";

import "./styles.css";

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

const DEBOUNCE_DELAY = 1000;
const CLEAR_DELAY = 5000;

function App() {
  const [text, setText] = useState("");
  const [countdown, setCountdown] = useState(0);
  const inputRef = useRef(null);
  const cleanupTimeoutRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  useEffect(() => {
    cleanupTimeoutRef.current = setTimeout(() => {
      setText("");
      inputRef.current.value = "";
    }, CLEAR_DELAY);

    if (text) {
      setCountdown(CLEAR_DELAY / 1000);
      countdownIntervalRef.current = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(cleanupTimeoutRef.current);
      clearInterval(countdownIntervalRef.current);
    };
  }, [text]);

  // useMemo to make sure that debounced is not re-creared on each render thus breaking desired behavior
  const debounced = useMemo(() => debounce(setText, DEBOUNCE_DELAY), []);

  const handleInputValueChange = e => {
    debounced(e.target.value);

    // stop the cleanup delay if there's one
    clearTimeout(cleanupTimeoutRef.current);

    // Reset countdown
    clearInterval(countdownIntervalRef.current);
    setCountdown(0);
  };

  return (
    <div className="App">
      <h1>Search input...</h1>
        <input
          ref={inputRef}
          onChange={handleInputValueChange}
        />
        <span>{countdown ? `Cleaning up values in: ${countdown}` : ""}</span>
      <div>{text}</div>
    </div>
  );
}

export default App;