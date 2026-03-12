"use client";

import Button from "../Button/Button";
import styles from "./PrinterForm.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function PrinterForm({
  className,
  isLoading,
  onSubmit,
}: {
  className?: string;
  isLoading: boolean;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} className={cx("form", className)}>
      {isLoading ? (
        <h1 className={cx("title")} data-loading="true">
          The Oracle is thinking…
        </h1>
      ) : (
        <h1 className={cx("title")}>What do you wish to know?</h1>
      )}
      <div className={cx("inputContainer")}>
        <input
          className={cx("input")}
          type="text"
          name="question"
          placeholder="Ask your question…"
        />
        <span className={cx("inputIcon")} data-loading={isLoading} />
      </div>
      <Button type="submit" className={cx("button")} disabled={isLoading}>
        Seek answers
      </Button>
    </form>
  );
}
