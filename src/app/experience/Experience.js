import Job from "./Job";


export default function Experience({ experience_ref }) {
    return (
        <div className="inline-flex flex-col justify-center sm:justify-start items-center sm:items-start mt-[20px] sm:mt-[0px] gap-10 " ref={experience_ref}>
            <div className="justify-start text-white text-2xl font-bold">Experience</div>
            <Job 
                title={"Microsoft • Young Innovator"}
                time={"Nov 2023"}
                description={[
                    "Worked with a global team and Microsoft leaders to design tools for the future of education",
                    "Presented in a corporate think tank about Gen-Z sentiments of AI"
                ]}
            />
            <Job
                title={"Information Technology • The Bay School of San Francisco"}
                time={"Summer 2022"}
                description={[
                    "Prepared campus hardware and classroom tech for the new school year: set up and configured computers, validated A/V equipment, and performed QA checks across labs and classrooms",
                    "Built Google Apps Script automations to streamline setup checklists and repetitive tasks, significantly reducing manual work and turnaround time",
                    "Collaborated closely with school staff to find issues and ensure everything was fully functional by day one"
                ]}
            />
            <Job 
                title={"Information Technology • Marin Theatre Company (Storykrapht)"}
                time={"Feb 2021"}
                description={[
                    "Designed and built a real-time SMS interface that let audiences interact with a live play using Twilio Programmable Messaging and Node.js",
                    "Connected Twilio webhooks to a Google Sheets-based CMS, enabling non-technical staff to customize prompts and responses without code changes",
                    "Implemented a user database to persist state and track choices, allowing for branching storylines and personalized, progress-aware replies",
                    "Added input validation, logging, and error handling for reliable performance during live shows"
                ]}
            />
            
        </div>
    )
}