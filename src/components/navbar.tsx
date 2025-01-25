import Link from "next/link";

export enum NavigationPage {
  Home,
  Projects,
  Reviews,
  Contact,
}

const navigationPageDetails: Record<
  NavigationPage,
  { title: string; href: string }
> = {
  [NavigationPage.Home]: { title: "Home", href: "/" },
  [NavigationPage.Projects]: { title: "Projects", href: "projects" },
  [NavigationPage.Reviews]: { title: "Reviews", href: "reviews" },
  [NavigationPage.Contact]: { title: "Contact", href: "contact" },
};

const navbarLink = (page: NavigationPage, currentPage: NavigationPage) => {
  return (
    <li>
      <Link
        href={navigationPageDetails[page].href}
        className={
          page === currentPage
            ? "text-blue-900 md:text-blue-100"
            : "max-md:text-gray-500"
        }
      >
        {navigationPageDetails[page].title}
      </Link>
    </li>
  );
};

interface Props {
  currentPage: NavigationPage;
}

export default function Navbar({ currentPage }: Props) {
  const links = (
    <ul className="menu menu-sm z-[1] w-52 rounded-box bg-base-100 px-1 max-md:dropdown-content md:menu-horizontal md:menu-md max-md:shadow md:w-auto md:bg-transparent">
      {navbarLink(NavigationPage.Home, currentPage)}
      {navbarLink(NavigationPage.Projects, currentPage)}
      {navbarLink(NavigationPage.Reviews, currentPage)}
      {navbarLink(NavigationPage.Contact, currentPage)}
    </ul>
  );

  return (
    <div className="mb-10 w-full bg-neutral">
      <div className="navbar mx-auto max-w-[1200px] bg-neutral text-neutral-content">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
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
        <div className="flex-none max-md:hidden">{links}</div>
      </div>
    </div>
  );
}
