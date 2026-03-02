"use client";

import Button from "../Button/Button";
import styles from "./PrinterForm.module.css";
import { useRouter } from "next/navigation";
import { createPredictionPdf } from "../../helpers/createPredictionPdf";
import { getPredictionAction } from "../../helpers/getPredictionAction";
import { sendToPrinterAction } from "../../helpers/sendToPrinterAction";
import Cards from "../../assets/images/cards.png";
import Eye from "../../assets/images/eye.png";
import Image from "next/image";

export default function PrinterForm() {
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const question = e.target.question?.value;

    const prediction = await getPredictionAction(question);
    // const filename = await createPredictionPdf(prediction);
    // await sendToPrinterAction(filename);
    router.push(`/${prediction}`);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputContainer}>
        <input className={styles.input} type="text" name="question" placeholder="Ask your question…" />
        <span className={styles.inputIcon} />
      </div>
      <div className={styles.buttonContainer}>
        <Image src={Cards} alt="Cards" className={styles.cards} />
        <Button type="submit" className={styles.button}>Seek answers</Button>
        <Image src={Eye} alt="Eye" className={styles.eye} />
      </div>
    </form>
  );
}