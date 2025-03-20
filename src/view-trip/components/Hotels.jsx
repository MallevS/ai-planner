// import React from 'react'
// import { Link } from 'react-router-dom'
// import HotelCardItem from './HotelCardItem'
// import { motion } from 'framer-motion';


// function Hotels({ trip }) {
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1
//             }
//         }
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="space-y-6"
//         >
//             {/* Title Section with Gradient and Animation */}
//             <div className="relative mt-10">
//                 <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="flex flex-col gap-2"
//                 >
//                     <h2 className="text-3xl font-bold text-white">
//                         Hotel Recommendations
//                     </h2>
//                     <p className="text-gray-400">
//                         Curated accommodations based on your preferences
//                     </p>
//                 </motion.div>
                
//                 {/* Decorative Elements */}
//                 <motion.div
//                     className="absolute -z-10 top-0 left-0 w-32 h-32 bg-[#00f3ff] rounded-full filter blur-[80px] opacity-20"
//                     animate={{
//                         scale: [1, 1.2, 1],
//                         opacity: [0.2, 0.3, 0.2]
//                     }}
//                     transition={{ duration: 4, repeat: Infinity }}
//                 />
//             </div>

//             {/* Grid Container with Stagger Animation */}
//             <motion.div
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//             >
//                 {trip?.tripData?.hotelOptions?.map((hotel, index) => (
//                     <motion.div
//                         key={index}
//                         variants={{
//                             hidden: { opacity: 0, y: 20 },
//                             visible: { opacity: 1, y: 0 }
//                         }}
//                     >
//                         <HotelCardItem hotel={hotel} />
//                     </motion.div>
//                 ))}
//             </motion.div>

//             {/* Empty State */}
//             {(!trip?.tripData?.hotelOptions || trip.tripData.hotelOptions.length === 0) && (
//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="text-center py-12"
//                 >
//                     <div className="relative">
//                         <motion.div
//                             className="absolute inset-0 rounded-3xl opacity-20"
//                             animate={{
//                                 background: [
//                                     "radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)",
//                                     "radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)",
//                                     "radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)"
//                                 ]
//                             }}
//                             transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
//                         />
//                         <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
//                             <motion.div
//                                 className="text-6xl mb-4"
//                                 animate={{ y: [0, -10, 0] }}
//                                 transition={{ duration: 2, repeat: Infinity }}
//                             >
//                                 🏨
//                             </motion.div>
//                             <h3 className="text-xl font-semibold text-cyan-400 mb-2">
//                                 No Hotels Found
//                             </h3>
//                             <p className="text-gray-400">
//                                 We're still searching for the perfect accommodations for your trip.
//                             </p>
//                         </div>
//                     </div>
//                 </motion.div>
//             )}
//         </motion.div>
//     );
// }

// export default Hotels
import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'
import { motion } from 'framer-motion';

function Hotels({ trip }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Title Section with Gradient and Animation */}
      <div className="relative mt-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2"
        >
          <h2 className="text-3xl font-bold text-white">
            Hotel Recommendations
          </h2>
          <p className="text-gray-400">
            Curated accommodations based on your preferences
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute -z-10 top-0 left-0 w-32 h-32 bg-[#00f3ff] rounded-full filter blur-[80px] opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Grid Container with Stagger Animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {trip?.tripData?.hotelOptions === undefined ? (
          [...Array(5)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="h-[280px] rounded-2xl bg-gradient-to-r from-white/5 to-white/10 animate-pulse"
            />
          ))
        ) : trip.tripData.hotelOptions.length > 0 ? (
          trip.tripData.hotelOptions.map((hotel, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <HotelCardItem hotel={hotel} />
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 col-span-full"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-20"
                animate={{
                  background: [
                    "radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)"
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🏨
                </motion.div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                  No Hotels Found
                </h3>
                <p className="text-gray-400">
                  We're still searching for the perfect accommodations for your trip.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Hotels;
