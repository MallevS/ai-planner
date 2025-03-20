// import { Button } from '@/components/ui/button';
// import { fetchImageFromCustomSearch } from '@/service/GlobalApi';
// import React, { useEffect, useState } from 'react'
// import { IoIosSend } from 'react-icons/io';
// import { motion, AnimatePresence } from 'framer-motion';

// function InfoSection({ trip }) {
//     const [photoUrl, setPhotoUrl] = useState();
//     const [imageLoaded, setImageLoaded] = useState(false);

//     useEffect(() => {
//         trip && fetchPhoto();
//     }, [trip])

//     const fetchPhoto = async () => {
//         try {
//             const imageUrl = await fetchImageFromCustomSearch(trip?.userSelection?.location?.label);
//             setPhotoUrl(imageUrl);
//         } catch (error) {
//             console.error('Error fetching photo:', error);
//             setPhotoUrl('/placeholder.jpg');
//         }
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="space-y-6"
//         >
//             <div className="relative overflow-hidden rounded-2xl">
//                 {/* Animated gradient border */}
//                 <motion.div
//                     className="absolute inset-0 z-0"
//                     animate={{
//                         background: [
//                             "linear-gradient(0deg, rgba(6, 182, 212, 0.3) 0%, transparent 100%)",
//                             "linear-gradient(180deg, rgba(6, 182, 212, 0.3) 0%, transparent 100%)",
//                             "linear-gradient(0deg, rgba(6, 182, 212, 0.3) 0%, transparent 100%)"
//                         ]
//                     }}
//                     transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
//                 />

//                 {/* Main image with loading animation */}
//                 <motion.img
//                     src={photoUrl}
//                     alt={trip?.userSelection?.location?.label || 'Location'}
//                     className="w-full h-[500px] object-cover rounded-2xl relative z-10"
//                     initial={{ scale: 1.1, opacity: 0 }}
//                     animate={{ 
//                         scale: imageLoaded ? 1 : 1.1,
//                         opacity: imageLoaded ? 1 : 0
//                     }}
//                     transition={{ duration: 0.5 }}
//                     onLoad={() => setImageLoaded(true)}
//                     onError={(e) => {
//                         e.target.src = '/placeholder.jpg';
//                         console.error('Image failed to load');
//                     }}
//                 />

//                 {/* Glassmorphism overlay */}
//                 <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl p-6 z-20">
//                     <motion.div
//                         initial={{ y: 20, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         className="flex justify-between items-center"
//                     >
//                         <div className="space-y-4">
//                             <motion.h1 
//                                 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent"
//                             >
//                                 {trip?.userSelection?.location?.label}
//                             </motion.h1>
//                             <div className="flex gap-4">
//                                 {[
//                                     { icon: '📅', text: `${trip.userSelection?.noOfDays} Days` },
//                                     { icon: '💰', text: trip.userSelection?.budget },
//                                     { icon: '🥂', text: `${trip.userSelection?.traveler} Travelers` }
//                                 ].map((item, index) => (
//                                     <motion.div
//                                         key={index}
//                                         initial={{ scale: 0 }}
//                                         animate={{ scale: 1 }}
//                                         transition={{ delay: index * 0.1 }}
//                                         className="relative group"
//                                     >
//                                         <div className="absolute inset-0 bg-cyan-500 rounded-full blur-sm opacity-25 group-hover:opacity-40 transition-opacity" />
//                                         <div className="relative bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
//                                             <span>{item.icon}</span>
//                                             <span className="text-white">{item.text}</span>
//                                         </div>
//                                     </motion.div>
//                                 ))}
//                             </div>
//                         </div>

//                         <motion.div
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             <Button className="bg-cyan-500 text-white p-4 rounded-full hover:bg-cyan-400 transition-colors">
//                                 <motion.div>
//                                     <IoIosSend size={24} />
//                                 </motion.div>
//                             </Button>
//                         </motion.div>
//                     </motion.div>
//                 </div>
//             </div>
//         </motion.div>
//     );
// }

// export default InfoSection
import { Button } from '@/components/ui/button';
import { fetchImageFromCustomSearch } from '@/service/GlobalApi';
import React, { useEffect, useState, useCallback } from 'react';
import { IoIosSend } from 'react-icons/io';
import { motion } from 'framer-motion';

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const fetchPhoto = useCallback(async () => {
    if (!trip?.userSelection?.location?.label) return;
    try {
      const imageUrl = await fetchImageFromCustomSearch(trip.userSelection.location.label);
      setPhotoUrl(imageUrl);
    } catch (error) {
      console.error('Error fetching photo:', error);
      setPhotoUrl('/AI-TRIP-PLANNER/placeholder.jpg');
    }
  }, [trip]);

  useEffect(() => {
    fetchPhoto();
  }, [fetchPhoto]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="relative overflow-hidden rounded-2xl">
        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            background: [
              "linear-gradient(0deg, rgba(6, 182, 212, 0.3) 0%, transparent 100%)",
              "linear-gradient(180deg, rgba(6, 182, 212, 0.3) 0%, transparent 100%)",
              "linear-gradient(0deg, rgba(6, 182, 212, 0.3) 0%, transparent 100%)"
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        {/* Main image with loading animation */}
        <motion.img
          src={photoUrl}
          alt={trip?.userSelection?.location?.label || 'Location'}
          loading="lazy"
          className="w-full h-[500px] object-cover rounded-2xl relative z-10"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{
            scale: imageLoaded ? 1 : 1.1,
            opacity: imageLoaded ? 1 : 0
          }}
          transition={{ duration: 0.5 }}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = '/AI-TRIP-PLANNER/placeholder.jpg';
            console.error('Image failed to load');
          }}
        />

        {/* Glassmorphism overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl p-6 z-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-between items-center"
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent"
              >
                {trip?.userSelection?.location?.label}
              </motion.h1>
              <div className="flex gap-4">
                {[
                  { icon: '📅', text: `${trip.userSelection?.noOfDays} Days` },
                  { icon: '💰', text: trip.userSelection?.budget },
                  { icon: '🥂', text: `${trip.userSelection?.traveler} Travelers` }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-cyan-500 rounded-full blur-sm opacity-25 group-hover:opacity-40 transition-opacity" />
                    <div className="relative bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span className="text-white">{item.text}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-cyan-500 text-white p-4 rounded-full hover:bg-cyan-400 transition-colors">
                <motion.div>
                  <IoIosSend size={24} />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default InfoSection;
