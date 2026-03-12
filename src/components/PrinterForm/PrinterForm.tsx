"use client";

import Button from "../Button/Button";
import styles from "./PrinterForm.module.css";
import { useRouter } from "next/navigation";
import { createPredictionFile } from "../../helpers/createPredictionFile";
import { getPredictionAction } from "../../helpers/getPredictionAction";
import { sendToPrinterAction } from "../../helpers/sendToPrinterAction";
import classNames from "classnames/bind";
import type { PredictionState } from "../../app/page";

const cx = classNames.bind(styles);

export default function PrinterForm({
  className,
  predictionState,
  setPredictionState,
}: {
  className?: string;
  predictionState: PredictionState;
  setPredictionState: (state: PredictionState) => void;
}) {
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPredictionState("loading");
    const question = e.target.question?.value;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const prediction = await getPredictionAction(question);

    const shouldPrintFile =
      process.env.NEXT_PUBLIC_WINDOWS_PRINTER_NAME &&
      process.env.NEXT_PUBLIC_WINDOWS_COMPUTER_NAME;
    if (!shouldPrintFile) {
      router.push(`/${prediction}`);
      return;
    }

    const filename = await createPredictionFile(prediction);
    await sendToPrinterAction(filename);
    setPredictionState("success");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setPredictionState("idle");
  };

  return (
    <form onSubmit={handleSubmit} className={cx("form", className)}>
      {predictionState === "loading" ? (
        <h1 className={cx("title")} data-loading="true">
          The Oracle is thinking…
        </h1>
      ) : (
        <h1 className={cx("title")}>What do you wish to know?</h1>
      )}
      <div className={cx("inputContainer")}>
        <input
          className={cx("input")}
          type="text"
          name="question"
          placeholder="Ask your question…"
        />
        <span
          className={cx("inputIcon")}
          data-loading={predictionState === "loading"}
        />
      </div>
      <Button
        type="submit"
        className={cx("button")}
        disabled={predictionState === "loading"}
      >
        Seek answers
      </Button>
    </form>
  );
}
