"use client";

import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaGithubSquare } from "@react-icons/all-files/fa/FaGithubSquare";
import { FaItchIo } from "@react-icons/all-files/fa/FaItchIo";
import Link from "next/link";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";

export default function ContactClient() {
  const onSuccessPage = useSearchParams().get("success") !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-3 items-center gap-x-6 gap-y-2 py-6">
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
      </div>

      <form
        action="https://api.web3forms.com/submit"
        method="POST"
        className="pt-8"
      >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          {onSuccessPage ? (
            <div role="alert" className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Message Sent!</span>
            </div>
          ) : (
            <>
              <label htmlFor="name" className="floating-label pb-2">
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-lg"
                  required
                />
                <span>Name</span>
              </label>
              <label htmlFor="email" className="floating-label pb-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-lg"
                  required
                />
                <span>Email</span>
              </label>
              <label htmlFor="message" className="floating-label pb-2">
                <textarea
                  id="message"
                  name="message"
                  className="textarea textarea-lg h-48"
                  placeholder="Message"
                  required
                ></textarea>
                <span>Message</span>
              </label>
              <button className="btn btn-neutral">Send Message</button>
              <input
                type="hidden"
                name="access_key"
                value="30208aad-0dfd-4259-a56d-4951c2c96e03"
              />
              <input
                type="hidden"
                name="redirect"
                value="https://www.griffinbaxter.com/contact?success"
              />
            </>
          )}
        </fieldset>
      </form>
    </motion.div>
  );
}
