import { type NextPage } from "next";
import Link from "next/link";

export enum NavigationPage {
  Home,
  SoftwareProjects,
  GameReviews,
  Contact,
}

interface Props {
  page?: NavigationPage;
}

const NavBar: NextPage<Props> = ({ page: navPage }) => {
  const links = (
    <ul className="menu menu-sm z-[1] w-52 rounded-box bg-base-100 px-1 shadow min-[0px]:max-md:dropdown-content md:menu-horizontal md:menu-md md:w-auto md:bg-transparent">
      <li>
        <Link
          href="/"
          className={
            navPage == NavigationPage.Home
              ? "text-blue-900 md:text-blue-100"
              : "min-[0px]:max-md:text-gray-500"
          }
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="projects"
          className={
            navPage == NavigationPage.SoftwareProjects
              ? "text-blue-900 md:text-blue-100"
              : "min-[0px]:max-md:text-gray-500"
          }
        >
          Projects
        </Link>
      </li>
      <li>
        <Link
          href="reviews"
          className={
            navPage == NavigationPage.GameReviews
              ? "text-blue-900 md:text-blue-100"
              : "min-[0px]:max-md:text-gray-500"
          }
        >
          Reviews
        </Link>
      </li>
      <li>
        <Link
          href="contact"
          className={
            navPage == NavigationPage.Contact
              ? "text-blue-900 md:text-blue-100"
              : "min-[0px]:max-md:text-gray-500"
          }
        >
          Contact
        </Link>
      </li>
    </ul>
  );

  return (
    <div className="mb-10 w-full bg-navbar-dark-blue">
      <div className="navbar mx-auto max-w-[1200px] bg-neutral text-neutral-content">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            Griffin Baxter
          </Link>
        </div>
        <details className="dropdown dropdown-left flex-none md:hidden">
          <summary
            tabIndex={0}
            role="button"
            className="btn btn-circle btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </summary>
          {links}
        </details>
        <div className="flex-none min-[0px]:max-md:hidden">{links}</div>
      </div>
    </div>
  );
};

export default NavBar;
