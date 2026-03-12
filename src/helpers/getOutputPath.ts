import path from "node:path";

export function getOutputPath(filename: string) {
  return path.join(process.cwd(), `public/tmp/${filename}`);
}
