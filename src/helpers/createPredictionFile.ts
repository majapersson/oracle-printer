"use server";

import puppeteer from "puppeteer";
import { v4 as uuidv4 } from "uuid";
import { getOutputPath } from "./getOutputPath";

export async function createPredictionFile(prediction: string) {
  const filename = `${uuidv4()}.pdf`;
  const outputPath = getOutputPath(filename);

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