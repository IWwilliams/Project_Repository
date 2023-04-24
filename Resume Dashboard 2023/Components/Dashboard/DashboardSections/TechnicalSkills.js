import classes from "./TechnicalSkills.module.css";
import InfoSection from "../../../UI/InfoSection/InfoSection";
import Header from "../../../UI/Header/Header";
import react, { useMemo } from "react";
import BarChart from "../../../UI/BarChart/BarChart";
function TechnicalSkills(props) {
  const mySkills1 = useMemo(() => {
    return [
      {
        Header: "Coding Languages",
        SubHeaderArray: [
          { name: "SQL", competency: 100 },
          { name: "Java", competency: 98 },
          { name: "Python", competency: 98 },
          { name: "JavaScript", competency: 98 },
          { name: "GraphQL", competency: 98 },
          { name: "CSS", competency: 98 },
          { name: "HTML", competency: 98 },
          { name: "TypeScript", competency: 95 },
          { name: "VBA", competency: 95 },
          { name: "Apache Spark", competency: 90 },
          { name: "C++", competency: 88 },
          { name: "R", competency: 85 },
        ],
      },
      {
        Header: "Software Programs",
        SubHeaderArray: [
          { name: "Power Bi", competency: 97 },
          { name: "SPSS", competency: 90 },
          { name: "GIS", competency: 75 },
          { name: "GKE", competency: 70 },
        ],
      },
    ];
  }, []);

  const mySkills2 = useMemo(() => {
    return [
      {
        Header: "Skills",
        SubHeaderArray: [
          { name: "Full Stack Development", competency: 99 },
          { name: "Machine Learning", competency: 97 },
          { name: "Deep Learning", competency: 95 },
          { name: "Data Science", competency: 99 },
          { name: "Web Testing", competency: 99 },
          { name: "Git", competency: 99 },
        ],
      },
      {
        Header: "Frameworks",
        SubHeaderArray: [
          { name: "React", competency: 100 },
          { name: "Next.js", competency: 99 },
          { name: "Spring Boot", competency: 100 },
          { name: "Node/Express.js", competency: 97 },
          { name: "Rest API", competency: 97 },
          { name: "TensorFlow", competency: 97 },
          { name: "PyTorch", competency: 97 },
          { name: "Agile Scrum", competency: 100 },
          { name: "JUnit", competency: 97 },
          { name: "Jest", competency: 97 },
        ],
      },
    ];
  }, []);
  return (
    <div>
      <Header sectionName="Technical Proficiency"></Header>
      <div className={classes.container} id="TechnicalSkills">
        <div className={classes.column}>
          {mySkills1.map((skillArea) => {
            return (
              <InfoSection key={skillArea.Header} className={classes.info}>
                <h4>{skillArea.Header}</h4>
                {skillArea.SubHeaderArray.map((item) => {
                  return (
                    <BarChart
                      key={item.name}
                      Title={item.name}
                      value={item.competency}
                      barFill={props.barFill}
                    />
                  );
                })}
              </InfoSection>
            );
          })}
        </div>
        <div className={classes.column}>
          {mySkills2.map((skillArea) => {
            return (
              <InfoSection key={skillArea.Header} className={classes.info}>
                <h4>{skillArea.Header}</h4>
                {skillArea.SubHeaderArray.map((item) => {
                  return (
                    <BarChart
                      key={item.name}
                      Title={item.name}
                      value={item.competency}
                      barFill={props.barFill}
                    />
                  );
                })}
              </InfoSection>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default react.memo(TechnicalSkills);
