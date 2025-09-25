

export default function Job({ title, time, description }) {
    return (
        <div className="inline-flex justify-center sm:justify-start items-start gap-2.5 flex-col sm:flex-row">
            <div className="w-[80vw] sm:w-44 justify-center text-white/80 text-sm ">{time}</div>
            <div className="w-[80vw] sm:w-80 inline-flex flex-col justify-start items-start gap-5">
                <div className="self-stretch justify-start text-white text-xl ">{title}</div>
                {
                    typeof description == "object" ? (
                        <ul className="self-stretch list-disc pl-5 flex flex-col justify-start items-start gap-2">
                            {description.map((item, index) => (
                                <li key={index} className="text-white text-m font-light ">{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <div className="self-stretch justify-start text-white text-s ">{description}</div>
                    )
                }
            </div>
        </div>
    );
}