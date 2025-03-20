import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import React, { useEffect, useState, } from 'react'
import { Link, useNavigation } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';

function MyTrips() {
    const navigation = useNavigation();
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        GetUserTrips();
    }, []);

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigation('/');
            return;
        }

        try {
            const q = query(collection(db, "AITrips"), where('userEmail', '==', user?.email),
                orderBy('createdAt', 'desc')
            );
            const querySnapshot = await getDocs(q);
            const trips = [];

            querySnapshot.forEach((doc) => {
                trips.push({
                    ...doc.data(),
                    docId: doc.id
                });
            });

            setUserTrips(trips);
        } catch (error) {
            console.error("Error fetching trips:", error);
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-[#0a0a1b] to-[#1a1a3a]'>
            {/* Hero Section */}
            <div className='relative overflow-hidden'>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='max-w-7xl mx-auto px-6 pt-24 pb-12'
                >
                    <h1 className="text-4xl md:text-5xl font-bold  text-white mb-4">
                        Your Adventures
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Explore your personalized AI-crafted travel experiences and upcoming journeys.
                    </p>
                </motion.div>
            </div>

            {/* Trips Grid */}
            <div className='max-w-7xl mx-auto px-6 pb-24'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {/* New Trip Card */}
                    <Link to="/create-trip">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="h-[280px] rounded-2xl border border-dashed border-gray-500/30 flex flex-col items-center justify-center gap-4 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer group"
                        >
                            <PlusCircle className="w-12 h-12 text-[#00f3ff] group-hover:scale-110 transition-transform" />
                            <p className="text-gray-400 group-hover:text-white transition-colors">Create New Trip</p>
                        </motion.div>
                    </Link>

                    {/* Trip Cards */}
                    {userTrips?.length > 0 ? (
                        userTrips.map((trip, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                key={trip.id || index}
                            >
                                <UserTripCardItem trip={trip} />
                            </motion.div>
                        ))
                    ) : (
                        [...Array(5)].map((_, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="h-[280px] rounded-2xl bg-gradient-to-r from-white/5 to-white/10 animate-pulse"
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyTrips