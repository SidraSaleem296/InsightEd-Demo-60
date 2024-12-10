declare module "pdf-parse" {
  interface PDFParseData {
    text: string;
    numpages: number;
    numrender: number;
    info: {
      Title?: string;
      Author?: string;
      Subject?: string;
      Keywords?: string;
      Creator?: string;
      Producer?: string;
      CreationDate?: string;
      ModDate?: string;
    };
    metadata?: any;
    version: string;
  }

  function pdfParse(
    buffer: Buffer | Uint8Array,
    options?: { version?: string }
  ): Promise<PDFParseData>;

  export = pdfParse;
}
