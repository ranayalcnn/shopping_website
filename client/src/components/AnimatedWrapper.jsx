import React from 'react';
import { motion } from 'framer-motion';

// Temel animasyon varyantları
const defaultVariants = {
  hidden: { opacity: 0, y: 20 }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  }, 
};

/**
 * AnimatedWrapper: İçine aldığı her şeye giriş animasyonu ekler.
 */
const AnimatedWrapper = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible" 
      viewport={{ once: true, amount: 0.2 }} 
      transition={{ delay: delay }} 
      variants={defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;