import type { Metadata } from "next";
import Navbar, { NavigationPage } from "../components/navbar";
import Divider from "../components/divider";
import HomeClient from "./home-client";

export const customMetadata = (
  name: string | undefined,
): Metadata | undefined => {
  if (name) {
    return {
      title: name === "Home" ? "Griffin Baxter" : `${name} - Griffin Baxter`,
      description: name,
      icons: "/favicon.ico",
    };
  }
};

export const metadata = customMetadata("Home");

export default function Page() {
  return (
    <>
      <Navbar currentPage={NavigationPage.Home} />

      <main className="container mx-auto flex max-w-[1200px] flex-col items-center justify-center px-8 pb-8">
        <p className="py-8 text-center text-3xl font-medium text-balance sm:text-5xl">
          I’m <span className="font-bold">Griffin</span>, a{" "}
          <span className="font-bold">Full-Stack</span> Web/Mobile Software
          Engineer
        </p>
        <p className="text-md pb-8 text-center sm:text-xl">
          Based in <span className="font-bold">Christchurch, New Zealand</span>
        </p>
        <Divider />
        <p className="pt-8 pb-12 text-center text-2xl font-extrabold uppercase sm:text-3xl">
          Featured Projects
        </p>
        <HomeClient />
      </main>
    </>
  );
}
