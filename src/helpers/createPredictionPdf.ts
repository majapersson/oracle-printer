"use server";

import path from "node:path";
import puppeteer from "puppeteer";
import { v4 as uuidv4 } from "uuid";

export async function createPredictionPdf(prediction: string) {
  const filename = `${uuidv4()}.pdf`;
  const outputPath = path.join(process.cwd(), `public/tmp/${filename}`)

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`http://localhost:3000/${prediction}`, {
    waitUntil: 'networkidle0',
  });

  await page.pdf({
    path: outputPath,
    format: 'A5',
    printBackground: true,
  });

  await browser.close();

  return filename;
}