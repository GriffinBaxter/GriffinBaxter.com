"use client";

import { setDarkMode } from "./theme-controller";
import { MdOutlineDarkMode } from "@react-icons/all-files/md/MdOutlineDarkMode";
import { MdOutlineLightMode } from "@react-icons/all-files/md/MdOutlineLightMode";
import { useEffect, useState } from "react";

interface Props {
  isDarkModeCookie?: string;
}

export default function DarkModeToggle({ isDarkModeCookie }: Props) {
  const [isDarkMode, setIsDarkMode] = useState<string | undefined>(
    isDarkModeCookie,
  );

  useEffect(() => {
    if (isDarkMode === undefined) {
      setIsDarkMode(
        window.matchMedia("(prefers-color-scheme: dark)").matches.toString(),
      );
    }
  }, [isDarkMode, setIsDarkMode]);

  return isDarkMode === undefined ? (
    <></>
  ) : (
    <label
      htmlFor="dark-mode-toggle"
      className="flex cursor-pointer gap-2 pl-4"
    >
      <MdOutlineLightMode size={24} />
      <input
        id="dark-mode-toggle"
        type="checkbox"
        defaultChecked={isDarkMode === "true"}
        onChange={(event) => {
          if (event.target.checked) {
            setDarkMode(true);
          } else {
            setDarkMode(false);
          }
        }}
        className="toggle text-neutral bg-white checked:text-white"
      />
      <MdOutlineDarkMode size={24} />
    </label>
  );
}
