import { type NextPage } from "next";

const Divider: NextPage = () => {
  return (
    <div className="relative flex w-full items-center py-5 py-8">
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="mx-4 flex-shrink select-none text-gray-400">{"//"}</span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  );
};

export default Divider;
