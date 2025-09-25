import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StaticOverlay from "./overlay/staticOverlay";
import Menu from "./header/Menu";
import ProjectOverlay from "./projects/ProjectOverlay";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Portfolio by Jaiden Grimminck",
    description: "Jaiden Grimminck's Portfolio",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
            className={`antialiased h-full`} style={{
                // system default macos
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
            }}
            >
                {/* centered */}
                {/* <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
                    <Menu />
                </div> */}
                <div>
                    <StaticOverlay />
                    <ProjectOverlay />
                    {children}
                </div>
            </body>
        </html>
    );
}
