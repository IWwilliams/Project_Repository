import classes from "./SoftSkills.module.css";
import Header from "../../../UI/Header/Header";
import star from "./star.png";
import InfoSection from "../../../UI/InfoSection/InfoSection";
import react, { useMemo, useState, useEffect, useContext } from "react";
import Context from "../../../Context/Context";
function SoftSkills(props) {
  const [count, setCount] = useState(0);
  const ctx = useContext(Context);
  const skills = useMemo(() => {
    return [
      "Collaboration",
      "Project Management",
      "Leadership",
      "Adaptability",
      "Critical Thinking",
      "Openness to Feedback",
    ];
  }, []);

  var iterator = 0;
  useEffect(() => {
    if ((count < skills.length) & props.softSkillFill) {
      setTimeout(() => {
        setCount((old) => {
          return old + 1;
        });
      }, 600);
    }
  }, [count, props.softSkillFill]);

  return (
    <div id="SoftSkills">
      <Header sectionName="Soft Skills"></Header>
      <InfoSection>
        <div className={classes.container}>
          {props.softSkillFill &&
            skills.map((skill) => {
              iterator = iterator + 1;
              return (
                <div
                  key={skill}
                  className={`${classes.skills} ${
                    iterator <= count ? classes.phaseIn : classes.hidden
                  }`}
                >
                  <img src={star} alt="star" loading="lazy" />
                  <h5>{skill}</h5>
                </div>
              );
            })}
        </div>
      </InfoSection>
    </div>
  );
}
export default react.memo(SoftSkills);
