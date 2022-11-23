import { Footer } from "flowbite-react";
import { type NextPage } from "next";
import {FaGithub, FaLinkedin} from "react-icons/fa";

const FooterComponent: NextPage = () => {
    return (
        <Footer>
            <div className="w-full bg-black mt-10">
                <div className="max-w-[1200px] py-6 px-4 flex items-center justify-between mx-auto">
                    <Footer.Copyright
                        by="Griffin Baxter"
                        year={new Date().getFullYear()}
                    />
                    <div className="mt-4 flex space-x-6 mt-0 justify-center">
                        <Footer.Icon
                            href="https://github.com/GriffinBaxter"
                            icon={FaGithub}
                        />
                        <Footer.Icon
                            href="https://www.linkedin.com/in/griffinbaxter/"
                            icon={FaLinkedin}
                        />
                    </div>
                </div>
            </div>
        </Footer>
    )
}

export default FooterComponent;
