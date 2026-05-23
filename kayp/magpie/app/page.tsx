"use client";
import { motion } from "framer-motion";

export default function Home() {
  const text = "hello kritika !!";
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-row flex-nowrap items-baseline justify-center gap-0 text-3xl font-medium tracking-tight text-blue-500">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 18,
              mass: 0.6,
              delay: index * 0.1,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
