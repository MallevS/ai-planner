import { motion } from 'framer-motion';
import React, { memo } from 'react';

const AIFeature = memo(({ feature, index, smoothSpring }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, ...smoothSpring }}
    whileHover={{
      scale: 1.05,
      boxShadow: `0 0 30px ${feature.color}20`
    }}
    className="relative overflow-hidden rounded-2xl p-8 bg-white/[0.03] backdrop-blur-lg border"
    style={{ borderColor: `${feature.color}30` }}
  >
    <motion.div
   
      className="text-4xl mb-4"
      style={{ textShadow: `0 0 20px ${feature.color}` }}
    >
      {feature.icon}
    </motion.div>

    <h3 className="text-2xl font-semibold text-white mb-4">
      {feature.title}
    </h3>

    <p className="text-white/70 leading-relaxed">
      {feature.description}
    </p>

    <div
      className="absolute inset-[-50%] pointer-events-none opacity-50"
      style={{
        background: `radial-gradient(circle at 50% 50%, ${feature.color}10, transparent 70%)`
      }}
    />
  </motion.div>
));

const AIFeatureGrid = memo(({ features, smoothSpring }) => {
  return (
    <section className="py-24 px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ...smoothSpring, staggerChildren: 0.2 }}
        className="max-w-7xl mx-auto grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature, index) => (
          <AIFeature
            key={index}
            feature={feature}
            index={index}
            smoothSpring={smoothSpring}
          />
        ))}
      </motion.div>
    </section>
  );
});

export default AIFeatureGrid;