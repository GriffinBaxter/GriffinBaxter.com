import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

import { NextUIProvider } from '@nextui-org/react';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
  );
};

export default trpc.withTRPC(MyApp);
