'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { cubicBezier } from 'framer-motion';


const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  },
};

export default function EventDetails() {
  return (
    <motion.div
      className="w-full max-w-2xl p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }} // Trigger when 50% is in view
      variants={cardVariants}
    >
      <ul className="space-y-4 text-left text-lg md:text-xl text-gray-200">
        <li className="flex items-start">
          <Calendar
            size={24}
            className="text-purple-300 mr-4 flex-shrink-0 mt-1"
          />
          <div>
            <strong className="text-white">Date:</strong> 8th November, 2025
          </div>
        </li>
        <li className="flex items-start">
          <Clock
            size={24}
            className="text-purple-300 mr-4 flex-shrink-0 mt-1"
          />
          <div>
            <strong className="text-white">Time:</strong> 12 PM onwards
          </div>
        </li>
        <li className="flex items-start">
          <MapPin
            size={24}
            className="text-purple-300 mr-4 flex-shrink-0 mt-1"
          />
          <div>
            <strong className="text-white">Venue:</strong> Navjeevan Education
            Society's College of Engineering, Bhandup (W)
          </div>
        </li>
      </ul>

      <div className="border-t border-white/20 my-6"></div>

      <div className="text-center text-xl md:text-2xl text-gray-100 font-light space-y-2">
        <p>Come dressed to kill.</p>
        <p>Bring your vibe.</p>
        <p className="font-semibold text-white">
          Leave your name in history.
        </p>
      </div>
    </motion.div>
  );
}