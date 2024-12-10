"use client";

import React, { useState, useEffect } from "react";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();

    setUtterance(u);
    setVoice(voices[0]);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
      synth.speak(utterance);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  const handleVoiceChange = (event) => {
    const voices = window.speechSynthesis.getVoices();
    setVoice(voices.find((v) => v.name === event.target.value));
  };

  const handlePitchChange = (event) => {
    setPitch(parseFloat(event.target.value));
  };

  const handleRateChange = (event) => {
    setRate(parseFloat(event.target.value));
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Text-to-Speech</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Voice:</label>
          <select
            value={voice?.name}
            onChange={handleVoiceChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
          >
            {window.speechSynthesis.getVoices().map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Pitch:</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={handlePitchChange}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Speed:</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={handleRateChange}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Volume:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between space-x-2">
        <button
          onClick={handlePlay}
          className="w-1/3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          {isPaused ? "Resume" : "Play"}
        </button>
        <button
          onClick={handlePause}
          className="w-1/3 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          Pause
        </button>
        <button
          onClick={handleStop}
          className="w-1/3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;
