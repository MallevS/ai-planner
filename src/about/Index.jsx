import React from 'react'
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import Particles from '@tsparticles/react';
import { loadSlim } from "@tsparticles/slim";

function About() {
    const particlesInit = async (engine) => await loadSlim(engine);

    const floatingVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.8,
            ease: 'easeOut'
          }
        }
      };

    const Globe = () => (
        <Sphere args={[1, 64, 64]}>
          <meshPhongMaterial
            color="#00f3ff"
            wireframe
            opacity={0.8}
            transparent
          />
        </Sphere>
      );
   
  return (
    <div className='min-h-screen bg-gradient-to-b from-[#0a0a1b] to-[#1a1a3a] relative overflow-hidden'>
      {/* Animated Particles Background */}
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
              color: { value: ['#00f3ff', '#7d4fff', '#66ff99'] },
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
        className="absolute top-1/3 right-20 w-96 h-96 opacity-20 mix-blend-lighten"
        animate={{
          y: [0, 20, 0],
          rotate: [0, 360]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Globe />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
        </Canvas>
      </motion.div>

      <div className='relative overflow-hidden'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='max-w-7xl mx-auto px-6 pt-24 pb-12 relative z-10'
        >
          <motion.h1 
            className="mt-20 text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            About Our AI Travel Architect
          </motion.h1>

          {/* Animated Content Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              className="space-y-6"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all"
                variants={floatingVariants}
              >
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">🧠 Neural Itinerary Engine</h2>
                <p className="text-gray-300 leading-relaxed">
                  Our AI analyzes millions of data points including weather patterns, local events, 
                  and cultural trends to craft your perfect journey using advanced machine learning algorithms.
                </p>
              </motion.div>

              <motion.div 
                className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-purple-400/30 transition-all"
                variants={floatingVariants}
              >
                <h2 className="text-2xl font-bold text-purple-400 mb-4">🌐 Global Intelligence Network</h2>
                <p className="text-gray-300 leading-relaxed">
                  Integrated with real-time data from 50+ travel services and local experts worldwide, 
                  ensuring your plans stay updated with the latest information.
                </p>
              </motion.div>
            </motion.div>

            {/* Interactive 3D Timeline */}
            <motion.div 
              className="relative h-96 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border-2 border-cyan-400/30 rounded-full animate-pulse" />
                <div className="absolute w-48 h-48 border-2 border-purple-400/30 rounded-full animate-pulse" />
                <div className="absolute flex flex-col items-center text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-xl font-bold text-cyan-400">2025</h3>
                  <p className="text-gray-300">Founded</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Team Section */}
          <motion.div 
            className="mt-24 grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {['AI Experts', 'Travel Gurus', 'Tech Wizards'].map((team, index) => (
              <motion.div 
                key={index}
                className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all group"
                whileHover={{ y: -10 }}
              >
                <div className="text-6xl mb-4 group-hover:text-cyan-400 transition-colors">
                  {['🤖', '🌍', '💻'][index]}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{team}</h3>
                <p className="text-gray-300">
                  {[
                    'Deep learning specialists crafting intelligent travel algorithms',
                    'Global explorers curating authentic local experiences',
                    'Software engineers building the future of travel tech'
                  ][index]}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-20 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-32 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed" />
    </div>
  )
}

export default About