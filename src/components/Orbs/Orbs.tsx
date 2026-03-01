"use client";

import React, { useMemo } from "react";
import styles from "./Orbs.module.css";

type OrbsProps = {
  count?: number;
  className?: string;
};

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Orbs({ count = 14, className }: OrbsProps) {
  const orbs = useMemo(() => {
    return Array.from({ length: count }).map((_, index) => {
      const size = Math.round(randomInRange(8, 26)); // px
      const x = Math.round(randomInRange(2, 98)); // %
      const y = Math.round(randomInRange(5, 95)); // %
      const dx = `${randomInRange(-200, 200).toFixed(1)}px`;
      const dy = `${randomInRange(-200, 200).toFixed(1)}px`;
      const duration = `${randomInRange(9, 18).toFixed(2)}s`;
      const delay = `${randomInRange(-18, 0).toFixed(2)}s`;
      const opacity = randomInRange(0.35, 0.75).toFixed(2);

      return {
        key: `orb-${index}`,
        style: {
          ["--x"]: x,
          ["--y"]: y,
          ["--size"]: `${size}px`,
          ["--dx"]: dx,
          ["--dy"]: dy,
          ["--duration"]: duration,
          ["--delay"]: delay,
          opacity,
        },
      };
    });
  }, [count]);

  return (
    <div className={`${styles.orbs} ${className ?? ""}`}>
      {orbs.map(({ key, style }) => (
        <span key={key} className={styles.orb} style={style} />
      ))}
    </div>
  );
}

