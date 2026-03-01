"use client";

import Button from "../Button/Button";
import styles from "./PrinterForm.module.css";

export default function PrinterForm() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <input className={styles.input} type="text" name="question" placeholder="Ask your question…" />
      <Button type="submit">Seek answers</Button>
    </form>
  );
}