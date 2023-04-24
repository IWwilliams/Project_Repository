import classes from "./AwardsScholorships.module.css";
import InfoSection from "../../../UI/InfoSection/InfoSection";
import Header from "../../../UI/Header/Header";
import arrow from "./arrow.png";
import react from "react";
function AwardsScholorships(props) {
  return (
    <div>
      <Header sectionName="Awards & Scholorships"></Header>
      <InfoSection>
        <div className={classes.content}>
          <div className={classes.contentText}>
            <div className={classes.item}>
              <img
                className={classes.arrow}
                src={arrow}
                loading="lazy"
                alt="arrow"
              ></img>
              <div className={classes.text}>
                <h5>2nd Place, Hackathon (University Of Calgary)</h5>
                <h6>Year: 2023 </h6>
              </div>
            </div>
            <div className={classes.item}>
              <img
                className={classes.arrow}
                src={arrow}
                loading="lazy"
                alt="arrow"
              ></img>
              <div className={classes.text}>
                <h5>1st Place, Hackathon (University Of Calgary)</h5>
                <h6>Year: 2022 </h6>
              </div>
            </div>
            <div className={classes.item}>
              <img
                className={classes.arrow}
                src={arrow}
                loading="lazy"
                alt="arrow"
              ></img>
              <div className={classes.text}>
                <h5>Academic Scholarship, Western University</h5>
                <h6>Year: 2015 - 2020 </h6>
              </div>
            </div>
            <div className={classes.item}>
              <img
                className={classes.arrow}
                src={arrow}
                loading="lazy"
                alt="arrow"
              ></img>
              <div className={classes.text}>
                <h5>Rutherford Scholarship Recipient</h5>
                <h6>Year: 2015 </h6>
              </div>
            </div>
          </div>
        </div>
      </InfoSection>
    </div>
  );
}
export default react.memo(AwardsScholorships);
