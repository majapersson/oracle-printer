"use client";

import Button from "../Button/Button";
import styles from "./PrinterForm.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPredictionPdf } from "../../helpers/createPredictionPdf";
import { getPredictionAction } from "../../helpers/getPredictionAction";
import { sendToPrinterAction } from "../../helpers/sendToPrinterAction";
import Cards from "../../assets/images/cards.png";
import Eye from "../../assets/images/eye.png";
import Image from "next/image";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function PrinterForm() {
  const router = useRouter();
  const [predictionState, setPredictionState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPredictionState("loading");
    const question = e.target.question?.value;

    const prediction = await getPredictionAction(question);
    setPredictionState("success");
    // const filename = await createPredictionPdf(prediction);
    // await sendToPrinterAction(filename);
    router.push(`/${prediction}`);
  }

  return (
    <form onSubmit={handleSubmit} className={cx("form")}>
      <div className={cx("inputContainer")}>
        <input className={cx("input")} type="text" name="question" placeholder="Ask your question…" />
        <span className={cx("inputIcon")} data-loading={predictionState === "loading"} />
      </div>
      <div className={cx("buttonContainer")}>
        <Image src={Cards} alt="Cards" className={cx("cards")} />
        <Button type="submit" className={cx("button")} disabled={predictionState === "loading"}>Seek answers</Button>
        <Image src={Eye} alt="Eye" className={cx("eye")} />
      </div>
    </form>
  );
}