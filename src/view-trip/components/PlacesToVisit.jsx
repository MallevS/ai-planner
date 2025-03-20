// import React from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import PlaceCardItem from './PlaceCardItem';
// import { Clock, MapPin, Sparkles } from 'lucide-react';

// function PlacesToVisit({ trip }) {
//     const { scrollY } = useScroll();
//     const opacity = useTransform(scrollY, [0, 200], [1, 0]);
//     const scale = useTransform(scrollY, [0, 200], [1, 0.95]);


//     const sortedItinerary = React.useMemo(() => {
//         const itinerary = trip?.tripData?.itinerary || {};
//         return Object.entries(itinerary)
//             .sort(([dayA], [dayB]) => {
//                 const numA = parseInt(dayA.replace('day', ''));
//                 const numB = parseInt(dayB.replace('day', ''));
//                 return numA - numB;
//             });
//     }, [trip]);

//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="relative py-12"
//         >
//             {/* Enhanced Header */}
//             <motion.div
//                 style={{ opacity, scale }}
//                 className="sticky top-0 z-30 backdrop-blur-xl bg-gradient-to-b from-[#0a0a1b]/80 to-transparent pb-6 pt-4"
//             >
//                 <div className="relative">
//                     <motion.span
//                         initial={{ opacity: 0, scale: 0 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="absolute -left-6 -top-2"
//                     >
//                         <Sparkles className="w-5 h-5 text-[#00f3ff]" />
//                     </motion.span>
//                     <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00f3ff] via-white to-[#7d4fff] bg-clip-text text-transparent">
//                         Places to Visit
//                     </h1>
//                 </div>
//             </motion.div>

//             {/* Enhanced Timeline */}
//             <div className="relative mt-8">
//                 {/* Animated Vertical Line */}
//                 <motion.div
//                     initial={{ height: 0 }}
//                     animate={{ height: "100%" }}
//                     transition={{ duration: 1 }}
//                     className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00f3ff] via-[#7d4fff] to-transparent"
//                 />

//                 {/* Days */}
//                 <div className="space-y-12">
//                     {sortedItinerary.map(([key, dayData], index) => (
//                         <motion.div
//                             key={key}
//                             initial={{ x: -20, opacity: 0 }}
//                             animate={{ x: 0, opacity: 1 }}
//                             transition={{ delay: index * 0.2 }}
//                             className="relative pl-12"
//                         >
//                             {/* Enhanced Day Dot */}
//                             <motion.div
//                                 className="absolute left-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#00f3ff] to-[#7d4fff] flex items-center justify-center"
//                                 initial={{ scale: 0 }}
//                                 animate={{ scale: 1 }}
//                                 whileHover={{ scale: 1.2 }}
//                             >
//                                 <motion.div
//                                     className="absolute w-full h-full rounded-full bg-[#00f3ff]"
//                                     animate={{
//                                         opacity: [0.5, 0.2, 0.5],
//                                         scale: [1, 1.2, 1],
//                                     }}
//                                     transition={{
//                                         duration: 2,
//                                         repeat: Infinity,
//                                         ease: "linear"
//                                     }}
//                                 />
//                                 <span className="relative z-10 text-sm font-bold text-white">
//                                     {key.replace('day', '')}
//                                 </span>
//                             </motion.div>

//                             {/* Enhanced Day Content */}
//                             <motion.div
                           
//                                 className="space-y-4"
//                             >
//                                 <div className="flex flex-col gap-2">
//                                     <motion.h2
//                                         initial={{ opacity: 0, y: 20 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         transition={{ delay: index * 0.3 }}
//                                         className="text-2xl font-bold text-white group-hover:text-[#00f3ff] transition-colors"
//                                     >
//                                         {dayData.theme}
//                                     </motion.h2>
//                                     <motion.div
//                                         initial={{ opacity: 0, x: -20 }}
//                                         animate={{ opacity: 1, x: 0 }}
//                                         transition={{ delay: index * 0.4 }}
//                                         className="flex items-center gap-2 text-gray-400"
//                                     >
//                                         <Clock className="w-4 h-4 text-[#00f3ff]" />
//                                         <span className="text-sm group-hover:text-white transition-colors">
//                                             Best Time: {dayData.bestTimeToVisit}
//                                         </span>
//                                     </motion.div>
//                                 </div>

