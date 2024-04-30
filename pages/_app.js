import React from "react";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ernesto Hegi - JS/React version of Game of Life</title>
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
