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
import { useState } from "react";

const cx = classNames.bind(styles);

export type PredictionState = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [predictionState, setPredictionState] =
    useState<PredictionState>("idle");

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
              predictionState={predictionState}
              setPredictionState={setPredictionState}
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
