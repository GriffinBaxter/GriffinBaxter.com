import { Navbar } from "flowbite-react";
import Image from "next/image";
import logo from "/public/logo.png"
import { type NextPage } from "next";

export enum NavigationPage {
    Home,
    SoftwareProjects,
    Reviews,
    Contact,
}

interface Props {
    page: NavigationPage;
}

const NavBar: NextPage<Props> = ({page: navPage}) => {
    return (
        <Navbar fluid={true} rounded={true}>
            <Navbar.Brand href="/">
                <Image src={logo} className="mr-3 h-6 w-6 sm:h-9 sm:w-9" alt="Logo"/>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Griffin Baxter
                </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link href="/" active={navPage == NavigationPage.Home}>Home</Navbar.Link>
                <Navbar.Link href="projects" active={navPage == NavigationPage.SoftwareProjects}>Software Projects</Navbar.Link>
                <Navbar.Link href="reviews" active={navPage == NavigationPage.Reviews}>Reviews</Navbar.Link>
                <Navbar.Link href="contact" active={navPage == NavigationPage.Contact}>Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;
