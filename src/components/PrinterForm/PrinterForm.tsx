"use client";

import Button from "../Button/Button";
import styles from "./PrinterForm.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPredictionFile } from "../../helpers/createPredictionFile";
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

    await new Promise(resolve => setTimeout(resolve, 2000));

    const prediction = await getPredictionAction(question);
    const filename = await createPredictionFile(prediction);
    // await sendToPrinterAction(filename);
    router.push(`/${prediction}`);
  }

  return (
    <form onSubmit={handleSubmit} className={cx("form")}>
      {predictionState === "loading" ?
        <h1 className={cx("title")} data-loading="true">The Oracle is thinking…</h1> :
        <h1 className={cx("title")}>What do you wish to know?</h1>
      }
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