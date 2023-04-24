import classes from "./ProfessionalExperience.module.css";
import Header from "../../../UI/Header/Header";
import InfoSection from "../../../UI/InfoSection/InfoSection";
import Job from "../../../UI/Job/Job";
import react, { useMemo } from "react";

function ProfessionalExperience() {
  const experience = useMemo(() => {
    return [
      {
        company: "Burto Heat Services",
        revenue: "*Rev: 2 Million",
        date: "May 2020 – Present",
        companyDescription:
          "Provider of onsite based Heat treating services for the oil and gas sector in Alberta and Northern BC",
        position: "Full Stack and Data Engineer",
        location: "(Hybrid, Ad Hoc)",
        jobTasks: [
          {
            key: 2,
            responsibility: [
              <p id="2a" key="2a">
                <span className={classes.highlight}>Lead</span> the{" "}
                <span className={classes.highlight2}>full stack</span>{" "}
                development of an internal web application, using PostgreSQL,{" "}
                Node.js, Express.js and React.js providing analytics and machine
                learning to trend heater performance.
              </p>,
            ],
            result: [
              <p id="2b" key="2b">
                - Improved information conveyance, and safety standards
              </p>,
              <p id="2c" key="2c">
                - Awarded with a <span className={classes.highlight}>lead</span>{" "}
                role in the develoment of my current client facing application
              </p>,
            ],
          },
          {
            key: 1,
            responsibility: [
              <p id="1a" key="1a">
                <span className={classes.highlight}>Leading</span> the{" "}
                <span className={classes.highlight2}>full stack</span>{" "}
                development of a client facing web page, using Node.js and
                React.js to improve aesthetics, SEO and client acquisitions
              </p>,
            ],
            result: [
              <p id="1b" key="1b">
                - Recieved approval to proceed following finalization of JIRA
                schedule and diagrams: use case, wire frame, activity and state
                transition
              </p>,
            ],
          },
          {
            key: 3,
            responsibility: [
              <p id="3a" key="3a">
                Responsible for diagrams such as: ER, use case, scenario, state
                transition, activity and wireframe
              </p>,
            ],
            result: [
              <p id="3b" key="3b">
                - <span className={classes.highlight}>Recognized</span> for
                exceptional issue comprehension and prototype linearity to
                communication
              </p>,
            ],
          },
          {
            key: 4,
            responsibility: [
              <p id="4a" key="4a">
                Responsible for project delivery using Jira scheduler and an{" "}
                <span className={classes.highlight}>Agile Scrum</span> framework
              </p>,
            ],
            result: [
              <p id="4b" key="4b">
                - Praised for well structured organized timelines and clear,
                attainable deliverables
              </p>,
            ],
          },
        ],
      },
      {
        company: "Enbridge",
        revenue: "*Rev: 41 Billion",
        date: "May 2018 - Present",
        companyDescription:
          "Largest North American oil and gas pipeline delivery network, transporting crude oil, natural gas, and natural gas liquids",
        position: "Specialist Data Analyst",
        location: "(Remote)",
        prevPosition: [
          <p>Analyst, 2020-2021</p>,
          <p>Asset Management Intern, 2018-2019</p>,
        ],
        jobTasks: [
          {
            key: 5,
            responsibility: [
              <p id="5a" key="5a">
                Responsible for{" "}
                <span className={classes.highlight2}>data analytics</span>:
                extraction, pattern identification, transformation,
                standardization, modelling and visualization
              </p>,
            ],

            result: [
              <p id="5b" key="5b">
                - Automated reporting eliminating{" "}
                <span className={classes.highlight}> 1.50 </span>FTE (full-time
                equivalent) saving
                <span className={classes.highlight}> 3000 </span>hours/yr.
              </p>,
            ],
          },
          {
            key: 6,
            responsibility: [
              <p id="6a" key="6a">
                Developed a random forest{" "}
                <span className={classes.highlight}>machine learning</span>{" "}
                budget estimator model and graphical interface
              </p>,
            ],
            result: [
              <p id="6b" key="6b">
                - Exceeded KPI expectations saving{" "}
                <span className={classes.highlight}>200</span> hours/yr.
              </p>,
              <p id="6c" key="6c">
                - Best capital forecast accuracy amongst all company business
                units
              </p>,
            ],
          },
          {
            key: "7a",
            responsibility: [
              <p id="7a" key="7a">
                Implemented a deep learning natural language model to classify
                failures based on inspection textual fields
              </p>,
            ],
            result: [
              <p id="7b" key="7b">
                - Classification accuracy of
                <span className={classes.highlight}> 88% </span> Achieved
              </p>,
              <p id="7c" key="7c">
                - Responsible for{" "}
                <span className={classes.highlight}>~80%</span> of work order
                classifications, saving{" "}
                <span className={classes.highlight}>$80,000</span>/yr.
              </p>,
            ],
          },
          // {
          //   key: 3,
          //   responsibility: [
          //     <p id="2a" key="2a">
          //       <span className={classes.highlight}>Lead </span>dependability
          //       and reliability testing for a corporate risk management
          //       software, employing
          //       <span className={classes.highlight}> JUnit </span>
          //       testing within an
          //       <span className={classes.highlight}> Agile </span> env.
          //     </p>,
          //   ],
          //   result: [
          //     <p id="2b" key="2b">
          //       - Delivered
          //       <span className={classes.highlight}> on schedule </span> with
          //       primary functionalities operating in their intended manners
          //     </p>,
          //   ],
          // },
        ],
      },
      {
        company: "Tenaris",
        revenue: "*Rev: 11.7 Billion",
        date: "May 2017 - August 2017",
        companyDescription:
          "Multinational supplier and provider of steel pipes and services to the petrochemical industry",
        position: "Analyst Engineering Intern",
        location: "(On Site)",
        jobTasks: [
          {
            key: 8,
            responsibility: [
              <p id="8a" key="8a">
                <span className={classes.highlight}>Lead</span> an invoicing
                backlog remittance project identifying and investigating
                unresolved billing issues
              </p>,
            ],
            result: [
              <p id="8b" key="8b">
                - Remitted{" "}
                <span className={classes.highlight}> $12 million+ </span> of
                unreconciled invoices
              </p>,
            ],
          },
          {
            key: 9,
            responsibility: [
              <p id="9a" key="9a">
                Assisted to develop an internal{" "}
                <span className={classes.highlight2}>full stack</span> dashboard
                preventing backlog escalation using MySQL, VBA, Node.js and
                React.js
              </p>,
            ],
            result: [
              <p id="9b" key="9b">
                - Facilitates financial stage tracking and links to all
                necessary documents
              </p>,
              <p id="9c" key="9c">
                - Recieved an{" "}
                <span className={classes.highlight}>offer of employment</span>{" "}
                for the subsequent internship period
              </p>,
            ],
          },
        ],
      },
    ];
  }, []);
  return (
    <div>
      <Header sectionName="Professional Highlights"></Header>
      {experience.map((job) => {
        return (
          <InfoSection key={job.company}>
            <Job
              company={job.company}
              revenue={job.revenue}
              jobDate={job.date}
              companyDescription={job.companyDescription}
              position={job.position}
              location={job.location}
              jobTasks={job.jobTasks}
              prevPosition={job.prevPosition}
            />
          </InfoSection>
        );
      })}
    </div>
  );
}
export default react.memo(ProfessionalExperience);
