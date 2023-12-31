import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import { GithubIcon } from "@/components/icons";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import project1 from "../../public/images/projects/marketing-app.png";
import project2 from "../../public/images/projects/saling-jaga.png";
import project3 from "../../public/images/projects/quternak.png";
import project4 from "../../public/images/projects/medical-remainder.png";

const FeaturedProject = ({ type, title, summary, img, link, github }) => {
  return (
    <article className="w-full flex items-center justify-between rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12 my-2 dark:bg-dark dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4">
      <Link
        href={link}
        target="_blank"
        className="w-1/2 cursor-pointer overflow-hidden rounded-lg border border-solid border-dark lg:w-full"
      >
        <Image
          src={img}
          alt="title"
          className="w-full h-auto"
          sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
        />
      </Link>
      <div className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
        <span className="text-primary dark:text-primaryDark font-medium text-xl cursor-default xs:text-base">
          {type}
        </span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-3xl font-bold dark:text-light sm:text-small">
            {title}
          </h2>
        </Link>
        <p className="my-1 font-medium text-dark dark:text-light text-xs cursor-default sm:text-sm">
          {summary}
        </p>
        <div className="mt-2 flex items-center">
          <Link href={github} target="_blank" className="w-10">
            <GithubIcon />
          </Link>
          <Link
            href={link}
            target="_blank"
            className="ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark sm:px-4 sm:text-base"
          >
            Visit project
          </Link>
        </div>
      </div>
    </article>
  );
};

const projects = () => {
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
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <FeaturedProject
                title={"Sales Marketing Dashboard"}
                img={project1}
                summary={
                  "The latest project I'm working on involves displaying marketing data from a company, starting from income increase graphs to social media visitor growth. This entails utilizing the data provided by the IT division team."
                }
                link={"https://sales-marketing-app.netlify.app/"}
                github="https://github.com/yehezkiel0/Marketing-App"
                type="Featured Project"
              />
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <FeaturedProject
                title={"Saling Jaga"}
                img={project2}
                summary={
                  "A collaborative project with friends to create a portal for reporting cases of sexual violence that occur within the college environment."
                }
                link={""}
                github="https://github.com/yehezkiel0/Saling-Jaga"
                type="Featured Project"
              />
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <FeaturedProject
                title={"Quternak"}
                img={project3}
                summary={
                  " college project based on livestock business and its products, aimed at facilitating the community in finding livestock for the purpose of sacrificial offerings (Qurban).                             "
                }
                link={""}
                github="https://github.com/yehezkiel0/PROJECT-QUTERNAK"
                type="Featured Project"
              />
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <FeaturedProject
                title={"Medical Remainder"}
                img={project4}
                summary={
                  "A university project to create a website implementing the MVC (Model-View-Controller) architecture with a health-themed focus. The feature entails a reminder system for patient treatments."
                }
                link={""}
                github="https://github.com/yehezkiel0/Medical-Remainder"
                type="Featured Project"
              />
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default projects;