//                                 <PlaceCardItem place={dayData} />
//                             </motion.div>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>

//             {/* Enhanced Decorative Elements */}
//             <motion.div
//                 animate={{
//                     opacity: [0.3, 0.5, 0.3],
//                     scale: [1, 1.2, 1],
//                 }}
//                 transition={{ duration: 4, repeat: Infinity }}
//                 className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-[#00f3ff]/5 to-[#7d4fff]/5 blur-[120px] rounded-full"
//             />
//             <motion.div
//                 animate={{
//                     opacity: [0.3, 0.5, 0.3],
//                     scale: [1.2, 1, 1.2],
//                 }}
//                 transition={{ duration: 4, repeat: Infinity }}
//                 className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#7d4fff]/5 to-[#00f3ff]/5 blur-[120px] rounded-full"
//             />
//         </motion.div>
//     );
// }

// export default PlacesToVisit;
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PlaceCardItem from './PlaceCardItem';
import { Clock, Sparkles } from 'lucide-react';

function PlacesToVisit({ trip }) {
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const headerScale = useTransform(scrollY, [0, 200], [1, 0.95]);

  const sortedItinerary = React.useMemo(() => {
    const itinerary = trip?.tripData?.itinerary || {};
    return Object.entries(itinerary).sort(([dayA], [dayB]) => {
      const numA = parseInt(dayA.replace('day', ''));
      const numB = parseInt(dayB.replace('day', ''));
      return numA - numB;
    });
  }, [trip]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative py-12">
      {/* Enhanced Header */}
      <motion.div
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="sticky top-0 z-30 backdrop-blur-xl bg-gradient-to-b from-[#0a0a1b]/80 to-transparent pb-6 pt-4"
      >
        <div className="relative">
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -left-6 -top-2"
          >
            <Sparkles className="w-5 h-5 text-[#00f3ff]" />
          </motion.span>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00f3ff] via-white to-[#7d4fff] bg-clip-text text-transparent">
            Places to Visit
          </h1>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative mt-8">
        {/* Animated Vertical Line */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 1 }}
          className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00f3ff] via-[#7d4fff] to-transparent"
        />

        {/* Timeline Cards */}
        <div className="space-y-12">
          {sortedItinerary.map(([key, dayData], index) => (
            <motion.div
              key={key}
              className="relative pl-12"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {}
              }}
            >
              {/* Left Design: Day Dot */}
              <motion.div
                className="absolute left-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#00f3ff] to-[#7d4fff] flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.2 }}
              >
                <motion.div
                  className="absolute w-full h-full rounded-full bg-[#00f3ff]"
                  animate={{
                    opacity: [0.5, 0.2, 0.5],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
                <span className="relative z-10 text-sm font-bold text-white">
                  {key.replace('day', '')}
                </span>
              </motion.div>

              {/* Card Content: Animate after left design appears */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.4, duration: 0.5 }}
              >
                <div className="flex flex-col gap-2">
                  <motion.h2
                    className="text-2xl font-bold text-white group-hover:text-[#00f3ff] transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.5, duration: 0.5 }}
                  >
                    {dayData.theme}
                  </motion.h2>
                  <motion.div
                    className="flex items-center gap-2 text-gray-400"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.6, duration: 0.5 }}
                  >
                    <Clock className="w-4 h-4 text-[#00f3ff]" />
                    <span className="text-sm group-hover:text-white transition-colors">
                      Best Time: {dayData.bestTimeToVisit}
                    </span>
                  </motion.div>
                </div>
                <PlaceCardItem place={dayData} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-[#00f3ff]/5 to-[#7d4fff]/5 blur-[120px] rounded-full"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1.2, 1, 1.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#7d4fff]/5 to-[#00f3ff]/5 blur-[120px] rounded-full"
      />
    </motion.div>
  );
}

export default PlacesToVisit;

