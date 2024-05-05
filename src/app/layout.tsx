import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import FooterComponent from "../components/footer";
import { cookies } from "next/headers";
import ThemeController from "../components/theme-controller";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDarkModeCookie = cookies().get("isDarkMode")?.value;

  return (
    <html lang="en">
      <body>
        <ThemeController
          isDarkModeCookie={isDarkModeCookie}
          main={
            <main
              className={`${inter.variable} flex min-h-screen flex-col font-sans`}
            >
              {children}
              <FooterComponent />
              <Analytics />
              <SpeedInsights />
            </main>
          }
        />
      </body>
    </html>
  );
}
