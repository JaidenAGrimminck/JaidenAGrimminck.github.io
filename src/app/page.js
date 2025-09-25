'use client';
import React from "react";

import About from "./about/About";
import Experience from "./experience/Experience";
import Header from "./header/Header";
import Menu from "./header/Menu";
import Projects from "./projects/Projects";
import consts from "./header/HeaderConstants";
import CurrentProject from "./projects/CurrentProject";
import Contact from "./contact/Contact";
import useWindowSize from "./misc/WindowSize";

function RightSide({ about_ref, experience_ref }) {
    return (
        <>
        <div ref={about_ref}></div>
        <div className="inline-flex flex-col justify-center sm:justify-start items-center sm:items-start gap-7 mt-[70px]">
            <About></About>
            <Experience experience_ref={experience_ref}></Experience>
        </div>
        </>
    );
}

export default function Home() {
    const fixedMenuRef = React.useRef(null);
    const [delayBubbleMove, setDelayBubbleMove] = React.useState(false);

    const { width, height } = useWindowSize();
    const mobile = width <= 1370;

    const onScroll = () => {
        if (fixedMenuRef.current) {
            if (window.scrollY > consts.menuFixIn && window.scrollY < consts.menuFixFull) {
                const opacity = Math.max(0, Math.min(0.95, (window.scrollY - consts.menuFixIn) / (consts.menuFixFull - consts.menuFixIn)));
                fixedMenuRef.current.style.opacity = opacity;
            } else if (window.scrollY <= consts.menuFixIn) {
                fixedMenuRef.current.style.opacity = 0;
            } else if (window.scrollY >= consts.menuFixFull) {
                fixedMenuRef.current.style.opacity = 0.95; // weird ahh fix that makes it better
            }
        }

        if (refs.about.current && refs.experience.current && refs.projects.current) {
            if (!delayBubbleMove) {
                if (window.scrollY < refs.about.current.offsetTop + 100) {
                    document.dispatchEvent(new CustomEvent("forceMenuItem", { detail: { item: 0 } }));
                } else if (window.scrollY < refs.experience.current.offsetTop + 200) {
                    document.dispatchEvent(new CustomEvent("forceMenuItem", { detail: { item: 1 } }));
                } else if (window.scrollY < refs.projects.current.offsetTop + 300) {
                    document.dispatchEvent(new CustomEvent("forceMenuItem", { detail: { item: 2 } }));
                } else {
                    document.dispatchEvent(new CustomEvent("forceMenuItem", { detail: { item: 3 } }));
                }
            }

            if (window.scrollY < refs.about.current.offsetTop + 100) {
                document.dispatchEvent(new CustomEvent("notifyItem", { detail: { item: 0 } }));
            } else if (window.scrollY > refs.about.current.offsetTop + 100 && window.scrollY < refs.experience.current.offsetTop + 200) {
                document.dispatchEvent(new CustomEvent("notifyItem", { detail: { item: 1 } }));
            } else if (window.scrollY > refs.experience.current.offsetTop + 200 && window.scrollY < refs.projects.current.offsetTop + 300) {
                document.dispatchEvent(new CustomEvent("notifyItem", { detail: { item: 2 } }));
            } else if (window.scrollY > refs.projects.current.offsetTop + 300) {
                document.dispatchEvent(new CustomEvent("notifyItem", { detail: { item: 3 } }));
            }
        }
    }

    React.useEffect(() => {
        window.addEventListener("scroll", onScroll);
        onScroll();
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [delayBubbleMove]);

    const refs = {
        about: React.useRef(null),
        experience: React.useRef(null),
        projects: React.useRef(null),
        contact: React.useRef(null),
    }

    const scrollTo = (e) => {
        const item = e.detail.item;
        if (refs[item]) {
            setDelayBubbleMove(true);

            setTimeout(() => {
                setDelayBubbleMove(false);
            }, 800);

            refs[item].current.scrollIntoView({ behavior: "smooth" });
        }
    }

    React.useEffect(() => {
        document.addEventListener("scrollTo", scrollTo);
        
        return () => {
            document.removeEventListener("scrollTo", scrollTo);
        };
    }, []);

    return (
        <div className="w-[100%]">
            { width > 1370 && (
                <>
            {/* flex splitting the page into two sides */}
            <div className="fixed top-[20px] left-[10vw] right-0 opacity-0" ref={fixedMenuRef}>
                <Menu section_refs={refs} />
            </div>
            <div className="flex flex-row justify-around gap-20 px-20 mb-[50px]">
                <Header></Header>
                <RightSide about_ref={refs.about} experience_ref={refs.experience}></RightSide>
            </div>
            
            <Projects project_ref={refs.projects}></Projects>
            {/* <CurrentProject /> */}
            <Contact contact_ref={refs.contact} />
            </>
            ) }
            {
                width <= 1370 && (
                    <>
                    <div className="fixed w-[100vw]" ref={null}>
                        <div className="flex justify-center pt-[10px]">
                        <Menu section_refs={refs} mobile={true} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-5 mb-[50px] pt-[40px]">
                        <Header mobile={true}></Header>
                        <RightSide about_ref={refs.about} experience_ref={refs.experience}></RightSide>
                    </div>
                    <div className="flex flex-row justify-center items-center w-[100vw]">
                        <Projects project_ref={refs.projects} mobile={true}/>
                    </div>
                    <Contact contact_ref={refs.contact} />
                    </>
                )
            }
        </div>
    );
}
