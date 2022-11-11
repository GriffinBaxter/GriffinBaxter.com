import { Navbar } from "flowbite-react";
import Image from "next/image";
import logo from "/public/logo.png"

export default function NavBar() {
    return (
        <Navbar fluid={true} rounded={true}>
            <Navbar.Brand href="#">
                <Image src={logo} className="mr-3 h-6 w-6 sm:h-9 sm:w-9" alt="Logo"/>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Griffin Baxter
                </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link href="#" active={true}>Home</Navbar.Link>
                <Navbar.Link href="#">Software Projects</Navbar.Link>
                <Navbar.Link href="#">Reviews</Navbar.Link>
                <Navbar.Link href="#">Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}
