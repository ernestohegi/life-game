import React from 'react';
import Head from 'next/head';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '../app/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ernesto Hegi - Conway's Game of Life</title>
      </Head>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default MyApp;
