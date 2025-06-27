import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import { GithubIcon } from "@/components/icons";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import project1 from "../../public/images/projects/project-acp.png";
import project2 from "../../public/images/projects/marketing-app.png";
import project3 from "../../public/images/projects/saling-jaga.png";
import project4 from "../../public/images/projects/quternak.png";
import project5 from "../../public/images/projects/medical-remainder.png";

// Animation variants for project cards
const cardVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  hover: {
    y: -8,
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

// Animation variants for image container
const imageVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Animation variants for buttons
const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, type: "spring", stiffness: 400 },
  },
  tap: { scale: 0.97 },
};

const FeaturedProject = ({
  type,
  title,
  summary,
  img,
  link,
  github,
  isPrivate = false,
}) => {
  return (
    <motion.article
      className="w-full flex items-center justify-between rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12 my-6 dark:bg-dark dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      exit="exit"
      layoutId={`project-${title}`}
    >
      <motion.div
        className="w-1/2 cursor-pointer overflow-hidden rounded-lg border border-solid border-dark lg:w-full"
        variants={imageVariants}
      >
        <Link href={link || "#"} target={link ? "_blank" : "_self"}>
          <Image
            src={img}
            alt={title}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </Link>
      </motion.div>{" "}
      <div className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
        <div className="flex items-center gap-3 mb-1">
          <motion.span
            className="text-primary dark:text-primaryDark font-medium text-xl cursor-default xs:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {type}
          </motion.span>
          <motion.span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              isPrivate
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.3 }}
          >
            {isPrivate ? "Private" : "Public"}
          </motion.span>
        </div>
        <Link
          href={link || "#"}
          target={link ? "_blank" : "_self"}
          className="hover:underline underline-offset-2"
        >
          <motion.h2
            className="my-2 w-full text-left text-3xl font-bold dark:text-light sm:text-small"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {title}
          </motion.h2>
        </Link>
        <motion.p
          className="my-1 font-medium text-dark dark:text-light text-xs cursor-default sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {summary}
        </motion.p>
        <motion.div
          className="mt-2 flex items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {github && (
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link href={github} target="_blank" className="w-10">
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
                className="ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark sm:px-4 sm:text-base 
                transition-colors duration-300 hover:bg-opacity-90 dark:hover:bg-opacity-90"
              >
                Visit project
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simple page loading animation
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Container variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        when: "beforeChildren",
      },
    },
  };

  return (
    <>
      <Head>
        <title>YIM | Projects Page</title>
        <meta name="description" content="Projects YIM" />
      </Head>
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="My latest and greatest creations"
            className="mb-16"
          />

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary dark:border-primaryDark"></div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                className="w-full"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.div
                  className="grid grid-cols-12"
                  variants={cardVariants}
                  custom={0}
                >
                  <div className="col-span-12">
                    {" "}
                    <FeaturedProject
                      title="ACP Tours & Travel"
                      img={project1}
                      summary={
                        "A website project for a travel agency that provides tour packages, hotel bookings, and flight reservations. The website features a user-friendly interface, allowing users to easily navigate through various travel options and make bookings online."
                      }
                      link="https://acptour.site"
                      github="https://github.com/yehezkiel0/ACP"
                      type="Featured Project"
                      isPrivate={true}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="grid grid-cols-12"
                  variants={cardVariants}
                  custom={1}
                >
                  <div className="col-span-12">
                    {" "}
                    <FeaturedProject
                      title="Sales Marketing Dashboard"
                      img={project2}
                      summary={
                        "The latest project I&apos;m working on involves displaying marketing data from a company, starting from income increase graphs to social media visitor growth. This entails utilizing the data provided by the IT division team."
                      }
                      link="https://sales-marketing-app.netlify.app/"
                      github="https://github.com/yehezkiel0/Marketing-App"
                      type="Featured Project"
                      isPrivate={false}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="grid grid-cols-12"
                  variants={cardVariants}
                  custom={2}
                >
                  <div className="col-span-12">
                    {" "}
                    <FeaturedProject
                      title="Saling Jaga"
                      img={project3}
                      summary={
                        "A collaborative project with friends to create a portal for reporting cases of sexual violence that occur within the college environment."
                      }
                      link=""
                      github="https://github.com/yehezkiel0/Saling-Jaga"
                      type="Featured Project"
                      isPrivate={false}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="grid grid-cols-12"
                  variants={cardVariants}
                  custom={3}
                >
                  <div className="col-span-12">
                    {" "}
                    <FeaturedProject
                      title="Quternak"
                      img={project4}
                      summary={
                        " college project based on livestock business and its products, aimed at facilitating the community in finding livestock for the purpose of sacrificial offerings (Qurban)."
                      }
                      link=""
                      github="https://github.com/yehezkiel0/PROJECT-QUTERNAK"
                      type="Featured Project"
                      isPrivate={false}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="grid grid-cols-12"
                  variants={cardVariants}
                  custom={4}
                >
                  <div className="col-span-12">
                    {" "}
                    <FeaturedProject
                      title="Medical Remainder"
                      img={project5}
                      summary={
                        "A university project to create a website implementing the MVC (Model-View-Controller) architecture with a health-themed focus. The feature entails a reminder system for patient treatments."
                      }
                      link=""
                      github="https://github.com/yehezkiel0/Medical-Remainder"
                      type="Featured Project"
                      isPrivate={false}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}
        </Layout>
      </main>
    </>
  );
};

export default Projects;
