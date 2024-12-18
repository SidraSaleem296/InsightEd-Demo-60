"use client";

import React, { useState } from "react";
import TextToSpeech from "@/components/TextToSpeech";
import pdfjsLib from "@/utils/pdf.worker";

const BlogPost = () => {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const extractedText = await extractTextFromPDF(file);
      setText(extractedText);
    }
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        if (reader.result) {
          const pdfData = new Uint8Array(reader.result as ArrayBuffer);
          const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
          let fullText = "";

          for (let i = 0; i < pdf.numPages; i++) {
            const page = await pdf.getPage(i + 1);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: any) => item.str).join(" ");
            fullText += `${pageText} `;
          }

          resolve(fullText.trim());
        } else {
          reject("Error reading file.");
        }
      };

      reader.onerror = () => reject(reader.error);
    });
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">PDF to Speech App</h1>
      <div className="flex flex-col items-center">
        <label
          htmlFor="fileInput"
          className="TaaviButton"
        >
          Upload PDF
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        {fileName && (
          <p className="mb-6 text-sm text-gray-400">
            <span className="font-semibold text-white">Uploaded:</span> {fileName}
          </p>
        )}
        {text ? (
          <div className="w-full bg-gray-800 p-6 rounded-lg">
            <TextToSpeech text={text} />
          </div>
        ) : (
          <p className="text-gray-500 mt-6 text-center">Upload a PDF to start.</p>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
