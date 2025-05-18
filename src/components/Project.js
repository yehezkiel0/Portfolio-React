import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "./icons";

// Project card animation variants - further optimized to prevent flickering
const cardVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.05,
      when: "beforeChildren",
    },
  },
  hover: {
    y: -5,
    transition: {
      type: "tween",
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

// Image animation variants - simplified for better performance
const imageVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Button animation variants - optimized for reduced flickering
const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      type: "tween", // Changed from spring to tween for more stability
      ease: "easeOut",
    },
  },
  tap: { scale: 0.98 },
};

// Tag pill component for technologies used
const TechTag = ({ name }) => (
  <span className="px-3 py-1 text-xs rounded-full bg-primary/10 dark:bg-primaryDark/10 text-primary dark:text-primaryDark font-medium mr-2 mb-2 transition-all duration-300 hover:bg-primary/20 dark:hover:bg-primaryDark/20">
    {name}
  </span>
);

const Project = ({
  type,
  title,
  summary,
  img,
  link,
  github,
  technologies = [],
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine if it's a featured project (larger card) or a regular project
  const isFeatured = type.toLowerCase().includes("featured");
  return (
    <motion.article
      className={`
        ${
          isFeatured
            ? "w-full flex items-center justify-between rounded-3xl border border-solid border-dark bg-light shadow-lg p-12 my-4 dark:bg-dark dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:p-4"
            : "w-full flex flex-col items-center justify-center rounded-2xl border border-solid border-dark bg-light p-6 relative dark:bg-dark dark:border-light xs:p-4"
        }
      `}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      layout
      layoutId={`project-card-${title}`}
      transition={{
        layout: { duration: 0.3, type: "tween", ease: "easeOut" },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative corner shape for featured projects */}
      {isFeatured && (
        <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[102%] rounded-[2.5rem] bg-dark dark:bg-light rounded-br-3xl xs:-right-2 xs:h-[102%] xs:w-[101%] xs:rounded-[1.5rem]" />
      )}

      {/* Project Image with animation */}
      <Link
        href={link || "#"}
        target={link ? "_blank" : "_self"}
        className={`${
          isFeatured
            ? "w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full"
            : "w-full cursor-pointer overflow-hidden rounded-lg"
        }`}
      >
        <motion.div
          variants={imageVariants}
          initial="initial"
          whileHover="hover"
          className="overflow-hidden rounded-lg border border-solid border-dark dark:border-light"
        >
          <Image
            src={img}
            alt={title}
            className="w-full h-auto"
            priority={isFeatured}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay gradient on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.5 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Link>

      {/* Project details */}
      <div
        className={`${
          isFeatured
            ? "w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6"
            : "w-full flex flex-col items-start mt-4"
        }`}
      >
        {/* Project type badge */}
        <span className="text-primary dark:text-primaryDark font-medium text-xl xs:text-base">
          {type}
        </span>

        {/* Project title */}
        <Link
          href={link || "#"}
          target={link ? "_blank" : "_self"}
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-3xl font-bold dark:text-light sm:text-xl">
            {title}
          </h2>
        </Link>

        {/* Project description */}
        <p className="my-2 font-medium text-dark dark:text-light sm:text-sm">
          {summary}
        </p>

        {/* Technology tags */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap mt-2 mb-4">
            {technologies.map((tech, index) => (
              <TechTag key={index} name={tech} />
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-2 flex items-center">
          {github && (
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link href={github} target="_blank" className="w-10 mr-4">
                <GithubIcon className="transition-transform duration-300 hover:scale-110" />
              </Link>
            </motion.div>
          )}

          {link && (
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href={link}
                target="_blank"
                className="rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark sm:px-4 sm:text-base
                border-2 border-solid border-transparent hover:bg-light hover:text-dark hover:border-dark
                dark:hover:bg-dark dark:hover:text-light dark:hover:border-light
                transition-colors duration-300"
              >
                Visit Project
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default Project;
