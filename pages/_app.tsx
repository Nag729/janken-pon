import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import * as React from "react";
import TheFooter from "../components/projects/TheFooter";
import TheHeader from "../components/projects/TheHeader";
import { GlobalContextProvider } from "../context/globalContext";
import { SocketProvider } from "../context/socketContext";
import { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, pageview } from "../lib/gtag";
import "../styles/globals.css";
import styles from "../styles/Home.module.css";

// events for NProgress
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, pageProps }: AppProps) {
  // Google Analytics
  React.useEffect(() => {
    if (!NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
      return;
    }
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [Router.events]);

  return (
    <SocketProvider>
      <GlobalContextProvider>
        <ChakraProvider>
          {/* Head */}
          <Head>
            <title>Janken Pon! ✌️ | オンラインでじゃんけん</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <DefaultSeo
            defaultTitle="Janken Pon! | オンラインでじゃんけん"
            description="オンラインでリアルタイムじゃんけんができるアプリ！"
            openGraph={{
              type: "website",
              title: "Janken Pon! | オンラインでじゃんけん",
              description: "オンラインでリアルタイムじゃんけんができるアプリ！",
              site_name: "Janken Pon!",
              url: "https://janken-pon.vercel.app/",
              images: [
                {
                  url: "https://janken-pon-public.s3.ap-northeast-1.amazonaws.com/janken-pon.png",
                  width: 1200,
                  height: 630,
                  alt: "janken_pon",
                  type: "image/png",
                },
              ],
            }}
            twitter={{
              handle: "@handle",
              site: "@site",
              cardType: "summary_large_image",
            }}
          />

          <section className={styles.container}>
            {/* Header */}
            <TheHeader />

            {/* Main Component */}
            <Component {...pageProps} />

            {/* TheFooter */}
            <TheFooter />
          </section>
        </ChakraProvider>
      </GlobalContextProvider>
    </SocketProvider>
  );
}
export default App;
