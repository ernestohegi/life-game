import React from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ernesto Hegi - JS/React version of Game of Life</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
