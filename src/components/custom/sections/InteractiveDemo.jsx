import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../ui/button';

const DemoStepItem = memo(({ text, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.2 }}
    className="flex items-center gap-4 p-4 my-2 bg-white/5 rounded-lg"
  >
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 1.5, delay: index * 0.3 }}
      className="flex-shrink-0"
    >
      ➤
    </motion.div>
    <span className="text-white/90">{text}</span>
  </motion.div>
));

const WindowControls = () => (
  <div className="flex gap-4 mb-6">
    {['#ff5f56', '#ffbd2e', '#27c93f'].map((color, i) => (
      <div
        key={i}
        className="w-3 h-3 rounded-full"
        style={{ background: color }}
      />
    ))}
  </div>
);

const InteractiveDemo = memo(() => {
  const demoSteps = [
    '1. 🗺️ Choose your destination',
    '2. 💰 Set your budget',
    '3. 🎯 Select interests',
    '4. ✨ Generate magic!'
  ];

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 items-center">
        {/* Demo Interface */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="relative flex-1 w-full max-w-2xl"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#00f3ff20,transparent_60%)] blur-3xl -z-10" />

          {/* Demo Window */}
          <div className="p-8 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10">
            <WindowControls />
            {demoSteps.map((step, i) => (
              <DemoStepItem key={i} text={step} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="flex-1 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Create Your Perfect Trip in Minutes
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Our AI analyzes millions of data points to craft your ideal itinerary,
            complete with hidden gems and local favorites.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button className="relative overflow-hidden px-12 py-6 text-lg bg-gradient-to-r from-[#00f3ff] to-[#7d4fff] rounded-lg">
              <span className="relative z-10">Watch Demo Video</span>
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

export default InteractiveDemo;