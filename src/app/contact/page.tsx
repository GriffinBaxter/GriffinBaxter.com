import { customMetadata } from "../page";
import Navbar, { NavigationPage } from "../../components/navbar";
import Divider from "../../components/divider";
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
        <Divider />
        <ContactClient />
      </main>
    </>
  );
}
