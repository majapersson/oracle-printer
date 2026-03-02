
import PrinterForm from "../components/PrinterForm/PrinterForm";
import CrystalBall from "../assets/images/crystal-ball.png";
import Image from "next/image";
import Orbs from "../components/Orbs/Orbs";
import Swirl from "../components/Swirl/Swirl";
import classNames from "classnames/bind";
import styles from "./page.module.css";

const cx = classNames.bind(styles);

export default function Home() {
  return (
    <div className={cx("page")}>
      <Swirl className={cx("swirl")} data-position="top-left" />
      <Swirl className={cx("swirl")} data-position="top-right" />
      <Orbs count={30} />
      <main className={cx("main")}>
        <Image src={CrystalBall} alt="Crystal Ball" className={cx("crystalBall")} />
        <PrinterForm />
      </main>
      <Swirl className={cx("swirl")} data-position="bottom-left" />
      <Swirl className={cx("swirl")} data-position="bottom-right" />
    </div>
  );
}
