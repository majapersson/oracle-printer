"use client";

import Button from "../Button/Button";
import styles from "./PrinterForm.module.css";
import { redirect } from "next/navigation";
import { getPredictionAction } from "../../helpers/getPredictionAction";

export default function PrinterForm() {

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const question = e.target.question?.value;

    const prediction = await getPredictionAction(question);
    redirect(`/${prediction}`);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input className={styles.input} type="text" name="question" placeholder="Ask your question…" />
      <Button type="submit">Seek answers</Button>
    </form>
  );
}