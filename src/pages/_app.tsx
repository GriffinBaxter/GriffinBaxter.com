import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${inter.variable} font-sans`}>
      <Component {...pageProps} />
      <Analytics />
    </main>
  );
};

export default MyApp;
