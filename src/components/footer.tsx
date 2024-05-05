import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import Link from "next/link";
import { cookies } from "next/headers";
import DarkModeToggle from "./dark-mode-toggle";

export default function FooterComponent() {
  const isDarkModeCookie = cookies().get("isDarkMode")?.value;

  return (
    <div className="mt-auto bg-neutral py-6 text-neutral-content">
      <div className="container mx-auto flex max-w-[1200px] flex-col items-center justify-between px-6 sm:flex-row">
        <div className="flex items-center space-x-4">
          <Link
            className="hover:text-white"
            target="_blank"
            href="https://www.linkedin.com/in/griffinbaxter/"
            rel="noreferrer"
          >
            <FaLinkedin size={24}></FaLinkedin>
          </Link>
          <Link
            className="hover:text-white"
            target="_blank"
            href="https://github.com/GriffinBaxter"
            rel="noreferrer"
          >
            <FaGithub size={24}></FaGithub>
          </Link>
          <DarkModeToggle isDarkModeCookie={isDarkModeCookie} />
        </div>
        <p className="mt-4 text-sm sm:mt-0">
          © {new Date().getFullYear()} Griffin Baxter
        </p>
      </div>
    </div>
  );
}
