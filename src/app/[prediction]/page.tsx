import Swirl from "../../components/Swirl/Swirl";
import classNames from "classnames/bind";
import styles from "./page.module.css";

const cx = classNames.bind(styles);

export default async function Prediction({ params }: { params: { prediction: string } }) {

  const { prediction: predictionBase64Url } = await params;

  const predictionBase64 = decodeURIComponent(predictionBase64Url);
  const prediction = Buffer.from(predictionBase64, 'base64').toString('utf-8');

  return (
    <div className={cx("page")}>
      <main className={cx("main")}>
        <Swirl className={cx("swirl")} data-position="top-left" />
        <Swirl className={cx("swirl")} data-position="top-right" />
        {prediction && <h1 className={cx("title")}>{prediction}</h1>}
        <span className={cx("greeting")}>- The Oracle Printer</span>
        <Swirl className={cx("swirl")} data-position="bottom-left" />
        <Swirl className={cx("swirl")} data-position="bottom-right" />
      </main>
    </div>
  );
}
