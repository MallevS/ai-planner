import { fetchImageFromCustomSearch, GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function SkeletonCard() {
    return (
        <div className="relative h-[280px] rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5">
            <div className="animate-pulse h-full w-full">
                {/* Skeleton Background */}
                <div className="absolute inset-0 bg-white/5" />

                {/* Skeleton Content */}
                <div className="relative z-20 p-6 h-full flex flex-col justify-between">
                    <div>
                        {/* Location Badge Skeleton */}
                        <div className="w-32 h-8 bg-white/10 rounded-full" />
                    </div>

                    <div className="space-y-4">
                        {/* Trip Info Skeleton */}
                        <div className="flex gap-4">
                            <div className="w-20 h-6 bg-white/10 rounded-md" />
                            <div className="w-20 h-6 bg-white/10 rounded-md" />
                        </div>
                        {/* Budget Skeleton */}
                        <div className="w-24 h-8 bg-white/10 rounded-md" />
                    </div>
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]">
                    <div className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
            </div>
        </div>
    );
}

function UserTripCardItem({ trip }) {
    const [photoUrl, setPhotoUrl] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        trip && fetchPhoto();
    }, [trip])

    const fetchPhoto = async () => {
        setIsLoading(true);

        try {
            const imageUrl = await fetchImageFromCustomSearch(trip?.userSelection?.location?.label);
            setPhotoUrl(imageUrl);
        } catch (error) {
            console.error('Error fetching photo:', error);
            setPhotoUrl('/AI-TRIP-PLANNER/placeholder.jpg');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <SkeletonCard />;
    }

    return (
        <Link to={`/view-trip/${trip.docId}`}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative h-[280px] rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 hover:border-[#00f3ff]/50 transition-all"
            >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />

                {/* Background Image */}
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                    src={photoUrl}
                    alt={trip.userSelection.location.label}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative z-20 p-6 h-full flex flex-col justify-between"
                >
                    <div>
                        {/* Location Badge */}
                        <div className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full mb-4">
                            <MapPin className="w-4 h-4 text-[#00f3ff]" />
                            <span className="text-sm text-white">
                                {trip.userSelection.location.label}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Trip Info */}
                        <div className="flex gap-4 text-sm text-gray-300">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{trip.userSelection.noOfDays} Days</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{trip.userSelection.traveler}</span>
                            </div>
                        </div>

                        {/* Budget */}
                        <div className="font-semibold text-lg text-[#00f3ff]">
                            ${trip.userSelection.budget}
                        </div>
                    </div>
                </motion.div>

                {/* Hover Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#00f3ff]/10 to-[#7d4fff]/10 transition-opacity z-10" />
            </motion.div>
        </Link>
    );
}

export default UserTripCardItem