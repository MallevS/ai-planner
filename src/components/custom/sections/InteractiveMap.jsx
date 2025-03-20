import { motion } from 'framer-motion';
import React, { memo } from 'react';

const City = memo(({ city, index }) => {
  return (
    <motion.div
      key={city}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          damping: 15,
          stiffness: 120,
          delay: index * 0.3
        }
      }}
      whileHover={{
        scale: 1.15,
        y: -10,
        transition: { type: "spring", stiffness: 300 }
      }}
      className="absolute p-4 rounded-2xl backdrop-blur-lg cursor-pointer"
      style={{
        left: `${20 + index * 20}%`,
        top: `${50 - Math.sin(index) * 10}%`,
        background: 'rgba(255, 255, 255, 0.1)',
        filter: 'drop-shadow(0 0 10px rgba(0, 243, 255, 0.3))'
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="flex gap-2 items-center relative"
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{
            background: `hsl(${index * 90}, 100%, 50%)`,
            boxShadow: `0 0 15px hsl(${index * 90}, 100%, 50%)`
          }}
        />
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white text-shadow"
        >
          {city}
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute top-full left-1/2 -translate-x-1/2 p-2 bg-black/80 rounded-lg whitespace-nowrap pointer-events-none"
      >
        <span className="text-[#00f3ff]">▲</span>
        <span className="text-white ml-2">
          {Math.floor(Math.random() * 1000)} current visitors
        </span>
      </motion.div>
    </motion.div>
  );
});

const InteractiveMap = memo(({ scaleProgress }) => {
  const cities = ['Paris', 'Tokyo', 'New York', 'Bali'];

  return (
    <section className="py-24 px-6 h-screen relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#081125] to-[#0a1a3a]"
      >
        {/* Animated Background */}
        <motion.div
          animate={{
            background: [
              'linear-gradient(45deg, #00f3ff10 0%, #7d4fff10 50%, #ff66cc10 100%)',
              'linear-gradient(45deg, #ff66cc10 0%, #00f3ff10 50%, #7d4fff10 100%)',
              'linear-gradient(45deg, #7d4fff10 0%, #ff66cc10 50%, #00f3ff10 100%)'
            ]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0 mix-blend-screen"
        />

        {/* Grid Pattern */}
        <motion.div
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              rgba(255,255,255,0.03) 0px,
              rgba(255,255,255,0.03) 1px,
              transparent 1px,
              transparent 50px
            )`,
            maskImage: 'linear-gradient(to bottom, black 30%, transparent)'
          }}
        />

        {/* Glowing Center */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #00f3ff20, transparent 60%)'
          }}
        />

        {/* World Map */}
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
            rotate: [0, 0.5, -0.5, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 opacity-30"
          style={{
            background: `url('/AI-TRIP-PLANNER/world-map.svg') center/contain no-repeat`
          }}
        />

        {/* Cities */}
        {cities.map((city, i) => (
          <City key={city} city={city} index={i} />
        ))}

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {cities.map((_, i) => (
            <motion.path
              key={i}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: i * 0.2 }}
              d={`M${20 + i * 20} ${50 - Math.sin(i) * 10} L50 50`}
              stroke={`hsl(${i * 90}, 100, 50)`}
              strokeWidth="1"
              fill="none"
              strokeDasharray="5 5"
            />
          ))}
        </svg>

        {/* Bottom Text */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            scale: scaleProgress
          }}
          className="w-full max-w-4xl px-6"
        >
          <h2 className="text-4xl font-bold text-white mb-4 text-shadow">
            AI-Powered Destination Insights
          </h2>
          <motion.p
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/70 text-xl"
          >
            Real-time popularity analysis and personalized recommendations
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
});

export default InteractiveMap;