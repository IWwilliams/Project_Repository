import classes from "./Dashboard.module.css";
import Context from "../../Context/Context";
import react, { useContext, useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import Education from "./DashboardSections/Education";
import TechnicalSkills from "./DashboardSections/TechnicalSkills";
import AwardsScholorships from "./DashboardSections/AwardsScholorships";
import ProfessionalExperience from "./DashboardSections/ProfessionalExperience";
import SoftSkills from "./DashboardSections/SoftSkills";
import useObserver from "../../Objects/useObserver";

let dashboardObserver;
function Dashboard(props) {
  const ctx = useContext(Context);
  const [barFill, setBarFill] = useState(false);
  const [awardFill, setAwardFill] = useState(false);
  const [softSkillFill, setSoftSkillFill] = useState(false);
  const [createObserver] = useObserver();

  useEffect(() => {
    props.contentObserver.observe(document.getElementById("Dashboard"));
    dashboardObserver = createObserver({
      reactionFunction: function (entries) {
        entries.map((entry) => {
          if (
            entry.target.id === "Education" &&
            entry.intersectionRatio >= 0.2
          ) {
            setAwardFill(true);
            dashboardObserver.unobserve(document.getElementById("Education"));
          } else if (
            entry.target.id === "TechnicalSkills" &&
            entry.intersectionRatio >= 0.2
          ) {
            setBarFill(true);
            dashboardObserver.unobserve(
              document.getElementById("TechnicalSkills")
            );
          } else if (
            entry.target.id === "SoftSkills" &&
            entry.intersectionRatio >= 0.2
          ) {
            setSoftSkillFill(true);
            dashboardObserver.unobserve(document.getElementById("SoftSkills"));
          }
        });
      },
      threshold: [0.2],
      root: null,
    });
    if (ctx.waitForElement("TechnicalSkills")) {
      dashboardObserver.observe(document.getElementById("TechnicalSkills"));
    }
    if (ctx.waitForElement("Education")) {
      dashboardObserver.observe(document.getElementById("Education"));
    }
    if (ctx.waitForElement("SoftSkills")) {
      dashboardObserver.observe(document.getElementById("SoftSkills"));
    }
  }, []);

  return (
    <div
      id="Dashboard"
      className={classes.container}
      onMouseEnter={() => {
        ctx.setActivePage("Dashboard");
      }}
    >
      <h2 className={classes.header}>Dashboard</h2>
      <Card className={classes["Dashboard-card"]}>
        <section className={classes["section"]}>
          <div className={classes.column}>
            <Education awardFill={awardFill} />
            <TechnicalSkills barFill={barFill} />
            <SoftSkills softSkillFill={softSkillFill} />
            <AwardsScholorships />
          </div>
          <div className={classes.column}>
            <ProfessionalExperience />
          </div>
        </section>
      </Card>
    </div>
  );
}
export default react.memo(Dashboard);
