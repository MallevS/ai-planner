import { motion } from 'framer-motion';
import React, { memo } from 'react';

const FeatureCard = memo(({ feature, index }) => {
    const floatingVariants = {
        float: {
            y: [-5, 5, -5],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse" 
            }
        }
    };

    return (
        <motion.div
          className="feature-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
          style={{
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            borderRadius: '1rem',
            border: `1px solid ${feature.color}20`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <motion.div
            variants={floatingVariants}
       
            style={{
              fontSize: '4rem',
              marginBottom: '1.5rem',
              textShadow: `0 0 20px ${feature.color}`
            }}
          >
            {feature.icon}
          </motion.div>
          
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '1rem'
          }}>
            {feature.title}
          </h3>
          
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.6
          }}>
            {feature.desc}
          </p>
    
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            right: '-50%',
            bottom: '-50%',
            background: `radial-gradient(circle at 50% 50%, ${feature.color}10, transparent 60%)`,
            pointerEvents: 'none'
          }} />
        </motion.div>
      );
});

export default FeatureCard;