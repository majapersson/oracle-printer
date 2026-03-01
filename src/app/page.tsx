
import styles from "./page.module.css";
import PrinterForm from "../components/PrinterForm/PrinterForm";
import CrystalBall from "../assets/images/crystal-ball.png";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image src={CrystalBall} alt="Crystal Ball" className={styles.crystalBall} />
        <h1 className={styles.title}>What do you wish to know?</h1>
        <PrinterForm />
      </main>
    </div>
  );
}
