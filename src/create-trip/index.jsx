// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
// import { chatSession } from '@/service/AIModal';
// import React, { useEffect, useState } from 'react'
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
// import { toast } from 'sonner';
// import { AiOutlineLoading3Quarters } from 'react-icons/ai';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
// import { FcGoogle } from 'react-icons/fc';
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from '@/service/firebaseConfig';
// import { useNavigate } from 'react-router-dom';

// function CreateTrip() {
//   const [place, setPlace] = useState();
//   const [formData, setFormData] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const handleInputChange = (name, value) => {
//     if (name == 'noOfDays' && value > 5) {
//       console.log("Please enter Trip Days less than 5");
//       return;
//     }

//     setFormData({
//       ...formData,
//       [name]: value
//     })
//   }

//   useEffect(() => {
//     console.log(formData);
//   }, [formData])

//   const login = useGoogleLogin({
//     onSuccess: (codeResp) => GetUserProfile(codeResp),
//     onError: (error) => console.log(error),
//   });

//   const OnGenerateTrip = async () => {
//     const user = localStorage.getItem('user');

//     if (!user) {
//       setOpenDialog(true);
//       return;
//     }

//     if (formData?.noOfDays > 5 && !formData?.location || !formData?.budget || !formData?.traveler) {
//       toast("Event has been created.");
//       return;
//     }

//     setLoading(true);
//     const FINAL_PROMPT = AI_PROMPT
//       .replace('{location}', formData?.location?.label)
//       .replace('{totalDays}', formData?.noOfDays)
//       .replace('{traveler}', formData?.traveler)
//       .replace('{budget}', formData?.budget)
//       .replace('{totalDays}', formData?.noOfDays);

//     const result = await chatSession.sendMessage(FINAL_PROMPT);

//     console.log("---", result?.response?.text());
//     setLoading(false);
//     SaveAiTrip(result?.response?.text());
//   }

//   const GetUserProfile = (tokenInfo) => {
//     axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
//       headers: {
//         Authorization: `Bearer ${tokenInfo?.access_token}`,
//         Accept: 'Application/json',
//       }
//     }).then((resp) => {
//       console.log(resp);
//       localStorage.setItem('user', JSON.stringify(resp.data));
//       setOpenDialog(false);
//       OnGenerateTrip();
//     })
//   }

//   const SaveAiTrip = async (TripData) => {
//     let docId;
//     try {
//       setLoading(true);
//       const user = JSON.parse(localStorage.getItem('user'));

//       if (!user?.email) {
//         toast.error('Please sign in first');
//         return;
//       }

//       if (!formData || !TripData) {
//         toast.error('Missing trip data');
//         return;
//       }

//       docId = Date.now().toString();
//       const tripData = {
//         userSelection: formData,
//         tripData: JSON.parse(TripData),
//         userEmail: user.email,
//         id: docId,
//         createdAt: new Date().toISOString(),
//         userId: user.id || user.email
//       };

//       try {
//         await setDoc(doc(db, "AITrips", docId), tripData);
//         toast.success('Trip saved successfully!');
//       } catch (firestoreError) {
//         console.error('Firestore error:', firestoreError);
//         if (firestoreError.code === 'permission-denied') {
//           toast.error('Permission denied. Please check your authentication.');
//         } else {
//           toast.error('Failed to save to database');
//         }
//         return;
//       }
//     } catch (error) {
//       console.error('Error saving trip:', error);
//       toast.error(error.message || 'Failed to save trip');
//       return;
//     } finally {
//       setLoading(false);
//       if (docId) {
//         navigate('/view-trip/' + docId);
//       }
//     }
//   };
//   return (
//     <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
//       <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
//       <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
//       <div className='mt-20 flex flex-col gap-10'>
//         <div>
//           <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
//           <GooglePlacesAutocomplete
//             apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
//             selectProps={{
//               place,
//               onChange: (v) => { setPlace(v); handleInputChange('location', v) }
//             }}
//           />
//         </div>
//         <div>
//           <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
//           <Input placeholder={'Ex.3'} type="number"
//             onChange={(e) => handleInputChange('noOfDays', e.target.value)}
//             className={'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'} />
//         </div>
//         <div>
//           <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
//           <div className='grid grid-cols-3 gap-5 mt-5'>
//             {SelectBudgetOptions.map((item, index) => {
//               return (
//                 <div key={index}
//                   onClick={() => handleInputChange('budget', item.title)}
//                   className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${formData?.budget === item.title
//                     ? 'shadow-lg border-black'
//                     : 'border-gray-200'
//                     }`} >
//                   <h2 className='text-4xl'>{item.icon}</h2>
//                   <h2 className='font-bold text-lg'>{item.title}</h2>
//                   <h2 className='text-sm text-gray-500'>{item.desc}</h2>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div>
//           <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
//           <div className='grid grid-cols-3 gap-5 mt-5'>
//             {SelectTravelList.map((item, index) => {
//               return (
//                 <div key={index}
//                   onClick={() => handleInputChange('traveler', item.people)}
//                   className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${formData?.traveler === item.people
//                     ? 'shadow-lg border-black'
//                     : 'border-gray-200'
//                     }`}>
//                   <h2 className='text-4xl'>{item.icon}</h2>
//                   <h2 className='font-bold text-lg'>{item.title}</h2>
//                   <h2 className='text-sm text-gray-500'>{item.desc}</h2>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="my-10 justify-end flex">
//           <Button onClick={OnGenerateTrip}
//             disabled={loading}
//             className={'bg-black text-white hover:opacity-80 transition-opacity cursor-pointer h-10 px-4 py-2'}>
//             {loading ?
//               <AiOutlineLoading3Quarters style={{ width: '25px', height: '25px' }} className="animate-spin h-7 w-7" /> : 'Generate Trip'}
//           </Button>
//         </div>

