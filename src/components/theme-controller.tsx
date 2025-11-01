"use client";

import { type ReactElement, useEffect, useState } from "react";

export const setDarkMode = (isDarkMode: boolean) => {
  document.cookie = `isDarkMode=${isDarkMode.toString()}`;
  document
    .querySelector("html")
    ?.setAttribute("data-theme", isDarkMode ? "dark" : "winter");
};

interface Props {
  isDarkModeCookie?: string;
  main: ReactElement;
}

export default function ThemeController({ isDarkModeCookie, main }: Props) {
  const [darkModeCalled, setDarkModeCalled] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkModeCookie === undefined) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    } else {
      if (isDarkModeCookie === "true") {
        setDarkMode(true);
      } else if (isDarkModeCookie === "false") {
        setDarkMode(false);
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDarkModeCalled(true);
  }, [isDarkModeCookie, setDarkModeCalled]);
  return darkModeCalled ? main : <></>;
}
