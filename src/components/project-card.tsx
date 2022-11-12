import { Card } from "flowbite-react";

export default function ProjectCard() {
    return (
        <Card
            imgSrc="/logo.png"
            imgAlt="Image"
        >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Project Name
            </h5>
            <h6 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Date
            </h6>
            <div>
                <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                    Language
                </span>
            </div>
        </Card>
    )
}
