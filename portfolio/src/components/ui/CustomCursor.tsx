"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 120, damping: 22 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 22 });
  const dotSpringX = useSpring(dotX, { stiffness: 400, damping: 30 });
  const dotSpringY = useSpring(dotY, { stiffness: 400, damping: 30 });

  const isHoveringRef = useRef(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
    };

    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.closest("a, button, [role='button'], input, textarea, select, label")
      ) {
        isHoveringRef.current = true;
        cursorRef.current?.classList.add("cursor-hover");
      }
    };

    const onLeave = () => {
      isHoveringRef.current = false;
      cursorRef.current?.classList.remove("cursor-hover");
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      {/* Ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-accent-blue/60 pointer-events-none z-[9999] mix-blend-difference transition-all duration-150"
        style={{ x: springX, y: springY }}
      />
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-blue pointer-events-none z-[9999]"
        style={{ x: dotSpringX, y: dotSpringY }}
      />
      <style>{`
        @media (pointer: coarse) {
          .cursor-ring, .cursor-dot { display: none !important; }
        }
        .cursor-hover {
          transform: scale(1.5) !important;
          border-color: rgba(139,92,246,0.8) !important;
          background: rgba(139,92,246,0.1) !important;
        }
      `}</style>
    </>
  );
}
