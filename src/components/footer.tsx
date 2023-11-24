import { type NextPage } from "next";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const FooterComponent: NextPage = () => {
  return (
    <div className="w-full bg-navbar-dark-blue">
      <footer className="footer mx-auto max-w-[1200px] items-center bg-neutral p-4 text-neutral-content">
        <div className="grid-flow-col items-center">
          <p>© {new Date().getFullYear()} Griffin Baxter</p>
        </div>
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <Link href="https://github.com/GriffinBaxter">
            <FaGithub size={24}></FaGithub>
          </Link>
          <Link href="https://www.linkedin.com/in/griffinbaxter/">
            <FaLinkedin size={24}></FaLinkedin>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default FooterComponent;
