import React, { useMemo, lazy, Suspense } from 'react'
import { Button } from '../../ui/button';
const smoothSpring = { type: "spring", damping: 15, stiffness: 120 };
import { motion, useScroll, useTransform } from 'framer-motion';
import FeatureCard from './FeatureCard';
import TestimonialCard from './TestimonialCard';
import AIFeatureGrid from './AIFeatureGrid';
import AITimelineSection from './AITimelineSection';
import InteractiveMap from './InteractiveMap';
import InteractiveDemo from './InteractiveDemo';

function Features() {
    const { scrollYProgress } = useScroll({
        throttle: 30,
        smooth: true
    });

    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);

    const features = useMemo(() => [
        {
            title: "AI-Powered Planning",
            desc: "Instant itinerary generation powered by GPT-4",
            icon: "🤖",
            color: "#00f3ff"
        },
        {
            title: "Real-Time Pricing",
            desc: "Integrated flight/hotel pricing from 100+ providers",
            icon: "💸",
            color: "#ff66cc"
        },
        {
            title: "Local Experiences",
            desc: "Curated activities from local experts",
            icon: "🌍",
            color: "#66ff99"
        }
    ], []);

    const testimonials = useMemo(() => [
        {
            name: "Sarah Johnson",
            role: "Adventure Enthusiast",
            image: "https://randomuser.me/api/portraits/women/1.jpg",
            text: "The AI recommendations were spot-on! Found hidden gems in Tokyo I never would have discovered otherwise.",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "Digital Nomad",
            image: "https://randomuser.me/api/portraits/men/2.jpg",
            text: "Saved me hours of planning. The itineraries are perfectly balanced between tourist spots and local experiences.",
            rating: 5
        },
        {
            name: "Emma Davis",
            role: "Family Traveler",
            image: "https://randomuser.me/api/portraits/women/3.jpg",
            text: "Perfect for family trips! The AI considered our kids' needs and created a stress-free schedule.",
            rating: 5
        }
    ], []);

    const aiFeatures = useMemo(() => [
        {
            title: "Smart Itinerary Planning",
            description: "AI algorithms create personalized day-by-day schedules based on your preferences",
            icon: "🎯",
            color: "#00f3ff"
        },
        {
            title: "Dynamic Weather Adaptation",
            description: "Real-time itinerary adjustments based on weather forecasts",
            icon: "🌦️",
            color: "#ff66cc"
        },
        {
            title: "Budget Optimization",
            description: "Smart cost allocation across accommodations, activities, and dining",
            icon: "💎",
            color: "#66ff99"
        },
        {
            title: "Local Insights",
            description: "Access to hidden gems and local recommendations",
            icon: "🗺️",
            color: "#ffcc00"
        },
        {
            title: "Real-time Updates",
            description: "Live updates for attractions, events, and booking availability",
            icon: "⚡",
            color: "#ff9966"
        },
        {
            title: "Smart Transportation",
            description: "Optimal routes and transportation methods between destinations",
            icon: "🚀",
            color: "#cc99ff"
        }
    ], []);

    const LoadingFallback = () => (
        <div className="w-full h-64 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-t-[#00f3ff] rounded-full animate-spin" />
        </div>
    );

    return (
        <div style={{ background: 'linear-gradient(to bottom, #081125, #0a1a3a)' }}>
            {/* Feature Grid Section with Particle Background */}
            <section className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            feature={feature}
                            index={index}
                        />
                    ))}
                </div>
            </section>

            {/* Interactive Demo Section */}
            <Suspense fallback={<LoadingFallback />}>
                <InteractiveDemo />
            </Suspense>


            {/* Testimonials Section */}
            <section className="py-24 px-6 bg-gradient-to-r from-[rgba(0,119,255,0.05)] to-[rgba(170,0,255,0.05)]">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto text-center"
                >
                    <h2 className="text-4xl font-bold text-white mb-12">
                        What Our Travelers Say
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                        {testimonials.map((testimonial, i) => (
                            <TestimonialCard
                                key={i}
                                testimonial={testimonial}
                                index={i}
                                smoothSpring={smoothSpring}
                            />
                        ))}
                    </div>
                </motion.div>
            </section>

            <div style={{ background: 'linear-gradient(to bottom, #081125, #0a1a3a)' }}>
                {/* AI-Powered Features Grid */}
                <Suspense fallback={<LoadingFallback />}>
                    <AIFeatureGrid features={aiFeatures} smoothSpring={smoothSpring} />
                </Suspense>

                {/* Interactive AI Map Section */}
                <Suspense fallback={<LoadingFallback />}>
                    <InteractiveMap scaleProgress={scaleProgress} />
                </Suspense>

                {/* AI Itinerary Timeline */}
                <Suspense fallback={<LoadingFallback />}>
                    <AITimelineSection smoothSpring={smoothSpring} />
                </Suspense>

                <section style={{ padding: '6rem 1.5rem', position: 'relative' }}>
                    <div style={{
                        maxWidth: '56rem',
                        margin: '0 auto',
                        textAlign: 'center',
                        position: 'relative'
                    }}>
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', bounce: 0.4 }}
                        >
                            <h2 style={{
                                fontSize: '3rem',
                                fontWeight: 700,
                                color: '#fff',
                                marginBottom: '2rem',
                                textShadow: '0 0 20px rgba(0, 243, 255, 0.5)'
                            }}>
                                Ready to Revolutionize Your Travel Planning?
                            </h2>
                            <p style={{
                                fontSize: '1.25rem',
                                color: 'rgba(255, 255, 255, 0.7)',
                                marginBottom: '3rem'
                            }}>
                                Join thousands of savvy travelers already using AI Trip Planner
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{ display: 'inline-block' }}
                            >
                                <Button style={{
                                    padding: '1.5rem 3rem',
                                    fontSize: '1.25rem',
                                    background: 'linear-gradient(45deg, #00f3ff, #ff66cc)',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <span style={{ position: 'relative', zIndex: 1 }}>
                                        Start Planning Free Today
                                    </span>
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.1) 50%)',
                                        backgroundSize: '300% 300%',
                                        transition: '0.5s',
                                        opacity: 0
                                    }} />
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>

    )
}

export default Features