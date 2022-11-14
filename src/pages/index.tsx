import { type NextPage } from "next";
import Head from "next/head";
import NavBar, { NavigationPage } from "../components/navbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Griffin Baxter</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar page={NavigationPage.Home}/>

      <main className="container mx-auto flex flex-col items-center justify-center p-4">
        <p className="text-3xl text-center">
            I’m Griffin Baxter, a Graduate Software Engineer in Christchurch, New Zealand.
        </p>
      </main>
    </>
  );
};

export default Home;
