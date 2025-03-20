import { motion } from 'framer-motion';
import React, { memo } from 'react';

const TestimonialCard = memo(({ testimonial, index, smoothSpring }) => {
    return (
        <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, ...smoothSpring }}
            whileHover={{ y: -10 }}
            className="relative overflow-hidden rounded-2xl p-8 bg-white/5 backdrop-blur-lg"
        >
            {/* Gradient Border */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00f3ff] to-[#7d4fff]" />

            {/* Profile Image */}
            <div className="relative w-20 h-20 mx-auto mb-6">
                <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full rounded-full object-cover border-3 border-[#00f3ff]"
                />
                <div className="absolute inset-[-3px] rounded-full bg-gradient-to-r from-[#00f3ff] to-[#7d4fff] opacity-50 blur-lg -z-10" />
            </div>

            {/* Testimonial Text */}
            <p className="text-white/90 text-lg leading-relaxed mb-6 min-h-[80px]">
                "{testimonial.text}"
            </p>

            {/* Rating Stars */}
            <div className="flex justify-center gap-2 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-[#00f3ff]">★</span>
                ))}
            </div>

            {/* Name and Role */}
            <h3 className="text-white text-xl font-semibold mb-2">
                {testimonial.name}
            </h3>
            <p className="text-white/70 text-sm">
                {testimonial.role}
            </p>
        </motion.div>
    );
});

export default TestimonialCard;