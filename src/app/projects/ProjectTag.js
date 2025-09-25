

export default function ProjectTag({ type, title }) {
    return (
        <div className={`px-1.5 py-0.5 rounded-lg inline-flex justify-start items-start overflow-hidden ${type === "lang" ? "bg-lime-600/50" : "bg-blue-600/50"}`}>
            <div className="justify-start text-white text-sm font-normal  leading-none">{title}</div>
        </div>
    );
}