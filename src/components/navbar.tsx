import { Navbar } from "flowbite-react";
import { type NextPage } from "next";

export enum NavigationPage {
    Home,
    SoftwareProjects,
    GameReviews,
    Contact,
}

interface Props {
    page?: NavigationPage;
}

const NavBar: NextPage<Props> = ({page: navPage}) => {
    return (
        <div className="w-full bg-black mb-10">
            <Navbar className="mx-auto max-w-[1200px] bg-black" fluid={true} >
                <Navbar.Brand href="/">
                <span className="self-center whitespace-nowrap text-xl font-bold text-white">
                    Griffin Baxter
                </span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Navbar.Link href="/" className={navPage == NavigationPage.Home ? "first:text-white" : "first:text-gray-400"} active={navPage == NavigationPage.Home}>Home</Navbar.Link>
                    <Navbar.Link href="projects" className={navPage == NavigationPage.SoftwareProjects ? "first:text-white" : "first:text-gray-400"} active={navPage == NavigationPage.SoftwareProjects}>Software Projects</Navbar.Link>
                    <Navbar.Link href="game-reviews" className={navPage == NavigationPage.GameReviews ? "first:text-white" : "first:text-gray-400"} active={navPage == NavigationPage.GameReviews}>Game Reviews</Navbar.Link>
                    <Navbar.Link href="contact" className={navPage == NavigationPage.Contact ? "first:text-white" : "first:text-gray-400"} active={navPage == NavigationPage.Contact}>Contact</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar;
