"use client";

import PrinterForm from "../components/PrinterForm/PrinterForm";
import CrystalBall from "../assets/images/crystal-ball.png";
import Cards from "../assets/images/cards.png";
import Eye from "../assets/images/eye.png";
import Image from "next/image";
import Orbs from "../components/Orbs/Orbs";
import Swirl from "../components/Swirl/Swirl";
import classNames from "classnames/bind";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { sendToPrinterAction } from "../helpers/sendToPrinterAction";
import { createPredictionFile } from "../helpers/createPredictionFile";
import { getPredictionAction } from "../helpers/getPredictionAction";
import { useRouter } from "next/navigation";

const cx = classNames.bind(styles);

export type PredictionState = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [predictionState, setPredictionState] =
    useState<PredictionState>("idle");
  const router = useRouter();

  useEffect(() => {
    (document.activeElement as HTMLElement)?.blur();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [predictionState]);

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
    await new Promise((resolve) => setTimeout(resolve, 10000));
    setPredictionState("idle");
  };

  return (
    <div className={cx("page")}>
      <Swirl className={cx("swirl")} data-position="top-left" />
      <Swirl className={cx("swirl")} data-position="top-right" />
      <Orbs count={30} />
      <main className={cx("main")}>
        <Image
          src={CrystalBall}
          alt="Crystal Ball"
          className={cx("crystalBall")}
        />
        <div className={cx("content")}>
          {predictionState === "success" ? (
            <h1 className={cx("title")}>
              Follow the sound of the mechanical clicking, the outcome is
              already formatted.
            </h1>
          ) : (
            <PrinterForm
              className={cx("formSlot")}
              onSubmit={handleSubmit}
              isLoading={predictionState === "loading"}
            />
          )}
        </div>
        <div className={cx("imageContainer")}>
          <Image src={Cards} alt="Cards" className={cx("cards")} />
          <Image src={Eye} alt="Eye" className={cx("eye")} />
        </div>
      </main>
      <Swirl className={cx("swirl")} data-position="bottom-left" />
      <Swirl className={cx("swirl")} data-position="bottom-right" />
    </div>
  );
}