//         <Dialog open={openDialog}>
//           <DialogContent className="bg-white">
//             <VisuallyHidden>
//               <DialogTitle>Trip Details</DialogTitle>
//             </VisuallyHidden>
//             <DialogHeader>
//               <DialogDescription>
//                 <img src="/logo.svg" alt="" />
//                 <span className="flex flex-col">
//                   <span className='font-bold text-lg mt-7'>Sign In With Google</span>
//                   <span>Sign in to the App with Google authentication securely</span>
//                 </span>
//                 <Button onClick={login} variant={'outline'} className="w-full mt-5 flex gap-4 items-center bg-black text-white px-5 h-12 hover:opacity-80 transition-opacity cursor-pointer">
//                   <FcGoogle style={{ width: '30px', height: '30px' }} className="h-16 w-16" />
//                   Sign In With Google
//                 </Button>
//               </DialogDescription>
//             </DialogHeader>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   )
// }

// export default CreateTrip

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import React, { useEffect, useState, SVGProps } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { IoMdAirplane } from 'react-icons/io';
import { BsCalendarDate, BsPeople, BsCurrencyDollar } from 'react-icons/bs';

const destinationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const pageTransition = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.3
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)"
  },
  tap: { scale: 0.95 },
  disabled: {
    opacity: 0.5,
    scale: 1,
    boxShadow: "none"
  }
};

