import React, { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

const quote = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const singleWord = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const AnimatedText = ({ text, className = "" }) => {
  // Add hover animation for individual words
  const AnimatedWord = ({ children, index }) => {
    const controls = useAnimationControls();
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
      if (!isHovered) {
        controls.start({
          scale: 1.05,
          color: "var(--color-primary)",
          transition: { duration: 0.3 },
        });
        setIsHovered(true);
      }
    };

    const handleHoverEnd = () => {
      controls.start({
        scale: 1,
        color: "currentColor",
        transition: { duration: 0.3 },
      });
      setIsHovered(false);
    };

    return (
      <motion.span
        variants={singleWord}
        key={index}
        className="inline-block"
        animate={controls}
        onHoverStart={handleHover}
        onHoverEnd={handleHoverEnd}
        style={{
          display: "inline-block",
          position: "relative",
          willChange: "transform",
        }}
      >
        {children}

        {/* Highlight underline on hover */}
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 bottom-0 w-full h-0.5 bg-primary dark:bg-primaryDark origin-left"
        />
      </motion.span>
    );
  };

  return (
    <div className="w-full mx-auto py-2 flex items-center justify-center text-center overflow-hidden cursor-default sm:py-0">
      <motion.h1
        variants={quote}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className={`inline-block w-full text-dark font-bold capitalize text-5xl lg:text-center lg:text-6xl md:text-5xl sm:text-3xl dark:text-light ${className}`}
      >
        {text.split(" ").map((word, index) => (
          <AnimatedWord key={word + "-" + index} index={index}>
            {word}&nbsp;
          </AnimatedWord>
        ))}
      </motion.h1>
    </div>
  );
};

export default AnimatedText;
