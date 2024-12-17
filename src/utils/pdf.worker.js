import * as pdfjsLib from "pdfjs-dist/build/pdf";

// Use a specific version of the worker hosted on a CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/build/pdf.worker.min.js";

export default pdfjsLib;
