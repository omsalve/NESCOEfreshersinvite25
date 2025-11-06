'use client';

import { motion } from 'framer-motion';

interface ScrollRevealTextProps {
  textValue: string;
}

export default function ScrollRevealText({ textValue }: ScrollRevealTextProps) {
  const words = textValue.split(' ');

  return (
    <p className="flex flex-wrap text-2xl md:text-4xl lg:text-5xl font-medium text-gray-400 leading-relaxed md:leading-snug lg:leading-normal p-8 md:p-12">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: i * 0.03,
            ease: 'easeOut',
          }}
          className="mr-[0.2em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}
