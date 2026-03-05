"use server";

import { exec } from "child_process";
import { getOutputPath } from "./getOutputPath";

export async function sendToPrinterAction(filename: string) {
  const windowsPrinter = process.env.WINDOWS_PRINTER_NAME;
  const windowsComputerName = process.env.WINDOWS_COMPUTER_NAME;

  if (windowsPrinter && windowsComputerName && process.platform === "win32") {
    const outputPath = getOutputPath(filename);
    exec(`print \/D:\\\\${windowsComputerName}\\${windowsPrinter} ${outputPath}`);
  }
}