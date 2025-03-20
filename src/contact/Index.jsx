import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import Particles from '@tsparticles/react';
import { loadSlim } from "@tsparticles/slim";
import { FiSend, FiMail, FiSmartphone, FiLinkedin, FiGithub } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Contact() {
    const [success, setSuccess] = useState(false);
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

    const HologramOrb = () => (
        <Sphere args={[1, 64, 64]}>
            <meshPhongMaterial
                color="#00f3ff"
                wireframe
                opacity={0.8}
                transparent
            />
        </Sphere>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 30000);
    };

    return (
        <div className='min-h-screen bg-gradient-to-b from-[#0a0a1b] to-[#1a1a3a] relative overflow-hidden'>
            {/* Success Modal */}
            <AnimatePresence>
                {success && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
                    >
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="bg-white p-8 rounded-xl shadow-2xl text-center"
                        >
                            <motion.div
                                initial={{ rotate: 0 }}
                               

                                className="mb-4 text-cyan-500 text-4xl"
                            >
                                <img src="/success.gif" alt="" />
                            </motion.div>
                            <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                            <p className="text-gray-600">
                                Thank you for reaching out. We will get back to you shortly.
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Interactive Particles */}
            <div className="absolute inset-0 z-0">
                <Particles
                    init={particlesInit}
                    options={{
                        particles: {
                            number: { value: 200 },
                            move: {
                                enable: true,
                                speed: 0.5,
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

            {/* Holographic Interface Orb */}
            <motion.div
                className="absolute top-1/4 right-20 w-96 h-96 opacity-20 mix-blend-lighten"
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
                    <HologramOrb />
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
                        className="mt-20 text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Connect with Our Neural Network
                    </motion.h1>

                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Holographic Form */}
                        <motion.div
                            className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all"
                            variants={floatingVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <label className="block text-lg mb-3 text-white">Your Name</label>
                                    <input
                                        type="text"
                                        className="text-white w-full bg-[#0a0f1f] border border-gray-700 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-cyan-500 transition-all"
                                        placeholder="Enter your name"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <label className="block text-white text-lg mb-3">E-mail</label>
                                    <input
                                        type="email"
                                        className="text-white w-full bg-[#0a0f1f] border border-gray-700 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-cyan-500 transition-all"
                                        placeholder="Enter your email"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <label className="block text-cyan-400 text-lg mb-3">Message</label>
                                    <textarea
                                        rows="5"
                                        className="text-white w-full bg-[#0a0f1f] border border-gray-700 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-cyan-500 transition-all"
                                        placeholder="Type your message across dimensions..."
                                    />
                                </motion.div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-white w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-lg font-semibold transition-all"
                                >
                                    <FiSend className="text-xl" />
                                    Send Message
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Contact Channels */}
                        <div className="space-y-10">
                            {/* Contact Cards */}
                            <motion.div
                                className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-purple-400/30 transition-all group"
                                whileHover={{ y: -10 }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-4 bg-cyan-500/10 rounded-xl">
                                        <FiMail className="text-3xl text-cyan-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Direct Neural Link</h3>
                                </div>
                                <p className="text-gray-300">contact@neuraltravel.ai</p>
                            </motion.div>

                            <motion.div
                                className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-purple-400/30 transition-all group"
                                whileHover={{ y: -10 }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-4 bg-purple-500/10 rounded-xl">
                                        <FiSmartphone className="text-3xl text-purple-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Quantum Communication</h3>
                                </div>
                                <p className="text-gray-300">+1 (555) 867-5309</p>
                            </motion.div>

                            {/* Social Grid */}
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { icon: <FiLinkedin />, color: '#0A66C2' },
                                    { icon: <FiGithub />, color: '#333' },
                                    { icon: <FiMail />, color: '#EA4335' }
                                ].map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href="#"
                                        className="p-6 flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-cyan-400/30 transition-all"
                                        whileHover={{ scale: 1.05 }}
                                        style={{ color: social.color }}
                                    >
                                        <span className="text-2xl">{social.icon}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <motion.div
                        className="relative bottom-0 left-0 w-full text-center mt-20 mb-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <p className="text-gray-400">
                            "Travel is the only thing you buy that makes you richer"
                            <span className="block mt-2 text-cyan-400">-  AI Trip Planner</span>
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Background Effects */}
            <div className="absolute top-1/3 left-20 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-32 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed" />
        </div>
    )
}

export default Contact