const getFormattedDate = (addDays) => {
  const date = new Date();
  date.setDate(date.getDate() + addDays);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const controls = useAnimation();

  const steps = [
    {
      id: 'destination',
      title: "Where would you like to go?",
      icon: <IoMdAirplane className="text-2xl" />,
      component: (
        <motion.div
          variants={destinationVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Animated Background Container */}
          <motion.div
            className="relative p-1 rounded-2xl"
            animate={{
              boxShadow: [
                "0 0 20px rgba(6, 182, 212, 0.2)",
                "0 0 40px rgba(6, 182, 212, 0.4)",
                "0 0 20px rgba(6, 182, 212, 0.2)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20" />

            {/* Main Input */}
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                value: place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange('location', v);
                  controls.start({
                    scale: [1, 1.02, 1],
                    transition: { duration: 0.3 }
                  });
                },
                placeholder: "Enter your dream destination...",
                className: "w-full",
                classNames: {
                  control: (state) => `
        p-4 rounded-xl bg-white backdrop-blur-xl
        border-2 border-cyan-500/30
        hover:border-cyan-500/50 
        transition-all duration-300
        ${state.isFocused ? 'shadow-lg shadow-cyan-500/20' : ''}
      `,
                  input: () => "text-gray-900 text-lg placeholder:text-gray-500",
                  option: () => "p-4 text-gray-900 hover:bg-cyan-50 cursor-pointer transition-colors",
                  menu: () => "mt-2 rounded-xl bg-white backdrop-blur-xl border-2 border-cyan-500/30 shadow-xl",
                  singleValue: () => "text-gray-900 text-lg",
                  placeholder: () => "text-gray-500 text-lg"
                },
                styles: {
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused ? 'rgba(6, 182, 212, 0.1)' : 'white',
                    color: 'rgb(17, 24, 39)' // dark gray, almost black
                  })
                },
                components: {
                  DropdownIndicator: () => (
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="text-cyan-500 px-3"
                    >
                      <IoMdAirplane size={24} />
                    </motion.div>
                  )
                }
              }}
            />
          </motion.div>

          {/* Visual Feedback when location is selected */}
          {formData?.location && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-cyan-400 font-medium"
            >
              Great choice! Let's plan your adventure to {formData.location.label}
            </motion.div>
          )}
        </motion.div>
      )
    },
    {
      id: 'duration',
      title: "How long is your adventure?",
      icon: <BsCalendarDate className="text-2xl" />,
      component: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Animated Container */}
          <motion.div
            className="relative rounded-2xl overflow-hidden bg-white/5  p-8"
          // animate={{
          //   boxShadow: [
          //     "0 0 20px rgba(6, 182, 212, 0.1)",
          //     "0 0 40px rgba(6, 182, 212, 0.2)",
          //     "0 0 20px rgba(6, 182, 212, 0.1)"
          //   ]
          // }}
          // transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Days Display */}
            <motion.div
              className="text-center mb-8"
              animate={{ scale: formData.noOfDays ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-8xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              >
                {formData.noOfDays || '0'}
              </motion.div>
              <div className="text-gray-400 mt-2">Days of Adventure</div>
            </motion.div>

            {/* Interactive Slider */}
            <div className="space-y-6">
              <motion.div className="relative">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={formData.noOfDays || 1}
                  onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                  className="w-full h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg appearance-none cursor-pointer"
                  style={{
                    WebkitAppearance: 'none',
                    appearance: 'none'
                  }}
                />
                {/* Day Markers */}
                <div className="flex justify-between px-2 mt-2">
                  {[1, 7, 14, 21, 30].map((day) => (
                    <motion.div
                      key={day}
                      className={`flex flex-col items-center ${formData.noOfDays >= day ? 'text-cyan-400' : 'text-gray-500'
                        }`}
                      animate={{
                        scale: formData.noOfDays === day ? 1.2 : 1,
                        y: formData.noOfDays === day ? -4 : 0
                      }}
                    >
                      <div className="w-1 h-1 rounded-full bg-current mb-1" />
                      <span className="text-sm">{day}d</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Select Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {[7, 14, 21, 30].map((day) => (
                  <motion.button
                    key={day}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInputChange('noOfDays', day)}
                    className={`p-3 rounded-lg transition-all ${formData.noOfDays === day
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'bg-white/5 hover:bg-white/10'
                      }`}
                  >
                    {day} Days
                  </motion.button>
                ))}
              </div>

              {/* Common Trip Length Suggestions */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[
                  { days: 3, label: 'Weekend' },
                  { days: 7, label: 'Week' },
                  { days: 14, label: '2 Weeks' }
                ].map(({ days, label }) => (
                  <motion.button
                    key={days}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInputChange('noOfDays', days)}
                    className={`p-2 rounded-lg transition-all ${formData.noOfDays === days
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'bg-white/5 hover:bg-white/10'
                      }`}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {formData.noOfDays > 30 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute bottom-4 left-0 right-0 text-center"
                >
                  <div className="inline-flex items-center bg-red-500/10 text-red-400 px-4 py-2 rounded-full">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="mr-2"
                    >
                      ⚠️
                    </motion.div>
                    Maximum 30 days allowed
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Calendar Icons */}
          <div className="flex justify-center gap-4 flex-wrap">
            {[...Array(Math.min(Number(formData.noOfDays || 1), 8))].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <motion.div
                  className="bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-white/10
                   hover:border-cyan-500/50 transition-all cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-3xl mb-1 flex align-center justify-center">
                    {index === 7 ? '...' :
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.75 2.5a.75.75 0 0 0-1.5 0v1.58c-1.44.115-2.384.397-3.078 1.092c-.695.694-.977 1.639-1.093 3.078h19.842c-.116-1.44-.398-2.384-1.093-3.078c-.694-.695-1.639-.977-3.078-1.093V2.5a.75.75 0 0 0-1.5 0v1.513C15.585 4 14.839 4 14 4h-4c-.839 0-1.585 0-2.25.013z"></path><path fill="currentColor" fillRule="evenodd" d="M22 12v2c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14v-2c0-.839 0-1.585.013-2.25h19.974C22 10.415 22 11.161 22 12m-6 1.25a.75.75 0 0 1 .75.75v1.25H18a.75.75 0 0 1 0 1.5h-1.25V18a.75.75 0 0 1-1.5 0v-1.25H14a.75.75 0 0 1 0-1.5h1.25V14a.75.75 0 0 1 .75-.75" clipRule="evenodd"></path></svg>

                    }
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="text-sm font-medium text-cyan-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {index === 7 ? '...' : getFormattedDate(index)}
                    </motion.div>
                    <motion.div
                      className="text-xs text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {index === 7 ? '' : `Day ${index + 1}`}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          {formData.noOfDays > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400 mt-4"
            >
              {formData.noOfDays > 8 ? (
                `Your journey continues for ${formData.noOfDays} days until ${getFormattedDate(formData.noOfDays - 1)}`
              ) : ''}
            </motion.div>
          )}
        </motion.div>
      )
    },
    {
      id: 'budget',
      title: "What's your budget range?",
      icon: <BsCurrencyDollar className="text-2xl" />,
      component: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <motion.div
            className="grid grid-cols-3 gap-6"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {SelectBudgetOptions.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleInputChange('budget', item.title)}
                  className={`relative overflow-hidden rounded-2xl backdrop-blur-xl cursor-pointer
                    transition-all duration-300 border-2
                    ${formData?.budget === item.title
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                >
                  {/* Background gradient effect */}
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{
                      background: [
                        "radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)",
                        "radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)",
                        "radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)"
                      ]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <div className="relative p-6 space-y-4">
                    {/* Icon with effects */}
                    <motion.div
                      animate={{
                        rotateY: formData?.budget === item.title ? [0, 360] : 0,
                        scale: formData?.budget === item.title ? [1, 1.2, 1] : 1
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-5xl mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 
                        p-4 rounded-xl inline-block"
                    >
                      {item.icon}
                    </motion.div>

                    {/* Title with gradient */}
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-300 
                      bg-clip-text text-transparent"
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Selected indicator */}
                    {formData?.budget === item.title && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4"
                      >
                        <div className="bg-cyan-500 text-white p-2 rounded-full w-10 h-10 text-center">
                          <motion.div


                          >
                            ✓
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Budget selection message */}
          <AnimatePresence>
            {formData?.budget && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center text-cyan-400 font-medium"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  Perfect! You've selected a {formData.budget.toLowerCase()} budget for your journey
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )
    },
    {
      id: 'travelers',
      title: "Who's joining your journey?",
      icon: <BsPeople className="text-2xl" />,
      component: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <motion.div
            className="grid grid-cols-3 gap-6"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {SelectTravelList.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleInputChange('traveler', item.people)}
                  className={`relative overflow-hidden rounded-2xl backdrop-blur-xl cursor-pointer
                    transition-all duration-300 border-2
                    ${formData?.traveler === item.people
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{
                      background: [
                        "radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)",
                        "radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)",
                        "radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)"
                      ]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <div className="relative p-6 space-y-4">
                    {/* Icon with effects */}
                    <motion.div
                      animate={{
                        rotateY: formData?.traveler === item.people ? [0, 360] : 0,
                        scale: formData?.traveler === item.people ? [1, 1.2, 1] : 1
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-5xl mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 
                        p-4 rounded-xl inline-block"
                    >
                      {item.icon}
                    </motion.div>

                    {/* Title with gradient */}
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-300 
                      bg-clip-text text-transparent"
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Selected indicator */}
                    {formData?.traveler === item.people && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4"
                      >
                        <div className="bg-cyan-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
                          <motion.div

                          >
                            ✓
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {/* Decorative particles */}
                    {formData?.traveler === item.people && (
                      <motion.div className="absolute inset-0 pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-cyan-500 rounded-full"
                            animate={{
                              x: [0, Math.random() * 100 - 50],
                              y: [0, Math.random() * -100],
                              scale: [1, 0],
                              opacity: [1, 0]
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: "easeOut"
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Selection message */}
          <AnimatePresence>
            {formData?.traveler && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center text-cyan-400 font-medium"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  Perfect! Your journey will be shared with {formData.traveler.toLowerCase()}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )
    }
  ];

  const handleInputChange = (name, value) => {
    if (name == 'noOfDays' && value > 30) {
      console.log("Please enter Trip Days less than 30");
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData?.location;
      case 1: return formData?.noOfDays && formData?.noOfDays <= 30;
      case 2: return formData?.budget;
      case 3: return formData?.traveler;
      default: return false;
    }
  };

  // const SaveAiTrip = async (TripData) => {
  //   let docId;
  //   try {
  //     setLoading(true);
  //     const user = JSON.parse(localStorage.getItem('user'));

  //     if (!user?.email) {
  //       toast.error('Please sign in first');
  //       return;
  //     }

  //     if (!formData || !TripData) {
  //       toast.error('Missing trip data');
  //       return;
  //     }

  //     docId = Date.now().toString();
  //     const tripData = {
  //       userSelection: formData,
  //       tripData: JSON.parse(TripData),
  //       userEmail: user.email,
  //       id: docId,
  //       createdAt: new Date().toISOString(),
  //       userId: user.id || user.email
  //     };

  //     try {
  //       await setDoc(doc(db, "AITrips", docId), tripData);
  //       toast.success('Trip saved successfully!');
  //     } catch (firestoreError) {
  //       console.error('Firestore error:', firestoreError);
  //       if (firestoreError.code === 'permission-denied') {
  //         toast.error('Permission denied. Please check your authentication.');
  //       } else {
  //         toast.error('Failed to save to database');
  //       }
  //       return;
  //     }
  //   } catch (error) {
  //     console.error('Error saving trip:', error);
  //     toast.error(error.message || 'Failed to save trip');
  //     return;
  //   } finally {
  //     setLoading(false);
  //     if (docId) {
  //       navigate('/view-trip/' + docId);
  //     }
  //   }
  // };

  // const OnGenerateTrip = async () => {
  //   const user = localStorage.getItem('user');

  //   if (!user) {
  //     setOpenDialog(true);
  //     return;
  //   }

  //   if (formData?.noOfDays > 5 && !formData?.location || !formData?.budget || !formData?.traveler) {
  //     toast("Event has been created.");
  //     return;
  //   }

  //   setLoading(true);
  //   const FINAL_PROMPT = AI_PROMPT
  //     .replace('{location}', formData?.location?.label)
  //     .replace('{totalDays}', formData?.noOfDays)
  //     .replace('{traveler}', formData?.traveler)
  //     .replace('{budget}', formData?.budget)
  //     .replace('{totalDays}', formData?.noOfDays);

  //   const result = await chatSession.sendMessage(FINAL_PROMPT);

  //   console.log("---", result?.response?.text());
  //   setLoading(false);
  //   SaveAiTrip(result?.response?.text());
  // }

  const SaveAiTrip = async (tripDataString) => {
    let docId;
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user?.email) {
        toast.error('Please sign in first');
        return;
      }

      if (!formData || !tripDataString) {
        toast.error('Missing trip data');
        return;
      }

      docId = Date.now().toString();
      const tripData = {
        userSelection: formData,
        tripData: JSON.parse(tripDataString),
        userEmail: user.email,
        id: docId,
        createdAt: new Date().toISOString(),
        userId: user.id || user.email
      };

      await setDoc(doc(db, "AITrips", docId), tripData);
      toast.success('Trip saved successfully!');
      navigate('/view-trip/' + docId);
    } catch (error) {
      console.error('Error saving trip:', error);
      toast.error('Failed to save trip: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // const OnGenerateTrip = async () => {
  //   const user = localStorage.getItem('user');

  //   if (!user) {
  //     setOpenDialog(true);
  //     return;
  //   }

  //   if (formData?.noOfDays > 5 && !formData?.location || !formData?.budget || !formData?.traveler) {
  //     toast("Please fill all required fields");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const FINAL_PROMPT = AI_PROMPT
  //       .replace('{location}', formData?.location?.label)
  //       .replace('{totalDays}', formData?.noOfDays)
  //       .replace('{traveler}', formData?.traveler)
  //       .replace('{budget}', formData?.budget)
  //       .replace('{totalDays}', formData?.noOfDays);

  //     const result = await chatSession.sendMessage(FINAL_PROMPT);
  //     const responseText = await result?.response?.text();

  //     try {
  //       const start = responseText.indexOf('{');
  //       const end = responseText.lastIndexOf('}') + 1;
  //       const jsonStr = responseText.slice(start, end);

  //       const parsedJson = JSON.parse(jsonStr);

  //       SaveAiTrip(JSON.stringify(parsedJson));
  //     } catch (jsonError) {
  //       console.error('JSON parsing error:', jsonError);
  //       console.log('Raw response:', responseText);
  //       toast.error('Invalid response format from AI. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error generating trip:', error);
  //     toast.error('Failed to generate trip. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDays > 5 && (!formData?.location || !formData?.budget || !formData?.traveler)) {
      toast("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData?.location?.label)
        .replace('{totalDays}', formData?.noOfDays)
        .replace('{traveler}', formData?.traveler)
        .replace('{budget}', formData?.budget);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result?.response?.text();

      console.log("AI Raw Response:", responseText);

      const jsonMatch = responseText.match(/\{.*\}/s);
      if (!jsonMatch) {
        console.error("No JSON found in response:", responseText);
        toast.error("Invalid AI response. Please try again.");
        return;
      }

      const jsonStr = jsonMatch[0];

      try {
        const parsedJson = JSON.parse(jsonStr);
        SaveAiTrip(JSON.stringify(parsedJson));
      } catch (jsonError) {
        console.error('JSON parsing error:', jsonError);
        console.log('Raw response:', responseText);
        toast.error('Invalid response format from AI. Please try again.');
      }
    } catch (error) {
      console.error('Error generating trip:', error);
      toast.error('Failed to generate trip. Please try again.');
    } finally {
      setLoading(false);
    }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1b] to-[#1a1a3a] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 paddingTop">
        {/* Progress Bar */}
        <div className="mb-16">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  scale: currentStep === index ? 1.2 : 1,
                  color: currentStep >= index ? 'rgb(6, 182, 212)' : 'rgb(156, 163, 175)'
                }}
                className="flex flex-col items-center"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2
                  ${currentStep >= index ? 'bg-cyan-500/20' : 'bg-gray-700/20'}`}>
                  {step.icon}
                </div>
                <div className="text-sm">{step.title}</div>
              </motion.div>
            ))}
          </div>
          <div className="h-2 bg-gray-700/30 rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
              animate={{
                width: `${(currentStep / (steps.length - 1)) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <motion.div
              className="glassmorphism  rounded-2xl relative"
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 -z-10"
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent"
              >
                {steps[currentStep].title}
              </motion.h1>

              {steps[currentStep].component}
            </motion.div>

            {/* Enhanced Navigation */}
            <div className="flex justify-between mt-8 gap-4">
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                animate={currentStep === 0 ? "disabled" : ""}
              >
                <Button
                  onClick={() => setCurrentStep(curr => curr - 1)}
                  disabled={currentStep === 0}
                  className="group flex items-center gap-3 px-6 py-3 rounded-xl 
                     bg-gradient-to-r from-gray-800/50 to-gray-900/50
                     hover:from-gray-800 hover:to-gray-900
                     border border-white/10 backdrop-blur-xl 
                     transition-all duration-300"
                >
                  <motion.span
                    animate={{ x: [-3, 0, -3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-xl"
                  >
                    ←
                  </motion.span>
                  Previous Step
                </Button>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                animate={!canProceed() ? "disabled" : ""}
              >
                <Button
                  onClick={() => {
                    if (currentStep === steps.length - 1) {
                      OnGenerateTrip();
                    } else {
                      setCurrentStep(curr => curr + 1);
                    }
                  }}
                  disabled={!canProceed()}
                  className="group flex items-center gap-3 px-6 py-3 rounded-xl 
                     bg-gradient-to-r from-cyan-500 to-blue-500
                     hover:from-cyan-400 hover:to-blue-400
                     border border-white/10 backdrop-blur-xl 
                     transition-all duration-300"
                >
                  {currentStep === steps.length - 1 ? (
                    loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <AiOutlineLoading3Quarters className="text-xl" />
                      </motion.div>
                    ) : (
                      <>
                        Generate Your Trip
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ✨
                        </motion.span>
                      </>
                    )
                  ) : (
                    <>
                      Next Step
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-xl"
                      >
                        →
                      </motion.span>
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Login Dialog */}
        <Dialog open={openDialog}>
          <DialogContent className="glassmorphism">
            <VisuallyHidden>
              <DialogTitle>Trip Details</DialogTitle>
            </VisuallyHidden>
            <DialogHeader>
              <DialogDescription>
                <div className="text-center space-y-6">
                  <img src="/logo.svg" alt="" className="mx-auto" />
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Sign In Required</h3>
                    <p className="text-gray-400">
                      Please sign in with Google to generate your personalized trip
                    </p>
                  </div>
                  <Button
                    onClick={login}
                    className="w-full glassmorphism-button-primary flex items-center justify-center gap-3"
                  >
                    <FcGoogle className="text-2xl" />
                    Continue with Google
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;