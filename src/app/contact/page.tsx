import { customMetadata } from "../page";
import Navbar, { NavigationPage } from "../../components/navbar";
import Divider from "../../components/divider";
import Link from "next/link";
import ContactClient from "./contact-client";

export const metadata = customMetadata("Contact");

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
          </Link>
          , follow me on{" "}
          <Link
            target="_blank"
            href="https://github.com/GriffinBaxter"
            rel="noreferrer"
            className="font-bold text-blue-600 underline hover:text-blue-800"
          >
            GitHub
          </Link>
          , or{" "}
          <Link
            target="_blank"
            href="https://griffinbaxter.itch.io/"
            rel="noreferrer"
            className="font-bold text-blue-600 underline hover:text-blue-800"
          >
            itch.io
          </Link>
        </p>
        <Divider />
        <div className="grid grid-cols-3 items-center gap-x-6 gap-y-2 py-6">
          <ContactClient />
        </div>
      </main>
    </>
  );
}
