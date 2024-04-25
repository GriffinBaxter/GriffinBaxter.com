import { type NextPage } from "next";
import Head from "next/head";

interface Props {
  title: string;
}

const CustomHead: NextPage<Props> = ({ title }) => {
  return (
    <Head>
      <title>
        {title === "Home" ? "Griffin Baxter" : `${title} - Griffin Baxter`}
      </title>
      <meta name="description" content={title} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default CustomHead;
