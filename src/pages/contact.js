import React, { useState, useRef } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import { motion } from "framer-motion";
import { LinkedInIcon, GithubIcon } from "@/components/icons";

// Animation variants for fade-in effect
const fadeInVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Input field component with animation
const AnimatedInput = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div className="w-full mb-6 relative" variants={fadeInVariants}>
      <label
        className={`absolute left-3 transition-all duration-300 ${
          isFocused || value
            ? "text-xs -top-2.5 bg-light dark:bg-dark px-1 text-primary dark:text-primaryDark"
            : "text-dark/70 dark:text-light/70 top-3"
        }`}
        htmlFor={name}
      >
        {label}
        {required && "*"}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={5}
          className={`w-full p-3 bg-transparent border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
            error
              ? "border-red-500 focus:ring-red-500/50"
              : "border-dark/30 dark:border-light/30 focus:ring-primary/50 dark:focus:ring-primaryDark/50"
          }`}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full p-3 bg-transparent border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
            error
              ? "border-red-500 focus:ring-red-500/50"
              : "border-dark/30 dark:border-light/30 focus:ring-primary/50 dark:focus:ring-primaryDark/50"
          }`}
        />
      )}

      {error && (
        <motion.p
          className="text-red-500 text-xs mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

// Social link component with hover animation
const SocialLink = ({ href, icon, label }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-lg font-semibold text-dark dark:text-light transition-transform duration-300 hover:text-primary dark:hover:text-primaryDark p-2 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-2xl">{icon}</span>
      <span className="relative">
        {label}
        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary dark:bg-primaryDark origin-left transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
      </span>
    </motion.a>
  );
};

const Contact = () => {
  // Form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Form validation state
  const [errors, setErrors] = useState({});

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Form ref for scrolling after submission
  const formRef = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formState.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    // Simulate form submission
    try {
      // Here you would typically send the form data to your backend
      // For now, let&apos;s just simulate a successful submission after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitSuccess(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>YIM | Contact Me</title>
        <meta
          name="description"
          content="Get in touch with Yehezkiel for collaboration, job opportunities, or just to say hello!"
        />
      </Head>

      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText text="Let&apos;s Connect" className="mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Contact Information Section */}
            <motion.div
              className="flex flex-col space-y-6"
              variants={fadeInVariants}
              initial="initial"
              animate="animate"
            >
              <h2 className="text-2xl font-bold mb-4 text-dark dark:text-light">
                Get In Touch
              </h2>{" "}
              <p className="text-dark/70 dark:text-light/70">
                I&apos;m always interested in hearing about new projects,
                opportunities, or just connecting with fellow developers. Feel
                free to reach out!
              </p>
              <div className="space-y-4 mt-6">
                <SocialLink
                  href="mailto:yehezkielimannuel1@gmail.com"
                  icon="📧"
                  label="yehezkielimannuel1@gmail.com"
                />{" "}
                <SocialLink
                  href="https://github.com/yehezkiel0"
                  icon={<GithubIcon className="w-6 h-6" />}
                  label="github.com/yehezkiel0"
                />{" "}
                <SocialLink
                  href="https://linkedin.com/in/yehezkiel-imannuel"
                  icon={<LinkedInIcon className="w-6 h-6" />}
                  label="linkedin.com/in/yehezkiel-imannuel"
                />
              </div>
              <motion.div
                className="bg-dark/5 dark:bg-light/5 p-6 rounded-lg mt-8"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <h3 className="text-xl font-bold mb-2">
                  Looking For Collaboration?
                </h3>{" "}
                <p className="text-dark/70 dark:text-light/70 mb-4">
                  I&apos;m open to freelance opportunities, full-time positions,
                  and interesting projects.
                </p>
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  className="inline-flex items-center px-4 py-2 bg-primary text-light dark:bg-primaryDark dark:text-dark rounded-lg transition-transform duration-300 hover:scale-105"
                >
                  View My Resume
                </Link>
              </motion.div>
            </motion.div>

            {/* Contact Form Section */}
            <motion.div
              className="bg-light/50 dark:bg-dark/50 p-8 rounded-2xl shadow-lg"
              variants={fadeInVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
              ref={formRef}
            >
              <h2 className="text-2xl font-bold mb-6 text-dark dark:text-light">
                Send Me a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatedInput
                  label="Your Name"
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />

                <AnimatedInput
                  label="Your Email"
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />

                <AnimatedInput
                  label="Subject"
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  error={errors.subject}
                />

                <AnimatedInput
                  label="Message"
                  type="textarea"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  error={errors.message}
                  required
                />

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className={`w-full py-3 px-4 mt-4 rounded-lg font-medium transition-all duration-300 
                    ${
                      isSubmitting
                        ? "bg-dark/50 dark:bg-light/50 cursor-not-allowed"
                        : "bg-primary text-light dark:bg-primaryDark dark:text-dark hover:bg-primary/90 dark:hover:bg-primaryDark/90"
                    }`}
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>

                {/* Success Message */}
                {submitSuccess && (
                  <motion.div
                    className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4 rounded"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {" "}
                    <p>
                      Thank you for your message! I&apos;ll get back to you
                      soon.
                    </p>
                  </motion.div>
                )}

                {/* Error Message */}
                {submitError && (
                  <motion.div
                    className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4 rounded"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{submitError}</p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Contact;
