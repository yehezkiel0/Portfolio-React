import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import LoadingScreen from "@/components/LoadingScreen";
import ParallaxBackground from "@/components/ParallaxBackground";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [pageKey, setPageKey] = useState("");
  const [mounted, setMounted] = useState(false);

  // Set page key for AnimatePresence to work correctly
  useEffect(() => {
    setPageKey(router.asPath);
  }, [router.asPath]);

  // Fix hydration issues with theme provider
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {mounted && (
          <main
            className={`${montserrat.variable} font-mont bg-light w-full min-h-screen dark:bg-dark dark:text-light relative`}
          >
            <LoadingScreen />
            <ParallaxBackground />
            <NavBar />
            <AnimatePresence mode="wait" initial={true}>
              <Component {...pageProps} key={pageKey} />
            </AnimatePresence>
            <Footer />
          </main>
        )}
      </ThemeProvider>
    </>
  );
}
