import React from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title> Life Game by Ernesto Hegi </title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
