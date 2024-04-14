import "../styles/globals.css";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import FooterComponent from "../components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${inter.variable} flex min-h-screen flex-col font-sans`}>
      <Component {...pageProps} />
      <FooterComponent />
      <Analytics />
      <SpeedInsights />
    </main>
  );
};

export default MyApp;
