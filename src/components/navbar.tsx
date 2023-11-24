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
  return (
    <div className="mb-10 w-full bg-navbar-dark-blue">
      <div className="navbar mx-auto max-w-[1200px] bg-neutral text-neutral-content">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            Griffin Baxter
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                href="/"
                className={
                  navPage == NavigationPage.Home ? "text-blue-100" : ""
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
                    ? "text-blue-100"
                    : ""
                }
              >
                Software Projects
              </Link>
            </li>
            <li>
              <Link
                href="game-reviews"
                className={
                  navPage == NavigationPage.GameReviews ? "text-blue-100" : ""
                }
              >
                Game Reviews
              </Link>
            </li>
            <li>
              <Link
                href="contact"
                className={
                  navPage == NavigationPage.Contact ? "text-blue-100" : ""
                }
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
