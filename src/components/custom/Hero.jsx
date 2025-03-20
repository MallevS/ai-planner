import React, { useEffect, useRef, Suspense } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';
import Particles from '@tsparticles/react';
import { loadSlim } from "@tsparticles/slim";
import Globe from './Globe';

function Hero() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const controls = useAnimation();
    const particlesInit = async (engine) => await loadSlim(engine);

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    const floatingVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
                when: "beforeChildren"
            }
        }
    };

    return (
        <div className="relative h-[92vh] flex  items-center justify-center overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0">
                <Particles
                    init={particlesInit}
                    options={{
                        fps_limit: 30,
                        particles: {
                            number: { value: 30 },
                            move: {
                                enable: true,
                                speed: 0.3,
                                outModes: "out"
                            },
                            opacity: { value: 0.3 },
                            size: { value: 1 },
                        },
                        retina_detect: false,
                        detectRetina: false
                    }}
                    className="absolute inset-0"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0" style={{ background: '#081125' }} />
            </div>

            {/* 3D Globe */}
            <div className="absolute left-1/2 top-250 -translate-x-1/2 -translate-y-1/2 w-[3000px] h-[3000px] opacity-100 mix-blend-screen z-0">
                <Suspense fallback={null}>
                    <Globe />
                </Suspense>
            </div>

            {/* Content */}
            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                className="mainHeroText relative z-10 flex flex-col items-center max-w-5xl gap-9 px-4"
            >
                <motion.h1
                    className="text-5xl md:text-7xl text-center leading-tight"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
                        }
                    }}
                >
                    {["Discover Your Next Adventure with AI: Personalized Itineraries at Your Fingertips"].map((text, i) => (
                        <motion.span
                            key={i}
                            className="block bg-clip-text text-white"
                            variants={floatingVariants}
                        >
                            {text}
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.p
                    className="text-xl text-gray-300 text-center max-w-2xl"
                    variants={floatingVariants}
                >
                    Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
                </motion.p>

                <motion.div variants={floatingVariants}>
                    <Link to="/create-trip">
                        <Button className="cssbuttons-io-button">
                            <span>Get Started, It's Free</span>
                            <div className="icon">
                                <svg
                                    height="24"
                                    width="24"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </div>
                        </Button>
                    </Link>
                </motion.div>

                {/* Floating Micro-interactions */}
                <div className="absolute -top-20 -left-20 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl animate-float" />
                <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed" />
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-25 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2,  ease: "linear" }}
            >
                <div className="w-4 h-4 border-2 border-white rounded-full" />
                <span className="text-sm text-gray-300">Explore More</span>
            </motion.div>
        </div>
    );
}

export default Hero;