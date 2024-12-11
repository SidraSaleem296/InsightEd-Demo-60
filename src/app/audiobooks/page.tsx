"use client"
import { useState } from 'react';
import Speech from 'react-speech';

export default function HomePage() {
  const [inputText, setInputText] = useState("The answer to the universe is 42");

  const styles = {
    container: {},
    text: {},
    buttons: {},
    play: {
      hover: {
        backgroundColor: 'black',
        color: 'white'
      },
      button: {
        padding: '4px',
        fontFamily: 'Helvetica',
        fontSize: '1.0em',
        cursor: 'pointer',
        pointerEvents: 'none',
        outline: 'none',
        backgroundColor: 'inherit',
        border: 'none'
      }
    },
    pause: {
      hover: {},
      button: {}
    },
    stop: {
      hover: {},
      button: {}
    },
    resume: {
      hover: {},
      button: {}
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Text-to-Speech Demo Using react-speech</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={4}
        cols={50}
      />
      <br /><br />
      <Speech
        styles={styles}
        textAsButton={true}
        displayText="Play Speech"
        text={inputText}
        voice="Google UK English Female"
        rate={1}
        pitch={1}
        volume={1}
      />
    </div>
  );
}
