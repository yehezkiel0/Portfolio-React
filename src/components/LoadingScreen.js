import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Add router events to track page changes
    const handleStart = (url) => {
      if (url !== router.asPath) {
        setIsRouteChanging(true);
      }
    };

    const handleComplete = () => {
      // Use a short delay to make the transition smoother
      setTimeout(() => {
        setIsRouteChanging(false);
        setTimeout(() => setIsLoading(false), 300);
      }, 300);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    // Simulate initial loading with a shorter time
    setTimeout(() => setIsLoading(false), 1000);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);
  // Animation variants optimized for smoother transitions
  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const dotVariants = {
    initial: { y: 0 },
    animate: {
      y: [-6, 6, -6], // Reduced movement range
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 0.8, // Slightly faster animation
        ease: "easeInOut",
        times: [0, 0.5, 1],
      },
    },
  };

  // Skip rendering if not loading
  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-light dark:bg-dark"
      variants={containerVariants}
      initial="initial"
      exit="exit"
    >
      <div className="flex gap-2">
        <motion.div
          className="w-4 h-4 rounded-full bg-dark dark:bg-light"
          variants={dotVariants}
          animate="animate"
          initial="initial"
        />
        <motion.div
          className="w-4 h-4 rounded-full bg-dark dark:bg-light"
          variants={dotVariants}
          animate="animate"
          initial="initial"
          transition={{ delay: 0.2 }}
        />
        <motion.div
          className="w-4 h-4 rounded-full bg-dark dark:bg-light"
          variants={dotVariants}
          animate="animate"
          initial="initial"
          transition={{ delay: 0.4 }}
        />
        <motion.div
          className="w-4 h-4 rounded-full bg-primary dark:bg-primaryDark"
          variants={dotVariants}
          animate="animate"
          initial="initial"
          transition={{ delay: 0.6 }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
