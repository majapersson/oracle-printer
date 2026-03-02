
import styles from "./page.module.css";
import PrinterForm from "../components/PrinterForm/PrinterForm";
import CrystalBall from "../assets/images/crystal-ball.png";
import Image from "next/image";
import Orbs from "../components/Orbs/Orbs";
import Swirl from "../components/Swirl/Swirl";

export default function Home() {
  return (
    <div className={styles.page}>
      <Swirl className={styles.swirl} data-position="top-left" />
      <Swirl className={styles.swirl} data-position="top-right" />
      <Orbs count={30} />
      <main className={styles.main}>
        <Image src={CrystalBall} alt="Crystal Ball" className={styles.crystalBall} />
        <h1 className={styles.title}>What do you wish to know?</h1>
        <PrinterForm />
      </main>
      <Swirl className={styles.swirl} data-position="bottom-left" />
      <Swirl className={styles.swirl} data-position="bottom-right" />
    </div>
  );
}
