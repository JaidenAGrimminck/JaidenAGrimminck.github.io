'use client';

import React from "react";
import "./Glass.css";


function MenuItem({ title, behavior, isBlack }) {
    return (
        <div className={`text-base sm:text-lg  font-medium cursor-pointer transition-colors duration-200 ${isBlack ? 'text-cyan-200' : 'text-white'}`} onClick={behavior}>
            {title}
        </div>
    );
}

export default function Menu({ difx, dify, ref, section_refs, mobile=false }) {
    const overlayRef = React.useRef(null);
    const internalMenuRef = React.useRef(null);
    const menuRef = ref ?? internalMenuRef;

    const [isBlack, setIsBlack] = React.useState([true, false, false, false]);
    const [bgVisible, setBgVisible] = React.useState(false);

    const overlayHorizPadding = 20;
    const overlayVertPadding = 5;

    let lastMouseX = 0;
    let lastMouseY = 0;

    let force = 0;
    let lastSet = 0;

    let ID = React.useRef(Math.random());

    const handleMouseMove = (e) => {        
        const children = Array.from(menuRef.current.children);

        if (menuRef.current.parentElement.style.opacity == "0") return;
        
        let setTo = -1;

        for (let i = 0; i < children.length - 1; i++) {
            const child = children[i];
            
            const childRect = child.getBoundingClientRect();
            // if in box
            if (
                (childRect.left <= e.clientX && e.clientX <= childRect.right && childRect.top <= e.clientY && e.clientY <= childRect.bottom)
                || force == i) {

                overlayRef.current.style.setProperty("left", `${childRect.left - (overlayHorizPadding / 2) - (difx || 0)}px`);
                overlayRef.current.style.setProperty("top", `${childRect.top - (overlayVertPadding / 2) - (dify || 0)}px`);
                overlayRef.current.style.setProperty("width", `${childRect.width + overlayHorizPadding}px`);
                overlayRef.current.style.setProperty("height", `${childRect.height + overlayVertPadding}px`);

                setTo = i;
            }
        }

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        force = -1;
        if (setTo > -1) {
            document.dispatchEvent(new CustomEvent("forceMenuItem", { detail: { item: setTo, dispatcher: ID.current } }));

            lastSet = setTo;
        }
    };
    
    const forceMenuItem = (e) => {
        if (e.detail.dispatcher == ID.current) return;

        let item = e.detail.item;

        const children = Array.from(menuRef.current.children);

        for (let i = 0; i < children.length - 1; i++) {
            if (i === item) {
                const childRect = children[i].getBoundingClientRect();

                overlayRef.current.style.setProperty("left", `${childRect.left - (overlayHorizPadding / 2) - (difx || 0)}px`);
                overlayRef.current.style.setProperty("top", `${childRect.top - (overlayVertPadding / 2) - (dify || 0)}px`);
                overlayRef.current.style.setProperty("width", `${childRect.width + overlayHorizPadding}px`);
                overlayRef.current.style.setProperty("height", `${childRect.height + overlayVertPadding}px`);
            }
        }
    }

    React.useEffect(() => {
        document.addEventListener("forceMenuItem", forceMenuItem);

        return () => {
            document.removeEventListener("forceMenuItem", forceMenuItem);
        };
    })

    React.useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        
        setTimeout(() => {
            handleMouseMove({ clientX: lastMouseX, clientY: lastMouseY });
        }, 50)

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // window resize
    React.useEffect(() => {
        const handleResize = () => {
            force = lastSet;
            handleMouseMove({ clientX: lastMouseX, clientY: lastMouseY });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const scrollTo = (target) => {
        return () => {
            document.dispatchEvent(new CustomEvent("scrollTo", { detail: { item: target } }));
        }
    }

    const onNotifyItem = (e) => {
        const item = e.detail.item;

        let newIsBlack = [false, false, false, false];
        newIsBlack[item] = true;

        setIsBlack(newIsBlack);
    }

    React.useEffect(() => {
        document.addEventListener("notifyItem", onNotifyItem);
        
        return () => {
            document.removeEventListener("notifyItem", onNotifyItem);
        };
    }, []);

    const onScrollBG = () => {
        if (!section_refs) return;

        if (section_refs.projects.current) {
            const bbox = section_refs.projects.current.getBoundingClientRect();
            const thisBB = overlayRef.current.getBoundingClientRect();

            if (thisBB.top < bbox.bottom && thisBB.bottom > bbox.top) {
                setBgVisible(true);
            } else {
                setBgVisible(false);
            }
        }
    }

    React.useEffect(() => {
        window.addEventListener("scroll", onScrollBG);

        onScrollBG();

        return () => {
            window.removeEventListener("scroll", onScrollBG);
        };
    }, [section_refs]);

    return (
        <div className={`flex flex-row justify-between items-center mr-[10px] ml-[10px] w-[100vw] sm:w-[450px] ${(bgVisible || mobile) ? "bg-black/90 outline outline-1 outline-white/50" : "bg-transparent"} p-[10px] pl-[20px] pr-[20px] rounded-2xl transition-all duration-200 z-10000`} style={{ opacity: 0.945 }} ref={menuRef}>
            <MenuItem title="about" behavior={scrollTo("about")} isBlack={isBlack[0]} />
            <MenuItem title="experience" behavior={scrollTo("experience")} isBlack={isBlack[1]} />
            <MenuItem title="projects" behavior={scrollTo("projects")} isBlack={isBlack[2]} />
            <MenuItem title="contact" behavior={scrollTo("contact")} isBlack={isBlack[3]} />
            <div className="fixed transition-all duration-200 glass rounded-2xl cursor-pointer pointer-events-none" ref={overlayRef}>

            </div>
        </div>
    )
}