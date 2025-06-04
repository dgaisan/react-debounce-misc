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

function DebounceWithCleanupV2() {
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [countdown, setCountdown] = useState(0);

  const cleanupRef = useRef(null);
  const countdownRef = useRef(null);

  const debounced = useMemo(
    () => debounce(setDebouncedText, DEBOUNCE_DELAY),
    []
  );

  useEffect(() => {
    cleanupRef.current = setTimeout(() => {
      setDebouncedText("");
      setText("");
    }, CLEAR_DELAY);

    return () => {
      clearTimeout(cleanupRef.current);
    };
  }, [debouncedText]);

  useEffect(() => {
    if (debouncedText) {
      setCountdown(CLEAR_DELAY / 1000);
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(countdownRef.current);
      };
    }
  }, [debouncedText]);

  useEffect(() => {
    clearTimeout(cleanupRef.current);
    clearInterval(countdownRef.current);
    setCountdown(0);
  }, [text]);

  const handleInputValueChange = (e) => {
    setText(e.target.value);
    debounced(e.target.value);
  };

  return (
    <div className="App">
      <h1>Search input...</h1>
      <input value={text} onChange={handleInputValueChange} />
      <span>{countdown ? `Cleaning up values in: ${countdown}` : ""}</span>
      <div>{debouncedText}</div>
    </div>
  );
}

export default DebounceWithCleanupV2;
