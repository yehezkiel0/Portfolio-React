import Layout from "@/components/Layout";
import Head from "next/head";
import profilePic from "../../public/images/profile/programmer.jpg";
import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import { ContactIcon, LinkArrow } from "@/components/icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TypingEffect = ({ texts, className = "" }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const text = texts[currentTextIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(text.substring(0, currentText.length + 1));

        if (currentText.length === text.length) {
          // Pause at the end of typing
          setTypingSpeed(1500);
          setIsDeleting(true);
        } else {
          // Typing speed varies slightly
          setTypingSpeed(50 + Math.random() * 50);
        }
      } else {
        setCurrentText(text.substring(0, currentText.length - 1));

        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
          // Pause before typing next word
          setTypingSpeed(500);
        } else {
          // Deleting is faster than typing
          setTypingSpeed(30);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, typingSpeed]);

  return (
    <span className={`inline-block ${className}`}>
      {currentText}
      <span className="animate-blink">|</span>
    </span>
  );
};

const imageVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: { scale: 0.95 },
};

export default function Home() {
  const skills = [
    "Web Development",
    "Frontend Web Development",
    "Backend Web Development",
    "UI/UX Design",
  ];

  return (
    <>
      <Head>
        <title>YI | Home Page</title>
        <meta
          name="description"
          content="Portfolio of Yehezkiel Imannuel - Full Stack Web Developer with a passion for creating engaging user experiences"
        />
      </Head>
      <main className="flex items-center text-dark w-full min-h-screen dark:text-light">
        <Layout className="pt-0 md:pt-16 sm:pt-8">
          <div className="flex items-center justify-between w-full lg:flex-col">
            <motion.div
              className="w-1/2 mr-8 md:w-full md:mr-0"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="rounded-full overflow-hidden bg-light dark:bg-dark shadow-xl border-8 border-primary/20 dark:border-primaryDark/20 relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent dark:from-primaryDark/30 z-10 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ opacity: 0.6 }}
                />
                <Image
                  src={profilePic}
                  priority
                  alt="Yehezkiel"
                  className="w-full h-auto rounded-full lg:hidden md:inline-block md:w-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </motion.div>

            <div className="w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center">
              <AnimatedText
                text="Transforming Ideas into Functional Websites."
                className="text-left mb-4"
              />

              <motion.div
                className="my-4 text-lg font-medium cursor-default md:text-base sm:text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="text-primary dark:text-primaryDark font-semibold mr-2">
                  Specializing in:
                </span>
                <TypingEffect
                  texts={skills}
                  className="text-dark dark:text-light"
                />
              </motion.div>

              <motion.div
                className="flex items-center self-start mt-4 lg:self-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    href="/cv.pdf"
                    target="_blank"
                    download={true}
                    className="flex items-center bg-dark text-light p-2 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark dark:text-dark dark:bg-light hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base transition-all duration-300"
                  >
                    Resume <LinkArrow className="w-6 ml-1" />
                  </Link>
                </motion.div>

                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="ml-4"
                >
                  <Link
                    href="mailto:yehezkielimannuel1@gmail.com"
                    className="flex items-center gap-1 text-lg font-medium capitalize text-dark dark:text-light md:text-base group"
                  >
                    <span className="relative">
                      Contact
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-dark dark:bg-light origin-left transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </span>
                    <ContactIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex mt-8 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-primary dark:text-primaryDark">
                    2+
                  </div>
                  <div className="text-sm">Years Experience</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-primary dark:text-primaryDark">
                    12+
                  </div>
                  <div className="text-sm">Projects</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-primary dark:text-primaryDark">
                    10+
                  </div>
                  <div className="text-sm">Collaborations</div>
                </div>
              </motion.div>
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
}
