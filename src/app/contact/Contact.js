import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import React from "react";
import useWindowSize from "../misc/WindowSize";

export default function Contact({ contact_ref }) {
    const mailRef = React.useRef(null);
    const linkedinRef = React.useRef(null);
    const githubRef = React.useRef(null);
    const instagramRef = React.useRef(null);

    const { width } = useWindowSize();

    React.useEffect(() => {
        const linkedin = () => {
            window.open("https://www.linkedin.com/in/jaidengrimminck/");
        }

        linkedinRef.current.addEventListener("click", linkedin);

        return () => {
            if (!linkedinRef.current) return;
            linkedinRef.current.removeEventListener("click", linkedin);
        };
    }, []);

    React.useEffect(() => {
        const github = () => {
            window.open("https://github.com/jaidenagrimminck");
        }

        githubRef.current.addEventListener("click", github);

        return () => {
            if (!githubRef.current) return;
            githubRef.current.removeEventListener("click", github);
        };
    }, []);

    React.useEffect(() => {
        const instagram = () => {
            window.open("https://www.instagram.com/jaidentravels/");
        }

        instagramRef.current.addEventListener("click", instagram);

        return () => {
            if (!instagramRef.current) return;
            instagramRef.current.removeEventListener("click", instagram);
        };
    }, []);

    return (
        <>
        <div className="flex flex-row ml-[10%] mr-[10%] justify-center items-center mt-[200px] pb-[200px]" ref={contact_ref}>
            <div className="w-[100vw] text-center">
                <h2 className="text-2xl mb-[10px]" style={{ fontWeight: "250" }}>Contacts</h2>
                <div className="flex flex-row justify-center items-center mt-[20px] gap-5 sm:gap-10">
                    <a href="mailto:jg2575@cornell.edu">
                    <Mail size={width <= 1370 ? 28 : 48} ref={mailRef} className="hover:text-blue-300 transition-colors duration-200 cursor-pointer" />
                    </a>
                    <Linkedin size={width <= 1370 ? 28 : 48} ref={linkedinRef} className="hover:text-blue-300 transition-colors duration-200 cursor-pointer" />
                    <Github size={width <= 1370 ? 28 : 48} ref={githubRef} className="hover:text-blue-300 transition-colors duration-200 cursor-pointer" />
                    <Instagram size={width <= 1370 ? 28 : 48} className="hover:text-blue-300 transition-colors duration-200 cursor-pointer" ref={instagramRef} />
                </div>
            </div>
        </div>
        <footer className="w-full h-[50px] bg-gray-800 flex justify-center items-center">
            <p className="text-white text-sm">© {new Date().getFullYear()} Jaiden Grimminck. All rights reserved.</p>
        </footer>
        </>
    );
}
