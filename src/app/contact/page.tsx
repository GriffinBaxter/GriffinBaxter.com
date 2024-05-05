import type { Metadata } from "next";
import { customMetadata } from "../page";
import Navbar, { NavigationPage } from "../../components/navbar";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaGithubSquare } from "@react-icons/all-files/fa/FaGithubSquare";
import Divider from "../../components/divider";
import Link from "next/link";

export const metadata: Metadata = customMetadata("Contact");

export default function Page() {
  return (
    <>
      <Navbar currentPage={NavigationPage.Contact} />

      <main className="container mx-auto flex max-w-[1200px] flex-col items-center justify-center px-8 pb-8">
        <p className="py-8 text-center text-3xl font-bold sm:text-5xl">
          Contact
        </p>
        <p className="text-md pb-8 text-center sm:text-xl">
          Add me on{" "}
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/griffinbaxter/"
            rel="noreferrer"
            className="font-bold text-blue-600 underline hover:text-blue-800"
          >
            LinkedIn
          </Link>{" "}
          or follow me on{" "}
          <Link
            target="_blank"
            href="https://github.com/GriffinBaxter"
            rel="noreferrer"
            className="font-bold text-blue-600 underline hover:text-blue-800"
          >
            GitHub
          </Link>
        </p>
        <Divider />
        <div className="grid grid-cols-2 items-center gap-x-6 gap-y-2 py-6">
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/griffinbaxter/"
            rel="noreferrer"
          >
            <FaLinkedin className="text-primary" size={100} />
            <p className="pt-2 text-center text-lg font-bold">LinkedIn</p>
          </Link>
          <Link
            target="_blank"
            href="https://github.com/GriffinBaxter"
            rel="noreferrer"
          >
            <FaGithubSquare className="text-base-content" size={100} />
            <p className="pt-2 text-center text-lg font-bold">GitHub</p>
          </Link>
        </div>
      </main>
    </>
  );
}
