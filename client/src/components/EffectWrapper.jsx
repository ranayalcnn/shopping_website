import React from "react";
import { motion } from "framer-motion";

const effectVariants = {
  hidden: {
    opacity: 0,
    y: 18,      // çok hafif hareket
    scale: 0.99 // micro-scale
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1], // modern yumuşak eğri
    },
  },
};

const EffectWrapper = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      variants={effectVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default EffectWrapper;
