"use client";

import { motion, useSpring, useScroll } from "motion/react";

export default function PostClient() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 7.5,
        originX: 0,
        backgroundColor: "#3182ce",
        opacity: 0.75,
      }}
    />
  );
}
