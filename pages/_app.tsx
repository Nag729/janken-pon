import { ChakraProvider } from "@chakra-ui/react";
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
import "../styles/globals.css";
import styles from "../styles/Home.module.css";

// events for NProgress
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider>
      <GlobalContextProvider>
        <ChakraProvider>
          {/* Head */}
          <Head>
            <title>Janken Pon ✌️ | オンラインでじゃんけん</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

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
