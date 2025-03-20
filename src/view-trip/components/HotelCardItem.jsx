
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, MapPin, ExternalLink, Wifi, Coffee, Tv } from 'lucide-react';
import { motion } from 'framer-motion';

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        hotel && fetchHotelImage();
    }, [hotel])

    const amenities = [
        { icon: <Wifi className="w-4 h-4" />, label: 'Free WiFi' },
        { icon: <Coffee className="w-4 h-4" />, label: 'Breakfast' },
        { icon: <Tv className="w-4 h-4" />, label: 'Smart TV' },
    ];

    const fetchHotelImage = async () => {
        const apiKey = import.meta.env.VITE_GOOGLE_CUSTOM_SEARCH_API_KEY;
        const cx = import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID;

        if (!hotel?.hotelName || !apiKey || !cx) {
            return;
        }

        const query = `${hotel.hotelName} luxury hotel exterior`;

        const url = `https://www.googleapis.com/customsearch/v1?q=${query}&searchType=image&imgType=photo&fileType=jpg&key=${apiKey}&cx=${cx}`;

        try {
            const response = await axios.get(url);

            if (response.data.items && response.data.items.length > 0) {
                const imageUrl = response.data.items[0].link;
                setPhotoUrl(imageUrl);
            } else {
            }
        } catch (error) {
        }
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group relative bg-gradient-to-br from-white/[0.07] to-transparent rounded-2xl overflow-hidden border border-white/[0.05] backdrop-blur-sm h-[28rem]"
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
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                />
                {/* Price Badge */}
                <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    <span className="text-[#00f3ff] font-semibold">{hotel.price}/night</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
                {/* Hotel Name and Rating */}

                <div className="space-y-1">
                    <h3 className="font-semibold text-lg text-white group-hover:text-[#00f3ff] transition-colors">
                        {hotel.hotelName}
                    </h3>
                    <div className="flex items-center gap-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => {
                                const starValue = i + 1;
                                const isFullStar = Math.floor(hotel.rating) >= starValue;
                                const isHalfStar = !isFullStar && hotel.rating > i + 0.3;

                                return (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${isFullStar
                                            ? 'fill-[#00f3ff] text-[#00f3ff]'
                                            : isHalfStar
                                                ? 'fill-[#00f3ff]/50 text-[#00f3ff]'
                                                : 'text-gray-500'
                                            }`}
                                    />
                                );
                            })}
                        </div>
                        <span className="text-sm text-gray-400">({hotel.rating} reviews)</span>
                    </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm truncate">{hotel.hotelAddress}</span>
                </div>

                {/* Amenities */}
                <div className="flex gap-3">
                    {amenities.map((amenity, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-1 text-gray-400 text-sm"
                        >
                            {amenity.icon}
                            <span className="hidden sm:inline">{amenity.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Hover Effects */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-[#00f3ff]/10 to-transparent pointer-events-none transition-opacity"
                initial={false}
            />

            {/* Book Now Button */}
        
            <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <a
                    href={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + "," + hotel?.hotelAddress}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 flex-1 bg-[#00f3ff] text-black font-semibold py-2 rounded-lg hover:bg-[#00f3ff]/90 transition-colors"
                >
                    Book Now
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </motion.div>
    );
}

export default HotelCardItem