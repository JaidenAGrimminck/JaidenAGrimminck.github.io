import Project from "./Project";
import ProjectTag from "./ProjectTag";

export default function Projects({ project_ref, mobile=false }) {
    return (
        <div className="w-[90vw] sm:pl-[0px] sm:w-[100%] flex flex-row justify-center items-center gap-2.5" ref={project_ref}>
            <div className={`self-stretch pt-5 inline-flex ${mobile ? "flex-col justify-start items-start gap-7" : "flex-col flex-start gap-2.5"}`}>
                <div className="justify-start text-white text-2xl  w-[100vw] text-center sm:w-auto sm:text-left">Projects</div>

                <div className={`p-2.5 ${mobile ? "inline-flex flex-col justify-start items-start gap-2.5" : "inline-flex justify-center items-start gap-2.5"}`}>
                    <div className="inline-flex flex-col justify-start items-start gap-5 overflow-hidden pt-[20px]">
                        <Project link={"https://github.com/JaidenAGrimminck/bot"} image={"/bot.jpeg"} title={"bot"} description={"Autonomous rover with LiDAR-based perception and custom Java library."} mobile={mobile}
                        longerDescription={`Self-guided capstone/research project in my senior year of high school. 
I designed and built autonomous rover with LiDAR-based perception and embedded motor control, using a custom neural network to avoid obstacles with Python.
The library contains a custom topic-based protocol with reciprocal libraries in Python and JavaScript - additionally, it's a reusable Java robotics library/framework with comprehensive documentation.`}
                        
                        >
                            <ProjectTag title={"CAD"} />
                            <ProjectTag title={"OpenCV"} />
                            <ProjectTag title={"ML"} />
                            <ProjectTag title={"Java"} type={"lang"} />
                            <ProjectTag title={"C++"}  type={"lang"} />
                            <ProjectTag title={"JavaScript"} type={"lang"} />
                            <ProjectTag title={"Python"} type={"lang"} />
                        </Project>
                        <Project link={"https://github.com/JaidenAGrimminck/jscout"} image={"/jscout.webp"} title={"jscout"} description={"Web app for predicting team performance. Based on Statbotics, but for FTC."} mobile={mobile}>
                            <ProjectTag title={"node.js"} />
                            <ProjectTag title={"express.js"} />
                            <ProjectTag title={"React"} />
                            <ProjectTag title={"JavaScript"} type={"lang"} />
                        </Project>
                        <Project link={"https://github.com/frc8840/8840-utils"} image={"/8840utils.jpg"} title={"8840-utils"} description={"Utility library and web dashboard for FIRST Robotics Competition."} mobile={mobile}>
                            <ProjectTag title={"node.js"} />
                            <ProjectTag title={"React"} />
                            <ProjectTag title={"Java"} type={"lang"} />
                            <ProjectTag title={"JavaScript"} type={"lang"} />
                        </Project>
                    </div>
                    <div className="inline-flex flex-col justify-start items-start gap-5 overflow-hidden pt-[20px]">
                        <Project link={"https://github.com/hackclub/hackpad/pull/146"} image={"/hackpad.png"} title={"hackpad"} description={"Numpad with custom PCB and casing."} mobile={mobile}>
                            <ProjectTag title={"C++"} type={"lang"}/>
                            <ProjectTag title={"CAD"} />
                            <ProjectTag title={"KiCAD"} />
                        </Project>
                        <Project link={"https://github.com/ftc23014/team23014"} image={"/team23014.jpg"} title={"team23014"} description={"Website for FIRST Tech Challenge Team 23014."} mobile={mobile}>
                            <ProjectTag title={"React"} />
                            <ProjectTag title={"express.js"} />
                            <ProjectTag title={"node.js"} />
                            <ProjectTag title={"JavaScript"} type={"lang"}/>
                        </Project>
                        <Project link={"https://github.com/JaidenAGrimminck/eos-IV-weather-balloon"} image={"/eosiv.jpg"} title={"eos-IV"} description={"Weather balloon flight computer for collecting ground temperature data and VR analysis."} mobile={mobile}>
                            <ProjectTag title={"Unity"} />
                            <ProjectTag title={"C++"} type={"lang"} />
                            <ProjectTag title={"C#"} type={"lang"} />
                        </Project>
                    </div>
                </div>
            </div>
        </div>
    );
}