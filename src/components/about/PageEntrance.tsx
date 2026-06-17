"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageEntranceProps {
  children: ReactNode;
}

export function PageEntrance({ children }: PageEntranceProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.main>
  );
}
