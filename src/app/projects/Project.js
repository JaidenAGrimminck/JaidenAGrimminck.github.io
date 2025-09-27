import { SquareArrowOutUpRight } from "lucide-react";

export default function Project({ title, description, longerDescription, children, link, image, mobile=false }) {
    const onClick = () => {
        document.dispatchEvent(new CustomEvent("showProjectOverlay", { detail: { title, description, longerDescription, children, link, image } }));
    }

    return (
        <div className={`w-[367px] sm:w-[556px] p-5 bg-black/10 rounded-2xl outline outline-2 outline-offset-[-2px] outline-black/10 inline-flex justify-start items-start gap-5 hover:outline-black/20 hover:bg-black/20 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:shadow-black/20 active:shadow-md active:bg-black/25 ${mobile ? "flex-col" : ""}`} onClick={onClick}>
            <div className={`${mobile ? "w-[100%]" : "w-48"} h-36 flex justify-center ${mobile ? "items-center" : "items-start"} gap-2.5 overflow-hidden`}>
                { !image &&
                <div className="w-48 h-28 bg-zinc-300" />
                }
                {
                    image && <img src={image} alt={title} className={`${mobile ? "w-[100%]" : "w-48"} h-28 object-cover`} />
                }
            </div>
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2.5">
                <div className="inline-flex justify-center items-center gap-2.5 overflow-hidden">
                    <div className="justify-start text-white text-xl  font-bold leading-none">{title}</div>
                    <div data-size="20" className="w-5 h-5 overflow-hidden" style={{ position: "inherit" }}>
                        <SquareArrowOutUpRight width={20} height={20} />
                    </div>
                </div>
                <div className="self-stretch justify-start text-neutral-200 text-l font-normal ">{description}</div>
                {
                    new Array(Math.max(0, Math.ceil((children.length || 0) / 5))).fill(0).map((_, index) => (
                        <div key={index} className="self-stretch inline-flex justify-start items-start gap-2 overflow-hidden">
                            {children.slice(index * 5, (index + 1) * 5)}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}