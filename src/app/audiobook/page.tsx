"use client"

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
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">PDF to Speech App</h1>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded"
      />
      {fileName && <p className="mb-4">Uploaded: {fileName}</p>}
      {text && <TextToSpeech text={text} />}
      {!text && <p className="text-gray-500">Upload a PDF to start.</p>}
    </div>
  );
};

export default BlogPost;
