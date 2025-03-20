import { fetchImageFromCustomSearch } from '@/service/GlobalApi';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import { Clock, MapPin, Ticket } from 'lucide-react';

function PlaceCardItem({ place }) {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='grid grid-cols-1 md:grid-cols-2 gap-5'
        >
            {place.places && place.places.map((placeItem, index) => (
                <PlaceItem key={index} placeItem={placeItem} />
            ))}
        </motion.div>
    );
}

function PlaceItem({ placeItem }) {
    const [photoUrl, setPhotoUrl] = useState();
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (placeItem?.placeName) {
            fetchPhoto();
        }
    }, [placeItem])

    const fetchPhoto = async () => {
        try {
            const imageUrl = await fetchImageFromCustomSearch(placeItem.placeName);
            setPhotoUrl(imageUrl);
        } catch (error) {
            console.error('Error fetching photo:', error);
            setPhotoUrl('/AI-TRIP-PLANNER/placeholder.jpg');
        }
    };

    return (
        <Link 
            to={'https://www.google.com/maps/search/?api=1&query=' + placeItem?.placeName} 
            target='_blank'
            className='block'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                whileHover={{ y: -8 }}
                className="group relative bg-gradient-to-br from-white/[0.07] to-transparent rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm"
            >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    />
                    <motion.img
                        src={photoUrl || '/AI-TRIP-PLANNER/placeholder.jpg'}
                        alt={placeItem.placeName}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        onError={(e) => {
                            e.target.src = '/AI-TRIP-PLANNER/placeholder.jpg';
                        }}
                    />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <motion.h3 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl font-semibold text-white group-hover:text-[#00f3ff] transition-colors"
                    >
                        {placeItem.placeName}
                    </motion.h3>

                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-sm line-clamp-2"
                    >
                        {placeItem.placeDetails}
                    </motion.p>

                    <div className="space-y-2">
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2 text-gray-400"
                        >
                            <Clock className="w-4 h-4 text-[#00f3ff]" />
                            <span className="text-sm">{placeItem.timeTravel}</span>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-2 text-gray-400"
                        >
                            <Ticket className="w-4 h-4 text-[#00f3ff]" />
                            <span className="text-sm">{placeItem.ticketPricing}</span>
                        </motion.div>
                    </div>
                </div>

                {/* Hover Effects */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-[#00f3ff]/10 to-transparent pointer-events-none transition-opacity"
                    initial={false}
                />
            </motion.div>
        </Link>
    )
}

export default PlaceCardItem