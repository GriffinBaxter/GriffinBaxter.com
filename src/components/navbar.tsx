import { Navbar, Text, useTheme } from "@nextui-org/react";
import Image from 'next/image'
import logo from "/public/logo.png"

export default function NavBar() {
    const { isDark } = useTheme();

    return (
        <Navbar isBordered={isDark} variant="static">
            <Navbar.Brand>
                <Image
                    src={logo}
                    className="mr-3 h-9 w-9"
                    alt="Logo"
                />
                <Text b color="inherit" hideIn="xs">
                    Griffin Baxter
                </Text>
            </Navbar.Brand>
            <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
                <Navbar.Link isActive href="#">Home</Navbar.Link>
                <Navbar.Link href="#">Software Projects</Navbar.Link>
                <Navbar.Link href="#">Reviews</Navbar.Link>
                <Navbar.Link href="#">Contact</Navbar.Link>
            </Navbar.Content>
        </Navbar>
    )
}
