import { motion } from 'framer-motion';
import React, { memo } from 'react';

const TimelineItem = memo(({ day, index, isEven, smoothSpring }) => {
  return (
    <motion.div
      initial={{ x: isEven ? 100 : -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ ...smoothSpring, delay: index * 0.2 }}
      className={`relative w-1/2 p-8 mb-16 ${isEven ? 'ml-[50%]' : ''} `}
    >
      {/* Timeline Dot */}
      <motion.div
        className={`absolute ${isEven ? '-left-[36px]' : '-right-[36px]'} w-6 h-6 rounded-full bg-[#00f3ff] top-1/2 -translate-y-1/2`} // Updated positioning
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
          boxShadow: '0 0 15px #00f3ff',
        }}
      />

      {/* Content Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/10"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00f3ff]/5 to-transparent pointer-events-none" />

        <motion.h3
          initial={{ y: -10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-white mb-4"
        >
          {day.split(':')[0]}
        </motion.h3>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/70"
        >
          AI-curated activities and optimized scheduling
        </motion.p>

        {/* Animated icons */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -bottom-2 -right-2 text-2xl opacity-50"
        >
          {index === 0 ? '🛬' : index === 3 ? '🛫' : '🗺️'}
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

const AITimelineSection = memo(({ smoothSpring }) => {
  const timelineDays = [
    'Day 1: Arrival',
    'Day 2: Exploration',
    'Day 3: Adventure',
    'Day 4: Departure'
  ];

  return (
    <section className="py-24 px-6 relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-7xl mx-auto relative"
      >
        {/* Center Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00f3ff] to-transparent transform -translate-x-1/2" />

        {/* Timeline Items */}
        {timelineDays.map((day, i) => (
          <TimelineItem
            key={day}
            day={day}
            index={i}
            isEven={i % 2 === 1}
            smoothSpring={smoothSpring}
          />
        ))}

        {/* Bottom Decoration */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4"
        >
          <div className="w-full h-full rounded-full bg-[#00f3ff] animate-ping" />
        </motion.div>
      </motion.div>
    </section>
  );
});

export default AITimelineSection;