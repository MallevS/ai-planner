import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import Particles from '@tsparticles/react';
import { loadSlim } from "@tsparticles/slim";


function Pricing() {
  const particlesInit = async (engine) => await loadSlim(engine);

  const pricingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const AIOrb = () => (
    <Sphere args={[1, 64, 64]}>
      <meshPhongMaterial
        color="#00f3ff"
        wireframe
        opacity={0.8}
        transparent
      />
    </Sphere>
  );

  const plans = [
    {
      name: "Starter",
      price: "29",
      features: [
        "Basic AI Itinerary",
        "3 Destination Options",
        "Email Support",
        "5 Trip Storage"
      ],
    //   icon: <FiZap />,
      color: "#00f3ff"
    },
    {
      name: "Explorer",
      price: "99",
      features: [
        "Advanced AI Planning",
        "Unlimited Destinations",
        "Priority Support",
        "Custom Preferences",
        "50 Trip Storage",
        "Collaboration"
      ],
    //   icon: <FiRocket />,
      color: "#7d4fff",
      featured: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Dedicated AI Engineer",
        "API Access",
        "SSO & SAML",
        "Custom Workflows",
        "Unlimited Storage",
        "24/7 Support"
      ],
    //   icon: <FiDiamond />,
      color: "#ff66cc"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1b] to-[#1a1a3a] relative overflow-hidden">
      {/* Animated Particles */}
      <div className="absolute inset-0 z-0">
        <Particles
          init={particlesInit}
          options={{
            particles: {
              number: { value: 150 },
              move: { 
                enable: true, 
                speed: 0.3,
                outModes: 'bounce',
              },
              opacity: { value: 0.4 },
              size: { value: 1.5 },
              color: { value: ['#00f3ff', '#7d4fff'] },
              links: {
                enable: true,
                distance: 150,
                color: '#00f3ff',
                opacity: 0.2,
                width: 1
              },
            }
          }}
        />
      </div>

      {/* Floating AI Orb */}
      <motion.div 
        className="absolute top-1/3 left-20 w-96 h-96 opacity-20 mix-blend-lighten"
        animate={{
          y: [0, 40, 0],
          rotate: [0, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AIOrb />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
        </Canvas>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-4">
            AI-Powered Pricing Matrix
          </h1>
          <p className="text-gray-300 text-xl">
            Choose your level of intelligence augmentation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={pricingVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
              className={`p-8 relative overflow-hidden rounded-2xl backdrop-blur-lg border ${
                plan.featured 
                  ? "border-cyan-400/30 bg-cyan-500/10 scale-105"
                  : "border-white/10 bg-white/5"
              } hover:border-${plan.color.split('#')[1]}/30 transition-all`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-600" />
              )}
              
              <div className="text-center mb-8">
                <div className={`text-4xl mb-4 mx-auto ${plan.featured ? "text-cyan-400" : "text-"+plan.color.split('#')[1]}`}>
                  {plan.icon}
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{plan.name}</h2>
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  ${plan.price}
                  {plan.price === "Custom" || <span className="text-xl text-gray-300">/mo</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <motion.li
                    key={fIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + fIndex * 0.1 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    {/* <FiCheck className={`text-${plan.color.split('#')[1]} shrink-0`} /> */}
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-xl font-semibold transition-all ${
                  plan.featured
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                    : "bg-white/5 border border-white/10 hover:border-cyan-400/30"
                }`}
              >
                Initiate Protocol
              </motion.button>

              {plan.featured && (
                <motion.div
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity
                  }}
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/10 to-purple-600/10"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Enterprise Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 text-center"
        >
          <h3 className="text-2xl font-bold text-cyan-400 mb-4">
            Need Hyperdrive Features?
          </h3>
          <p className="text-gray-300 mb-6">
            Contact our AI solutions team for custom enterprise implementations
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
          >
            Activate Enterprise AI
          </motion.button>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-1/4 right-20 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-32 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed" />
    </div>
  );
}

export default Pricing;