import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import {
  InstagramIcon,
  GithubIcon,
  LinkedInIcon,
  MoonIcon,
  SunIcon,
  TiktokIcon,
} from "./icons";
import { motion, useScroll, useSpring } from "framer-motion";
import useThemeSwitcher from "./hooks/useThemeSwitcher";

// Progress indicator for scroll position
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary dark:bg-primaryDark z-50 origin-left"
      style={{ scaleX }}
    />
  );
};

// Enhanced custom link with hover and active states
const CustomLink = ({ href, title, className = "" }) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link href={href} className={`${className} relative group px-3 py-2`}>
      <span
        className={`relative z-10 ${
          isActive ? "text-primary dark:text-primaryDark font-bold" : ""
        }`}
      >
        {title}
      </span>

      {/* Animated underline */}
      <span
        className={`h-[2px] inline-block bg-primary dark:bg-primaryDark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
          isActive ? "w-full" : "w-0"
        }`}
      >
        &nbsp;
      </span>

      {/* Background hover effect */}
      <motion.span
        className="absolute inset-0 rounded-md -z-10 bg-primary/10 dark:bg-primaryDark/10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={
          isActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
        }
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </Link>
  );
};

const CustomMobileLink = ({ href, title, className = "", toggle }) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  const handleClick = () => {
    toggle();
    router.push(href);
  };

  return (
    <motion.button
      className={`${className} relative group text-light dark:text-dark my-3 px-4 py-2 flex items-center justify-center w-full`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <span className={`relative z-10 ${isActive ? "font-bold" : ""}`}>
        {title}
      </span>

      {/* Background for active state */}
      {isActive && (
        <motion.span
          className="absolute inset-0 rounded-md bg-primary/20 dark:bg-primaryDark/20 -z-10"
          layoutId="mobileActiveBackground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Animated underline */}
      <span
        className={`h-[2px] inline-block dark:bg-dark bg-light absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
          isActive ? "w-full" : "w-0"
        }`}
      >
        &nbsp;
      </span>
    </motion.button>
  );
};

const NavBar = () => {
  const [mode, setMode] = useThemeSwitcher();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Animation variants
  const navbarVariants = {
    top: {
      backgroundColor: "rgba(245, 245, 245, 0)",
      boxShadow: "none",
    },
    scrolled: {
      backgroundColor:
        mode === "dark"
          ? "rgba(27, 27, 27, 0.85)"
          : "rgba(245, 245, 245, 0.85)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(10px)",
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <>
      {/* Scroll progress indicator */}
      <ScrollProgressBar />

      <motion.header
        className="w-full px-32 py-8 font-medium flex items-center justify-between dark:text-light fixed top-0 left-0 right-0 z-30 md:px-8"
        variants={navbarVariants}
        animate={isScrolled ? "scrolled" : "top"}
        transition={{ duration: 0.3 }}
      >
        {/* Mobile Menu Button */}
        <motion.button
          className="flex-col justify-center items-center hidden lg:flex z-50"
          onClick={handleClick}
          whileTap={{ scale: 0.9 }}
        >
          <span
            className={`bg-dark dark:bg-light transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm ${
              isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
            }`}
          ></span>
          <span
            className={`bg-dark dark:bg-light transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm m-0.5 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`bg-dark dark:bg-light transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm ${
              isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
            }`}
          ></span>
        </motion.button>

        {/* Desktop Navigation */}
        <div className="w-full flex justify-between items-center lg:hidden">
          <nav className="flex items-center justify-center flex-wrap">
            <motion.button
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              className={`mr-4 flex items-center justify-center rounded-full p-2 ${
                mode === "light"
                  ? "bg-dark/10 hover:bg-dark/20"
                  : "bg-light/10 hover:bg-light/20"
              } transition-all duration-300`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mode === "dark" ? (
                <SunIcon className="fill-primaryDark" />
              ) : (
                <MoonIcon className="fill-primary" />
              )}
            </motion.button>

            <motion.a
              href="https://github.com/yehezkiel0"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mr-4"
            >
              <GithubIcon />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/yehezkiel-imannuel/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mr-4"
            >
              <LinkedInIcon />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/yehezkielimannuel_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mr-4"
            >
              <InstagramIcon />
            </motion.a>
            <motion.a
              href="https://www.tiktok.com/@yehezkielimannuel_"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-6"
            >
              <TiktokIcon />
            </motion.a>
          </nav>

          <nav className="flex items-center justify-center flex-wrap gap-4">
            <CustomLink href="/" title="Home" />
            <CustomLink href="/about" title="About" />
            <CustomLink href="/projects" title="Projects" />
            <CustomLink href="/skills" title="Skills" />
            <CustomLink href="/contact" title="Contact" />
          </nav>

          {/* Portfolio brand logo */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-2xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary"
            >
              YI
            </Link>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <>
            <motion.div
              className="min-w-[70vw] flex flex-col justify-between items-center fixed top-0 right-0 bottom-0 z-30
                bg-dark/90 dark:bg-light/90 backdrop-blur-md py-32"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
            >
              <motion.nav
                className="flex flex-col items-center justify-center mt-2"
                variants={menuItemVariants}
              >
                <CustomMobileLink href="/" title="Home" toggle={handleClick} />
                <CustomMobileLink
                  href="/about"
                  title="About"
                  toggle={handleClick}
                />
                <CustomMobileLink
                  href="/projects"
                  title="Projects"
                  toggle={handleClick}
                />
                <CustomMobileLink
                  href="/skills"
                  title="Skills"
                  toggle={handleClick}
                />
                <CustomMobileLink
                  href="/contact"
                  title="Contact"
                  toggle={handleClick}
                />
              </motion.nav>

              <motion.nav
                className="flex flex-wrap items-center justify-center mt-8"
                variants={menuItemVariants}
              >
                <motion.a
                  href="https://github.com/yehezkiel0"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-6 mr-6 sm:mr-3"
                >
                  <GithubIcon className="text-light dark:text-dark" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/yehezkiel-imannuel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-6 mx-6 sm:mx-3"
                >
                  <LinkedInIcon className="text-light dark:text-dark" />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/yehezkielimannuel_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-6 mx-6 sm:mx-3"
                >
                  <InstagramIcon className="text-light dark:text-dark" />
                </motion.a>
                <motion.a
                  href="https://www.tiktok.com/@yehezkielimannuel_"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-6 ml-6 sm:ml-3"
                >
                  <TiktokIcon className="text-light dark:text-dark" />
                </motion.a>

                {/* Theme Toggle Button for Mobile */}
                <motion.button
                  onClick={() => setMode(mode === "light" ? "dark" : "light")}
                  className={`flex items-center justify-center rounded-full p-1 ml-8 ${
                    mode === "light"
                      ? "bg-dark text-light"
                      : "bg-light text-dark"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {mode === "dark" ? (
                    <SunIcon className="fill-dark" />
                  ) : (
                    <MoonIcon className="fill-dark" />
                  )}
                </motion.button>
              </motion.nav>
            </motion.div>

            {/* Overlay for closing menu when clicking outside */}
            <motion.div
              className="fixed inset-0 z-20 bg-dark/50 backdrop-blur-sm lg:block hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </motion.header>

      {/* Spacer div to prevent content from being hidden under fixed navbar */}
      <div className="h-24 w-full" />
    </>
  );
};

export default NavBar;
