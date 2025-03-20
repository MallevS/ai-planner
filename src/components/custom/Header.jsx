import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

function Header() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [openDialog, setOpenDialog] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        console.log(user);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    const login = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error),
    });

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json',
            }
        }).then((resp) => {
            console.log(resp);
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDialog(false);
            window.location.reload();
        })
    }

    return (
        <motion.div
            className={`mainMenu fixed top-4 mx-4 z-50 transition-all duration-500 ${isScrolled ? 'top-2' : 'top-4'
                }`}
        >
            <motion.div
                className={`flex items-center justify-between rounded-full border border-white/10 
                    ${isScrolled
                        ? 'bg-black/40 backdrop-blur-lg shadow-lg'
                        : 'bg-[#0a1125]/60 backdrop-blur-md'
                    }`}
            >
                {/* Logo */}
                <motion.a
                    href="/"
                    className="p-2 pl-4"
                    whileHover={{ scale: 1.05 }}
                >
                    <img src="/AI-TRIP-PLANNER/logo.svg" alt="" className="h-8 w-auto" />
                </motion.a>
                <div className="hidden md:flex items-center gap-6">
                    <motion.a
                        href="/AI-TRIP-PLANNER/destinations"
                        className="relative group px-4 py-2"
                        whileHover={{ y: -2 }}
                    >
                        <span className="relative z-10 text-gray-300 group-hover:text-[#00f3ff] transition-colors">
                            Destinations
                        </span>
                        <motion.div
                            className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            layoutId="navHover"
                        />
                    </motion.a>

                    <motion.a
                        href="/AI-TRIP-PLANNER/about"
                        className="relative group px-4 py-2"
                        whileHover={{ y: -2 }}
                    >
                        <span className="relative z-10 text-gray-300 group-hover:text-[#00f3ff] transition-colors">
                            About Us
                        </span>
                        <motion.div
                            className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            layoutId="navHover"
                        />
                    </motion.a>

                    <motion.a
                        href="/AI-TRIP-PLANNER/contact"
                        className="relative group px-4 py-2"
                        whileHover={{ y: -2 }}
                    >
                        <span className="relative z-10 text-gray-300 group-hover:text-[#00f3ff] transition-colors">
                            Contact
                        </span>
                        <motion.div
                            className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            layoutId="navHover"
                        />
                    </motion.a>

                    <motion.a
                        href="/AI-TRIP-PLANNER/pricing"
                        className="relative group px-4 py-2"
                        whileHover={{ y: -2 }}
                    >
                        <span className="relative z-10 text-gray-300 group-hover:text-[#00f3ff] transition-colors">
                            Pricing
                        </span>
                        <motion.div
                            className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            layoutId="navHover"
                        />
                    </motion.a>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2 p-2">
                    {user ? (
                        <div className="flex items-center gap-2">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="hidden sm:flex gap-2"
                            >
                                <Button
                                    variant="outline"
                                    href="/AI-TRIP-PLANNER/create-trip"
                                    className="bg-white/5 border-white/10 rounded-full px-4 hover:bg-white/10 hover:border-[#00f3ff] transition-all text-white"
                                >
                                    + Trip
                                </Button>
                                {/* <Button
                                    variant="outline"
                                    href='/my-trips'
                                    className="bg-white/5 border-white/10 rounded-full px-4 hover:bg-white/10 hover:border-[#00f3ff] transition-all text-white"
                                >
                                    My Trips
                                </Button> */}
                                <Button
                                    variant="outline"
                                    href='/AI-TRIP-PLANNER/my-trips'
                                    className="bg-white/5 border-white/10 rounded-full px-4 hover:bg-white/10 hover:border-[#00f3ff] transition-all text-white"
                                >
                                    My Trips
                                </Button>
                            </motion.div>

                            <Popover>
                                <PopoverTrigger>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="relative p-0.5 rounded-full bg-gradient-to-r from-[#00f3ff] to-[#7d4fff]"
                                    >
                                        <img
                                            src={user?.picture}
                                            alt=""
                                            className="h-8 w-8 rounded-full ring-2 ring-black"
                                        />
                                    </motion.div>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-1 mr-2"
                                >
                                    <motion.button
                                        whileHover={{ x: 5 }}
                                        onClick={() => {
                                            googleLogout();
                                            localStorage.clear();
                                            window.location.reload();
                                        }}
                                        className="w-full text-left px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all"
                                    >
                                        Logout
                                    </motion.button>
                                </PopoverContent>
                            </Popover>
                        </div>
                    ) : (
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                                onClick={() => setOpenDialog(true)}
                                className="bg-gradient-to-r from-[#00f3ff] to-[#7d4fff] rounded-full px-6"
                            >
                                Sign in
                            </Button>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Enhanced Dialog */}
            <Dialog open={openDialog}>
                <DialogContent className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl">
                    <DialogHeader>
                        <DialogDescription>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <img src="/AI-TRIP-PLANNER/logo.svg" alt="" className="h-8 mx-auto" />
                                <div className="space-y-2 text-center">
                                    <h3 className="text-xl font-bold text-white">Welcome Back</h3>
                                    <p className="text-gray-400 text-sm">Continue with Google to start planning</p>
                                </div>
                                <Button
                                    onClick={login}
                                    className="text-white w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00f3ff] rounded-full transition-all duration-300"
                                >
                                    <FcGoogle className="mr-2 h-5 w-5" />
                                    Sign in with Google
                                </Button>
                            </motion.div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </motion.div>
    )
}

export default Header