import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import profilePic from "../../public/images/profile/gambar4.jpg";

const about = () => {
  return (
    <>
      <Head>
        <title>YI | About Page</title>
        <meta name="description" content="about YI" />
      </Head>
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Hi there! My name is Yehezkiel Imannuel, website developer."
            className="mb-16 sm:mb-8"
          />
          <div className="grid w-full grid-cols-8 gap-8">
            <div className="col-span-4 flex flex-col items-start justify-start md:col-span-8">
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light cursor-default">
                About Me
              </h2>
              <p className="my-4 font-medium cursor-default">
                I&apos;m a full-stack web developer with a strong passion for
                building scalable and user-centric applications that solve
                real-world problems. With hands-on experience using PHP and
                JavaScript, I&apos;ve developed both frontend and backend
                systems—from responsive interfaces to robust server-side logic.
                I take pride in creating clean, maintainable code and designing
                systems that prioritize performance, efficiency, and user
                experience. I&apos;ve contributed to impactful projects
                including integrated platforms and AI-powered solutions that
                improved operational workflows for businesses.
              </p>
              <p className="my-4 font-medium cursor-default">
                As a detail-oriented developer, I enjoy tackling technical
                challenges and continuously refining my skills. I believe that
                great development comes from a balance of logic, creativity, and
                constant learning. Whether it&apos;s exploring new frameworks,
                optimizing existing architecture, or automating complex
                processes, I&apos;m always eager to push boundaries and deliver
                results. My goal is not just to write code, but to build
                solutions that truly make a difference.
              </p>
            </div>
            <div className="col-span-4 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-4 dark:bg-dark dark:border-light md:col-span-8">
              <div className="absolute top-0 -right-2 -z-10 w-[102%] h-[102%] rounded-[1em] bg-dark dark:bg-light" />
              <Image
                src={profilePic}
                alt="Developer"
                priority
                className="w-full h-auto rounded-2xl border border-dark border-solid dark:border-light"
                sizes="(max-width: 768px) 100vw,
                                    (max-width: 1200px) 70vw,
                                    33vw"
              />
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default about;
