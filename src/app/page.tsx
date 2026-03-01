
import styles from "./page.module.css";
import PrinterForm from "../components/PrinterForm/PrinterForm";

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
          <span className={styles.icon}>🔮</span>
          <h1 className={styles.title}>What do you wish to know?</h1>
          <PrinterForm />
      </main>
    </div>
  );  
}
