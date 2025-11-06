'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const eventTexts = [
  {
    text: 'Navjeevan Education Society’s College of Engineering Presents…',
    className: 'text-lg md:text-xl italic text-gray-400',
  },
  {
    text: 'FY B.Tech Freshers 2025-26',
    className:
      'text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 py-2',
  },
  {
    text: 'Step Into the Madness',
    className: 'text-2xl md:text-4xl font-medium text-gray-100',
  },
];

const textVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1], // proper easeInOut curve
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

export default function AnimatedText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % eventTexts.length);
    }, 3500); // Time per text
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="flex items-center justify-center min-h-40 md:min-h-[200px] w-full">
      <AnimatePresence mode="wait">
        <motion.h1
          key={index}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`text-center ${eventTexts[index].className}`}
        >
          {eventTexts[index].text}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
