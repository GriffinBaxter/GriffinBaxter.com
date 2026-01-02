import { FaLinkedin, FaGithub, FaItchIo } from "react-icons/fa";
import Link from "next/link";
import { cookies } from "next/headers";
import DarkModeToggle from "./dark-mode-toggle";

export default async function FooterComponent() {
  const isDarkModeCookie = (await cookies()).get("isDarkMode")?.value;

  return (
    <div className="bg-neutral text-neutral-content mt-auto py-6">
      <div className="container mx-auto flex max-w-[1200px] flex-col items-center justify-between px-6 sm:flex-row">
        <div className="flex items-center space-x-4">
          <Link
            aria-label="LinkedIn"
            className="hover:text-white"
            target="_blank"
            href="https://www.linkedin.com/in/griffinbaxter/"
            rel="noreferrer"
          >
            <FaLinkedin size={24} />
          </Link>
          <Link
            aria-label="GitHub"
            className="hover:text-white"
            target="_blank"
            href="https://github.com/GriffinBaxter"
            rel="noreferrer"
          >
            <FaGithub size={24} />
          </Link>
          <Link
            aria-label="itch.io"
            className="hover:text-white"
            target="_blank"
            href="https://griffinbaxter.itch.io/"
            rel="noreferrer"
          >
            <FaItchIo size={24} />
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
