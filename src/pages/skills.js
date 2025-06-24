/* eslint-disable react-hooks/rules-of-hooks */
import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Head from "next/head";
import { motion, useScroll } from "framer-motion";
import React, { useRef } from "react";
import LiIcon from "@/components/LiIcon";

const Details = ({ title, description }) => {
  const reff = useRef(null);
  return (
    <li ref={reff} className="my-8 first:mt-0 last:mb-0">
      <LiIcon reference={reff} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="flex flex-col items-start justify-start flex-wrap w-[90%]"
      >
        <h1 className="font-bold text-dark dark:text-light cursor-default">
          {title}
        </h1>
        <p className="text-dark dark:text-light sm:text-base cursor-default">
          {description}
        </p>
      </motion.div>
    </li>
  );
};

const skills = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "center start"],
  });
  return (
    <>
      <Head>
        <title>YIM | Skills Page</title>
        <meta name="description" content="Skills JPM" />
      </Head>
      <main className="flex items-center text-dark w-screen min-h-screen dark:text-light text-center">
        <Layout className="pt-16">
          <AnimatedText
            text="Expertise to help bring your ideas to life"
            className=" mb-16"
          />
          <h2 className="mb-4 text-3xl font-bold uppercase text-dark/75 dark:text-light/75 cursor-default">
            Skills
          </h2>
          <div ref={ref} className="w-[75%] mx-auto relative md:w-full">
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top dark:bg-light sm:left-3"
            />
            <ul className="w-full flex flex-col items-start justify-start pl-[70px] sm:pl-[60px]">
              <Details
                title="HTML & CSS"
                description="Fundamental in crafting structured content and styling responsive, accessible, and semantic web interfaces using modern layout techniques like Flexbox and Grid."
              />
              <Details
                title="JavaScript"
                description="Proficient in core JavaScript concepts, DOM manipulation, and building interactive web interfaces using modern ES6+ features."
              />
              <Details
                title="PHP"
                description="Skilled in developing dynamic server-side applications, form processing, session handling, and building custom logic with clean code structure."
              />
              <Details
                title="MySQL"
                description="Experienced in designing relational databases, writing complex queries, and integrating structured data handling within web applications."
              />
              <Details
                title="Laravel"
                description="Utilized Laravel for building scalable, secure, and maintainable backend systems with MVC architecture, routing, authentication, and Eloquent ORM."
              />
              <Details
                title="Tailwind CSS"
                description="Expert in using utility-first classes to rapidly build modern, responsive, and consistent UI components with maintainable design systems."
              />
              <Details
                title="Vue.js"
                description="Familiar with reactive component-based development using Vue, handling state, routing, and transitions for interactive web apps."
              />
              <Details
                title="Nuxt.js"
                description="Used Nuxt.js for server-side rendering and static site generation, improving SEO and performance of Vue-based applications."
              />
              <Details
                title="React.js"
                description="Skilled in building modular and reusable UI components using React, leveraging state management, hooks, and JSX for dynamic interfaces."
              />
              <Details
                title="Next.js"
                description="Built production-ready React applications with features like static site generation (SSG), server-side rendering (SSR), and API routes."
              />
              <Details
                title="TypeScript"
                description="Applied TypeScript for type-safe coding in JavaScript-based projects, improving code maintainability, scalability, and developer experience."
              />
              <Details
                title="Express.js"
                description="Built backend RESTful APIs using Express, handling routing, middleware, and integration with databases and third-party services."
              />
            </ul>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default skills;
