import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import * as React from "react";
import TheFooter from "../components/projects/TheFooter";
import TheHeader from "../components/projects/TheHeader";
import { IsHostProvider } from "../context/isHostContext";
import { SocketProvider } from "../context/socketContext";
import "../styles/globals.css";

// events for NProgress
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider>
      <IsHostProvider>
        <ChakraProvider>
          {/* Head */}
          <Head>
            <title>Janken Pon ✌️</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          {/* Header */}
          <TheHeader />

          {/* main component */}
          <Component {...pageProps} />

          {/* TheFooter */}
          <TheFooter />
        </ChakraProvider>
      </IsHostProvider>
    </SocketProvider>
  );
}
export default App;
