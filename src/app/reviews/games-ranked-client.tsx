"use client";

import { FaSortAmountDown } from "@react-icons/all-files/fa/FaSortAmountDown";

export default function GamesRankedClient() {
  return (
    <button
      className="btn btn-secondary mx-auto my-2 sm:mx-0"
      onClick={() => {
        (
          document.getElementById("games-ranked-modal") as HTMLDialogElement
        ).showModal();
      }}
    >
      <FaSortAmountDown size={24} /> Games Ranked
    </button>
  );
}
