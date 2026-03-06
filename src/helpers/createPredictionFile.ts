"use server";

import { v4 as uuidv4 } from "uuid";
import { getOutputPath } from "./getOutputPath";
import fs from "node:fs/promises";


const TOP_ASCII = `                                                                           
                                                                           
                                                                           
            ++++++++++                  ++++++++                           
           +++      +++           ++++++       +++++++++++++               
           ++        ++  +++   ++++       +++++   ++        ++             
           ++        ++  +++++++      +++++    ++ ++          +            
           +++      ++  ++++++++++++++                  ++    ++           
             ++++++++++++                               ++++++             
                                                                           
                                                                           `

const BOTTOM_ASCII = `                                                                           
                                                                           
                          +++++++++                   +++++++++            
               +++++++++++++       ++++++           +++      +++           
             ++        ++   +++++       ++++   +++  ++        ++           
            +          ++ ++    +++++      +++++++  ++        ++           
           ++    ++                  ++++++++++++++  ++      +++           
             ++++++                               ++++++++++++             
                                                                           
                                                                           
                                                                           `

const SIGNATURE = `                                                         
                                               - The Oracle Printer        `

function wrapTextWithMargin(
  text: string,
) {
  const maxLineLength = 75; // fixed width per line
  const minSidePadding = 8; // ideal side padding (can vary)
  const contentWrapWidth = Math.max(1, maxLineLength - 2 * minSidePadding);

  const formatLineWithMinPad = (segment: string) => {
    if (segment.length >= maxLineLength) {
      // Extremely long token; avoid cutting it, return as-is
      return segment;
    }
    if (segment.length <= contentWrapWidth) {
      // We can maintain minimum side padding and center within remaining space
      const extra = contentWrapWidth - segment.length;
      const left = minSidePadding + Math.floor(extra / 2);
      const right = minSidePadding + Math.ceil(extra / 2);
      return " ".repeat(left) + segment + " ".repeat(right);
    }
    // Not enough room for min padding; center within full width
    const totalExtra = maxLineLength - segment.length;
    const left = Math.floor(totalExtra / 2);
    const right = totalExtra - left;
    return " ".repeat(left) + segment + " ".repeat(right);
  };

  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    // If the word is longer than the content width, do not split it.
    // First, flush the current line if present, then place the long word on its own line.
    if (word.length > contentWrapWidth) {
      if (current.length > 0) {
        lines.push(formatLineWithMinPad(current));
        current = "";
      }
      lines.push(formatLineWithMinPad(word));
      continue;
    }

    const nextLen = current.length === 0 ? word.length : current.length + 1 + word.length;
    if (nextLen <= contentWrapWidth) {
      current = current.length === 0 ? word : `${current} ${word}`;
    } else {
      if (current.length > 0) {
        lines.push(formatLineWithMinPad(current));
      }
      current = word;
    }
  }

  if (current.length > 0) {
    lines.push(formatLineWithMinPad(current));
  }

  return lines.join("\n");
}

function toPrintableASCII(str: string) {
  const characterMap = {
    "–": "-",
    "—": " - ",
    "”": "\"",
    "“": "\"",
    "’": "'",
    "‘": "'",
    "´": "'",
    "`": "'",
  }
  const regex = new RegExp(Object.keys(characterMap).join("|"), "g");
  return str.replace(regex, (match) => characterMap[match as keyof typeof characterMap])
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, "");
}

export async function createPredictionFile(predictionBase64Url: string) {

  const predictionBase64 = decodeURIComponent(predictionBase64Url);
  const prediction = Buffer.from(predictionBase64, 'base64').toString('utf-8');
  // Build the ASCII content with wrapped prediction text and margins
  const wrappedPrediction = wrapTextWithMargin(toPrintableASCII(prediction));

  const asciiOutput = `${TOP_ASCII}\n${wrappedPrediction}\n${SIGNATURE}\n${BOTTOM_ASCII}\n`;

  // Persist as .txt next to previous outputs
  const filename = `${uuidv4()}.txt`;
  const outputPath = getOutputPath(filename);

  await fs.writeFile(outputPath, asciiOutput, { encoding: "utf8" });

  return filename;
}