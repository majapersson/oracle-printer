import Swirl from "../../components/Swirl/Swirl";
import styles from "./page.module.css";

export default async function Prediction({ params }: { params: { prediction: string } }) {

  const { prediction: predictionBase64Url } = await params;

  const predictionBase64 = decodeURIComponent(predictionBase64Url);
  const prediction = Buffer.from(predictionBase64, 'base64').toString('utf-8');

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Swirl className={styles.swirl} data-position="top-left" />
        <Swirl className={styles.swirl} data-position="top-right" />
        {prediction && <h1 className={styles.title}>{prediction}</h1>}
        <span className={styles.greeting}>- The Oracle Printer</span>
        <Swirl className={styles.swirl} data-position="bottom-left" />
        <Swirl className={styles.swirl} data-position="bottom-right" />
      </main>
    </div>
  );
}
