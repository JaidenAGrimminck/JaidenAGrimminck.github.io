'use client';

import React from "react";
import ProjectTag from "./ProjectTag";
import { SquareArrowOutUpRight, X } from "lucide-react";

export default function ProjectOverlay() {
    const [title, setTitle] = React.useState("Project Name");
    const [description, setDescription] = React.useState("Here you can add more information about the project.");
    const [link, setLink] = React.useState("https://example.com");
    const [image, setImage] = React.useState("/path/to/image.jpg");

    const [tags, setTags] = React.useState([
        {
            name: "JavaScript",
            type: "lang"
        },
        {
            name: "React",
            type: "lib"
        },
        {
            name: "Node.js",
            type: "lib"
        },
        {
            name: "Express",
            type: "lib"
        }
    ]);

    const projRef = React.createRef(null);
    const overlayRef = React.createRef(null);
    const tagsRef = React.createRef(null);

    const onClick = (e) => {
        const target = e.target;
        if (projRef.current && target instanceof HTMLElement) {
            const rect = projRef.current.getBoundingClientRect();
            const isInOverlay = (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            );

            if (!isInOverlay && overlayRef.current) {
                overlayRef.current.style.opacity = "0";
                overlayRef.current.style.pointerEvents = "none";
                overlayRef.current.style.userSelect = "none";
            } else if (isInOverlay) {
                window.open(link, "_blank");
            }
        }
    }

    const showOverlay = (e) => {
        const { title, description, longerDescription, children, link, image } = e.detail;
        overlayRef.current.style.opacity = "1";
        overlayRef.current.style.pointerEvents = "auto";
        overlayRef.current.style.userSelect = "auto";
        setTitle(title);
        setDescription(longerDescription || description);
        setLink(link);
        setImage(image);

        let newTags = [];

        for (let child of children) {
            if (child.props) {
                const { title } = child.props;
                if (Object.keys(child.props).includes("type")) {
                    newTags.push({ name: title, type: child.props.type });
                } else {
                    newTags.push({ name: title, type: "other" });
                }
            }

        }

        setTags(newTags);
    }

    React.useEffect(() => {
        document.addEventListener("showProjectOverlay", showOverlay);
        
        return () => {
            document.removeEventListener("showProjectOverlay", showOverlay);
        }
    }, [overlayRef]);

    return (
        <div className="fixed h-full w-full bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 opacity-0 transition duration-300 user-select-none pointer-events-none" ref={overlayRef} onClick={onClick}>
            <div className="absolute top-5 right-5 text-white-700 hover:text-white/70 pointer-events-none cursor-pointer">
                <X />
            </div>

            <div className="outline outline-2 outline-black/90 bg-black/60 p-5 rounded-lg shadow-lg cursor-alias" ref={projRef}>
                <h2 className="text-xl font-bold mb-2 flex flex-row items-center gap-2">{title}
                    <SquareArrowOutUpRight width={20} height={20} />
                    <p className="font-light text-gray-400"><i>(Click to see project)</i></p>
                </h2>
                <div className="flex flex-row w-[100%] justify-center items-center">
                <img src={image} alt="Project Screenshot" className="mb-4 rounded-lg max-w-[600px] max-h-[60vh]" />
                </div>
                <div className="w-[80vw] max-w-[600px] flex flex-col justify-start items-start">
                    <p>Tags:</p>
                    <div className="flex flex-wrap gap-2 mb-4 mt-[5px]" ref={tagsRef}>
                        {tags.map((tag, index) => (
                            <ProjectTag key={index} title={tag.name} type={tag.type} />
                        ))}
                    </div>
                    <p className="text-white-700 w-[100%]">{description}</p>
                </div>
            </div>
        </div>
    );
}