"use client";
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

import AnimatedText from './components/AnimatedText';
import ScrollRevealText from './components/ScrollRevealText';
import EventDetails from './components/EventDetails';
import RSVPForm from './components/RSVPform';

// The text for your scroll reveal section
const poeticText =
  'Welcome to the chaos. A new chapter begins — where the music’s louder, the lights hit harder, and the night remembers your name. This isn’t just a freshers’ party — it’s your first step into the madness.';

// A helper component for the animated "scroll down" arrow
function ScrollDownArrow() {
  return (
    <motion.div
      className="absolute bottom-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: [0, 1, 0], y: 0 }}
      transition={{
        delay: 4.5, // Start after the main text animation
        duration: 2,
        repeat: Infinity,
        repeatDelay: 1,
        ease: 'easeInOut',
      }}
    >
      <ChevronDown
        size={48}
        className="text-gray-600"
        strokeWidth={1.5}
      />
    </motion.div>
  );
}

export default function Home() {
  return (
    // This container enables CSS scroll snapping
    <main className="snap-y snap-mandatory h-screen overflow-y-scroll overflow-x-hidden">
      {/* Background stays fixed across all sections */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gray-950">
        <div
          className="fixed left-0 right-0 top-0 h-full 
                     bg-[radial-gradient(circle_800px_at_50%_20%,#2d0c4d,transparent)] 
                     animate-background-glow"
        ></div>
      </div>

      {/* Page 1: Hero Section */}
      <section className="snap-start min-h-screen flex flex-col items-center justify-center p-6 text-center relative">
        <AnimatedText />
        <ScrollDownArrow />
      </section>

      {/* Page 2: Info & Details Section */}
      <section className="snap-start min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 space-y-12">
        <div className="max-w-4xl w-full">
          <ScrollRevealText textValue={poeticText} />
        </div>
        <EventDetails />
      </section>

      {/* Page 3: RSVP Section */}
      <section className="snap-start min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <RSVPForm />
      </section>
    </main>
  );
}