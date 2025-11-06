// app/components/AnimatedText.tsx

'use client';

import { motion, Variants } from 'framer-motion';

// Text lines with their specific styling
const lines = [
  {
    text: 'Navjeevan Education Society’s College of Engineering Presents…',
    className: 'text-base md:text-xl italic text-gray-400 font-light',
  },
  {
    text: 'FY B.Tech Freshers 2025-26',
    className:
      'text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 py-2',
  },
  {
    text: 'Step Into the Madness',
    className: 'text-2xl md:text-3xl font-medium text-gray-100',
  },
];

// Parent container variant to stagger each line
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 1.0, // Time between each line animating in
    },
  },
};

// Line variant to stagger each word
const lineVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // Time between each word animating in
    },
  },
};

// Word variant for the fade-in-up effect
const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // A smooth "easeOutCirc" curve
    },
  },
};

export default function AnimatedText() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-40 md:min-h-[200px] w-full space-y-2 md:space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {lines.map((line, lineIndex) => (
        // Each line is a motion component
        <motion.h1
          key={lineIndex}
          className={`text-center ${line.className}`}
          variants={lineVariants} // Staggers the words inside
        >
          {/* We split the line by spaces to animate word by word */}
          {line.text.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-[0.25em]">
              <motion.span
                className="inline-block"
                variants={wordVariants} // Applies the fade-in-up
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>
      ))}
    </motion.div>
  );
}