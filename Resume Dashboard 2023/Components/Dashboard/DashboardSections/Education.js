import classes from "./Education.module.css";
import InfoSection from "../../../UI/InfoSection/InfoSection";
import AchievementPlack from "../../../UI/AchievementPlack/AchievementPlack";
import Header from "../../../UI/Header/Header";
import react, { useContext } from "react";
import award from "./award.png";
import arrow from "./arrow.png";
import Context from "../../../Context/Context";
function Education(props) {
  const ctx = useContext(Context);
  return (
    <div id="Education">
      <Header sectionName="Education"></Header>
      <InfoSection>
        <div className={classes.schoolSection}>
          <header className={classes.header}>
            <h4>Master Of Engineering Science, Software Engineering</h4>
            <h4>2022 - 2023</h4>
          </header>
          <div className={classes.info}>
            <p>University Of Calgary</p>
            <div className={classes.infoExtra}>
              <img className={classes.arrow} src={arrow} alt="arrow"></img>
              <p className={classes.infoExtraP}>
                Maintained a 30 hour work week during studies
              </p>
            </div>
            <div
              className={`${classes.placks} ${
                props.awardFill && classes.phaseIn
              } ${ctx.animationOverride && classes.phaseIn}`}
            >
              <AchievementPlack
                type="emblem"
                lable="GPA"
                emblem="4.0"
              ></AchievementPlack>
              <img className={classes.test} src={award} alt="award"></img>
              <AchievementPlack
                type="award"
                lable="Honour's"
              ></AchievementPlack>
            </div>
          </div>
        </div>
      </InfoSection>
      <InfoSection>
        <div className={classes.schoolSection}>
          <header className={classes.header}>
            <h4>Bachelor Of Engineering Science, Chemical Engineering</h4>
            <h4>2015 - 2020</h4>
          </header>
          <div className={classes.info}>
            <p>University Of Western Ontario</p>
            <div
              className={`${classes.placks} ${
                props.awardFill && classes.phaseIn
              } ${ctx.animationOverride && classes.phaseIn}`}
            >
              <AchievementPlack
                type="emblem"
                lable="GPA"
                emblem="3.8"
              ></AchievementPlack>
              <AchievementPlack
                type="emblem"
                lable="Internships"
                emblem="2.0"
              ></AchievementPlack>
              <AchievementPlack
                type="award"
                lable="Dean's List"
              ></AchievementPlack>
            </div>
          </div>
        </div>
      </InfoSection>
    </div>
  );
}
export default react.memo(Education);
