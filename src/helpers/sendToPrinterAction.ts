"use server";
import { getDefaultPrinter, print } from 'unix-print';
import { getOutputPath } from "./getOutputPath";

export async function sendToPrinterAction(filename: string) {
  const printer = await getDefaultPrinter();
  if (!printer) {
    throw new Error("No printer found");
  }

  await print(getOutputPath(filename)).catch((error) => {
    console.error(error);
    throw new Error("Failed to print file");
  });
}