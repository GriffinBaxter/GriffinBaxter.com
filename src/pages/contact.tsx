import type { NextPage } from "next";
import CustomHead from "../components/custom-head";
import Navbar, { NavigationPage } from "../components/navbar";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaGithubSquare } from "@react-icons/all-files/fa/FaGithubSquare";
import Divider from "../components/divider";
import Link from "next/link";

const Contact: NextPage = () => {
  return (
    <>
      <CustomHead title="Contact" />

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
            <FaLinkedin size={100} color="0d66c2" />
            <p className="pt-2 text-center text-lg font-bold">LinkedIn</p>
          </Link>
          <Link
            target="_blank"
            href="https://github.com/GriffinBaxter"
            rel="noreferrer"
          >
            <FaGithubSquare size={100} color="24292d" />
            <p className="pt-2 text-center text-lg font-bold">GitHub</p>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Contact;
