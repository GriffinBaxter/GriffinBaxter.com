import type {NextPage} from "next";
import Head from "next/head";
import NavBar, {NavigationPage} from "../components/navbar";
import FooterComponent from "../components/footer";
import {FaGithubSquare, FaLinkedin} from "react-icons/fa";

const Contact: NextPage = () => {
    return (
        <>
            <Head>
                <title>Contact - Griffin Baxter</title>
                <meta name="description" content="Contact" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NavBar page={NavigationPage.Contact}/>

            <main className="container mx-auto flex flex-col items-center p-4">
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 items-center">
                    <a target="_blank" href="https://github.com/GriffinBaxter" rel="noreferrer">
                        <FaGithubSquare size={100} color="24292d" />
                        <p className="text-lg font-bold text-center pt-2">GitHub</p>
                    </a>
                    <a target="_blank" href="https://www.linkedin.com/in/griffinbaxter/" rel="noreferrer">
                        <FaLinkedin size={100} color="0d66c2" />
                        <p className="text-lg font-bold text-center pt-2">LinkedIn</p>
                    </a>
                </div>
            </main>

            <FooterComponent/>
        </>
    );
};

export default Contact;
