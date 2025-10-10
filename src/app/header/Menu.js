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

    function onMobile() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    let onmob = onMobile();

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
            <div className={"fixed transition-all duration-200 glass rounded-2xl cursor-pointer pointer-events-none " + (onmob ? "hidden" : "")} ref={overlayRef}>

            </div>
        </div>
    )
}