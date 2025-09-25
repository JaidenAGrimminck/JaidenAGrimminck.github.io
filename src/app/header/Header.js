'use client';

import React from "react";
import Menu from "./Menu";
import consts from "./HeaderConstants";

function InnerHeader({ oref, tref, fix, d, menuRef, mobile=false }) {
    return (
        <div className={"self-stretch flex flex-col justify-center items-center gap-3.5 " + (fix ? "fixed left-[100px]" : mobile ? "" : "opacity-0 relative")} ref={oref}>
            <div className="w-[80vw] sm:w-[521px] text-center sm:text-left justify-start text-white text-6xl sm:text-8xl font-bold  sm:leading-[100px] leading-[60px]"  ref={tref}>Jaiden Grimminck</div>
            <div className="w-[80vw] sm:w-[506.50px] h-20">
                <div className="sm:w-[506px] text-center sm:text-left h-9 sm:h-9 justify-start text-white text-2xl sm:text-3xl  font-semibold">Student at Cornell University</div>
                <div className="sm:w-[506px] text-center sm:text-left h-7 sm:h-9 justify-start text-zinc-300 text-2xl sm:text-3xl  font-medium">Pursuing a B.S. in Computer Science</div>
            </div>
            {
                menuRef != null && <Menu difx={d.x} dify={d.y} ref={menuRef} />
            }
        </div>
    );
}

export default function Header({ mobile }) {
    const headerRef = React.useRef(null);
    const titleRef = React.useRef(null);
    const fixedHeaderRef = React.useRef(null);

    const bottom = consts.headerEnd;

    const menuRef = React.useRef(null);

    let lastScroll = 0;

    React.useEffect(() => {
        if (mobile) return;

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const onScroll = () => {
        // header handoff
        if (headerRef.current) {
            headerRef.current.style.top = `${Math.min(window.scrollY, bottom)}px`;
        }

        if (window.scrollY > bottom && lastScroll < window.scrollY) {
            headerRef.current.style.opacity = 1;
            fixedHeaderRef.current.style.opacity = 0;

            headerRef.current.style.pointerEvents = 'auto';
            headerRef.current.style.userSelect = 'text';

            fixedHeaderRef.current.style.pointerEvents = 'none';
            fixedHeaderRef.current.style.userSelect = 'none';
        }
        
        if (window.scrollY < bottom && lastScroll > window.scrollY) {
            headerRef.current.style.opacity = 0;
            fixedHeaderRef.current.style.opacity = 1;
            //pointer select
            fixedHeaderRef.current.style.pointerEvents = 'auto';
            fixedHeaderRef.current.style.userSelect = 'text';

            headerRef.current.style.pointerEvents = 'none';
            headerRef.current.style.userSelect = 'none';
        }

        // menu fade
        if (window.scrollY > consts.startOpacity && window.scrollY < consts.headerEnd) {
            const opacity = Math.max(0, Math.min(1, 1 - (window.scrollY - consts.startOpacity) / (consts.headerEnd - consts.startOpacity)));
            menuRef.current.style.opacity = opacity;
        } else if (window.scrollY < consts.startOpacity) {
            menuRef.current.style.opacity = 0.95;
        } else if (window.scrollY > consts.headerEnd) {
            menuRef.current.style.opacity = 0;
        }


        lastScroll = window.scrollY;
    };

    React.useEffect(() => {
        if (mobile) return;

        window.addEventListener('resize', onWindowResize);
        return () => window.removeEventListener('resize', onWindowResize);
    }, [mobile]);

    const onWindowResize = () => {
        if (titleRef.current && fixedHeaderRef.current) {
            fixedHeaderRef.current.style.left = `${
                titleRef.current.getBoundingClientRect().left
            }px`;
        }
    }

    React.useEffect(() => {
        if (mobile) return;

        onWindowResize();
        onScroll();
    }, [])


    return (
        <div className="sm:w-[571.45px] w-[80vw] inline-flex flex-col justify-start items-start gap-11 mt-[50px]">
            {!mobile && 
            <>
            <InnerHeader oref={headerRef} d={{
                x: 0,
                y: 0
            }} tref={titleRef} fix={false} menuRef={null} />
            <InnerHeader oref={fixedHeaderRef} d={{
                x: 0,
                y: 0
            }} tref={null} fix={true} menuRef={menuRef} />
            </>
            }
            {
                mobile && <InnerHeader oref={headerRef} d={{
                    x: 0,
                    y: 0
                }} tref={titleRef} fix={false} menuRef={null} mobile={true} />
            }
        </div>
    );
}