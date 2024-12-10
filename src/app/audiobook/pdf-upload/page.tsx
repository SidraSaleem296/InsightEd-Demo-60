"use client";

import React, { useState } from "react";
import axios from "axios";

const PdfUpload = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPdfFile(file);
    setExtractedText(null);
    setError(null);
  };

  const handleExtractText = async () => {
    if (!pdfFile) {
      setError("Please upload a PDF file first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fileData = await pdfFile.arrayBuffer();
      const base64File = Buffer.from(fileData).toString("base64");

      const response = await axios.post("/api/audiobook/parseText", {
        pdf: base64File,
      });

      setExtractedText(response.data.text);
    } catch (err) {
      console.error("Error extracting text from PDF:", err);
      setError("Failed to extract text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Upload PDF and Extract Text</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="block w-full p-2 mb-4 border rounded bg-gray-800 border-gray-700 text-gray-200"
      />

      <button
        onClick={handleExtractText}
        disabled={!pdfFile || loading}
        className={`w-full px-4 py-2 font-semibold rounded ${
          loading || !pdfFile
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? "Extracting..." : "Extract Text"}
      </button>

      {error && (
        <p className="text-red-500 mt-4 text-center font-medium">{error}</p>
      )}

      {extractedText && (
        <div className="mt-6 bg-gray-800 p-4 rounded">
          <h2 className="text-lg font-semibold mb-3">Extracted Text:</h2>
          <pre className="whitespace-pre-wrap text-sm">{extractedText}</pre>
        </div>
      )}
    </div>
  );
};

export default PdfUpload;
