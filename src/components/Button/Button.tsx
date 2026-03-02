
import { ButtonHTMLAttributes } from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.css";

const cx = classNames.bind(styles);

export default function Button({ children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cx("button", className)} {...props}>
      <span className={cx("content")}>{children}</span>
    </button>
  );
}