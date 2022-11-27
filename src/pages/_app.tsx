import { type AppType } from "next/app";
import { Inter } from '@next/font/google'
import {Flowbite} from "flowbite-react";

import "../styles/globals.css";

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <main className={`${inter.variable} font-sans`}>
            <Flowbite
                theme={{
                    theme: {
                        navbar: {
                            link: {
                                active: {
                                    on: "bg-white text-black md:bg-transparent md:text-white",
                                    off: "border-b border-gray-100 text-gray-400 hover:bg-gray-50 md:border-0 md:hover:bg-transparent md:hover:text-white",
                                }
                            }
                        }
                    }
                }}
            >
                <Component {...pageProps} />
            </Flowbite>
        </main>
    );
};

export default MyApp;
