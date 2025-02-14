"use client";

import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaGithubSquare } from "@react-icons/all-files/fa/FaGithubSquare";
import { FaItchIo } from "@react-icons/all-files/fa/FaItchIo";
import Link from "next/link";
import { motion } from "motion/react";

export default function ContactClient() {
  return (
    <>
      <motion.div whileHover={{ scale: 1.075 }} whileTap={{ scale: 0.925 }}>
        <Link
          target="_blank"
          href="https://www.linkedin.com/in/griffinbaxter/"
          rel="noreferrer"
        >
          <FaLinkedin className="text-primary" size={100} />
          <p className="pt-2 text-center text-lg font-bold">LinkedIn</p>
        </Link>
      </motion.div>
      <motion.div whileHover={{ scale: 1.075 }} whileTap={{ scale: 0.925 }}>
        <Link
          target="_blank"
          href="https://github.com/GriffinBaxter"
          rel="noreferrer"
        >
          <FaGithubSquare className="text-base-content" size={100} />
          <p className="pt-2 text-center text-lg font-bold">GitHub</p>
        </Link>
      </motion.div>
      <motion.div whileHover={{ scale: 1.075 }} whileTap={{ scale: 0.925 }}>
        <Link
          target="_blank"
          href="https://griffinbaxter.itch.io/"
          rel="noreferrer"
        >
          <FaItchIo className="text-error" size={100} />
          <p className="pt-2 text-center text-lg font-bold">itch.io</p>
        </Link>
      </motion.div>
    </>
  );
}
