import { type NextPage } from "next";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const FooterComponent: NextPage = () => {
  return (
    <div className="mt-auto w-full bg-navbar-dark-blue">
      <footer className="footer mx-auto max-w-[1200px] items-center bg-neutral p-4 text-neutral-content">
        <div className="grid-flow-col items-center">
          <p>© {new Date().getFullYear()} Griffin Baxter</p>
        </div>
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/griffinbaxter/"
            rel="noreferrer"
          >
            <FaLinkedin size={24}></FaLinkedin>
          </Link>
          <Link
            target="_blank"
            href="https://github.com/GriffinBaxter"
            rel="noreferrer"
          >
            <FaGithub size={24}></FaGithub>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default FooterComponent;
