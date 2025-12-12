//src/types/pdfjs-webpack.d.ts
declare module "pdfjs-dist/webpack" {
  const pdfjs: unknown;
  export default pdfjs;
}

declare module "pdfjs-dist/build/pdf" {
  const pdfjsLib: unknown;
  export = pdfjsLib;
}

declare module "pdfjs-dist/build/pdf.worker?url" {
  const src: string;
  export default src;
}
