import {type NextPage} from "next";

const Divider: NextPage = () => {
    return (
        <div className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">{"//"}</span>
            <div className="flex-grow border-t border-gray-400"></div>
        </div>
    )
}

export default Divider
