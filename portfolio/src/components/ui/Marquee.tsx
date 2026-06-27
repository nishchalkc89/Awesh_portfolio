"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  separator?: string;
}

export default function Marquee({
  items,
  speed = 30,
  direction = "left",
  className = "",
  separator = "✦",
}: MarqueeProps) {
  const doubled = [...items, ...items];
  const animX = direction === "left" ? [0, -50 + "%"] : [-50 + "%", 0];

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: animX }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-default">
              {item}
            </span>
            <span className="text-accent-blue/40 text-xs">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
