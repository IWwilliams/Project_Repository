import classes from "./Projects.module.css";
import react, {
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import Context from "../../Context/Context";
import AcordianProject from "../../UI/AcordianProject/AcordianProject";
import Expand from "../../UI/Expand/Expand";
//AMP
import AMPVBA from "./AMP/VBA.jpeg";
import Home from "./AMP/Home.jpeg";
import UI from "./AMP/UI.png";
import UpdateForm from "./AMP/UpdateForm.jpeg";
import UpdateRequest from "./AMP/UpdateRequest.png";
import RemovalForm from "./AMP/RemovalForm.jpeg";
import RemovalRequest from "./AMP/RemovalRequest.png";
//Deep Learning
import deepLearn from "./Classifier/Deep_Learn.png";
//Heater
import heaterHome from "./Heater/heaterHome.png";
import heaterTech from "./Heater/heaterTech.png";

var maxLeftScroll;
var max;
var projectObserver;
function Projects(props) {
  const ctx = useContext(Context);
  const [maximize, setMaximize] = useState(null);

  const myArray = useCallback(() => {
    var i = 0;
    var myArray = [];
    while (i + 0.01 < 0.7) {
      i = i + 0.01;
      myArray.push(i);
    }
    return myArray;
  }, []);
  useEffect(() => {
    props.contentObserver.observe(document.getElementById("Projects"));
    document.getElementById("ProjectId").scrollLeft = 1000;
    maxLeftScroll = document.getElementById("ProjectId").scrollLeft;
    document.getElementById("ProjectId").scrollLeft = 0;
    projectObserver = new IntersectionObserver(
      function (entries) {
        if (entries[0].intersectionRatio > 0.5) {
          max = true;
          projectObserver.disconnect();
        }
        if (max && entries[0].intersectionRatio < 0.2) {
          projectObserver.disconnect();
        }
        if (entries[0].intersectionRatio > 0.1) {
          document.getElementById("ProjectId").scrollLeft =
            maxLeftScroll * entries[0].intersectionRatio;
        }
      },
      {
        threshold: myArray(),
      },
      { root: null }
    );
    projectObserver.observe(document.getElementById("ProjectId"));
  }, []);

  useEffect(() => {
    if (ctx.animationOverride) {
      projectObserver.disconnect();
    }
  }, [ctx.animationOverride]);

  const projects = useMemo(() => {
    return [
      {
        image: [deepLearn],
        title: ["Deep Learning Failure Classifier: 2022"],
        description: [
          <>
            <p>
              <span className={classes.subheader}>Assessed Issue</span>:
              Significant delays and costs associated with contracting capital
              intensive 3rd-Party vendors to interpret and classify technician
              comments into features (asset, part, failure mode, repair type and
              damage mode).
            </p>
            <p>
              <span className={classes.subheader}>Proposed Solution</span>:
              Identified potential for NLP deep learning neural network to
              assist in the classification of records based on textual comment
              features. Created a pipeline and trained a model using pytorch,
              achieving a multi-classification performance accuracy of 88%.
            </p>
            <p>
              <span className={classes.subheader}>Achievement</span>: Alleviated
              organizational reliance on third party contracts interpreting ~80%
              of work order classifications and saving $80,000/yr
            </p>
            <p>
              <span className={classes.subheader}>Required</span>:
              Python-Sklearn, R, SQL
            </p>
          </>,
        ],
      },
      {
        image: [heaterHome, heaterTech],
        title: ["Work Management Dashboard: 2021"],
        description: [
          <>
            <p>
              <span className={classes.subheader}>Assessed Issue</span>: Poor
              heater inspection compliance often due to innacurate or absent
              data. Furthermore, a lack of monitoring due to hesistancy towards
              the tedious and difficult task of data extraction and analysis.
            </p>
            <p>
              <span className={classes.subheader}>Proposed Solution</span>:
              Identified pathways for the automated extraction of SAP data using
              SQL. Leveraging this data a dashboard was created to monitor
              technician/ equipment performance and to promote early
              intervention preventative maintenance.
            </p>
            <p>
              <span className={classes.subheader}>Achievement</span>: Created a
              cultural shift in mindset towards data, improved its quality and
              resulted in identification of 5 employees actively ignoring
              responsibilities.
            </p>
            <p>
              <span className={classes.subheader}>Required</span>: Python, SQL,
              PowerBi
            </p>
          </>,
          <>
            <p>
              Depicts the lowest compliance technicians with regard to
              inspection data entry compliance.
            </p>
            <p>
              Displays, a feature flag table used to identify potentially
              indicative trends of readings outside expected ranges for early
              intervention.
            </p>
          </>,
        ],
      },
      {
        title: ["Project Management App: 2018/19"],
        image: [
          AMPVBA,
          Home,
          UI,
          UpdateForm,
          UpdateRequest,
          RemovalForm,
          RemovalRequest,
        ],
        description: [
          <>
            <p>
              <span className={classes.subheader}>Assessed Issue</span>:
              Dissatisfaction with in place asset management solution.
              Identified causes as an overreliance on meetings, lack of approval
              process, inconsistencies in data, and ad-hoc capital estimation
              strategies.
            </p>
            <p>
              <span className={classes.subheader}>Proposed Solution</span>:
              Developed a conceptual wire frame to address concerns. Obtained
              management approval, and produced a self-service GUI submission
              tool implementing a machine learning algorithm to provide initial
              spend profile predictions for projects based on historical trends.
            </p>
            <p>
              <span className={classes.subheader}>Achievement</span>: Exceeded
              KPI expectations saving 200 hours/yr. and resulting in the best
              capital forecast accuracy amongst all company business units.
            </p>
            <p>
              <span className={classes.subheader}>Required</span>:
              Python-Tensorflow, VBA
            </p>
          </>,
          <>
            <p>
              Displayed are project submissions to the 10 year Asset Management
              Plan Tracking file spanning 2020-2030.
            </p>
            <p>
              <span className={classes.subheader}>Stage 1: GUI</span>, focused
              on providing an end user interfacing tool addressing process
              related concerns. Initated by interacting with the "Lets Get
              Started" prompt.
            </p>
            <p>
              <span className={classes.subheader}>
                Stage 2: ML Project Estimations
              </span>
              , Depicted in the year columns are predictions generated by the
              random forest regressive machine learning model. The algorithm was
              trained with previous year actuals vs. plan values and project
              categorizational features. Training, involved the creation of a
              data pipeline facilitating preprocessing, data splitting and cross
              validation.
            </p>
          </>,
          <>
            <p>
              <span className={classes.subheader}>Menu: </span>When the "Lets
              Get Started" button is clicked users are faced with the following
              window.
            </p>
            <p>
              <span className={classes.subheader}>User Page</span>: User selects
              whether to sumbit an Add, Update or Remove request for a project.
            </p>
            <p>
              <span className={classes.subheader}>Manager Review</span>:
              Requires reviewer password and allows managers to view all
              submitted forms. The centralization of communication via forms
              eliminated information loss via emails and nearly two months worth
              of daily 8 hour meetings for the reveiew of submissions aligning
              categorizations, risk values, formatting.
            </p>
          </>,
          <>
            <p>
              <span className={classes.subheader}>Update Form</span>: This is a
              form tool allowing users to sumbit a PUT request to alter a
              projects categorizations, assessed risk and spend profiles.
            </p>
            <p>
              <span className={classes.subheader}>Dropdowns</span>: Users must
              select from limited selection auto-filtering dropdowns. This was
              chosen to reduce variability and standardize values found in
              fields.
            </p>
            <p>
              <span className={classes.subheader}>View Matrix</span>: This
              button directs users to a graphical risk matrix. The purpose of
              this view is to improve risk evaluation standard clarity.
            </p>
          </>,
          <>
            <p>
              <span className={classes.subheader}>Update Request Page</span>:
              This is a project submission made for an update operation all
              tabular values which have been altered appear in red and yellow
              and changes to ML model predicted values appear in red.
            </p>
            <p>
              <span className={classes.subheader}>Manager Review,</span>
              This page can only be accessed with the entry of a Manager Review
              Passcode on the initial menu. On review an email can be
              automatically sent specifying the reviewers decision.
            </p>
          </>,
          <>
            <p>
              <span className={classes.subheader}>Project Removal Form</span>{" "}
              This form is used to facilitate project removal requests.
            </p>
          </>,
          <>
            <p>
              <span className={classes.subheader}>Removal Request Page</span>:
              Analagous to the update page managers can review removal requests.
              Upon approval or denial an email is automatically triggered and
              drafted on behalf of the reviewer.
            </p>
          </>,
        ],
      },
    ];
  }, []);

  const overlayHandler = (src) => {
    setMaximize(src);
  };

  const collapseHandler = (event) => {
    setMaximize(null);
  };
  return (
    <div
      id="Projects"
      className={classes.container}
      onMouseEnter={() => {
        ctx.setActivePage("Projects");
      }}
    >
      <div className={classes.headerContainer}>
        <h2 className={classes.header}>Professional Projects</h2>
        <p>{`Scroll >`}</p>
      </div>

      <div className={classes.section}>
        {maximize !== null && (
          <div className={classes.overlay}>
            <Expand
              className={classes.collapse}
              Expand={false}
              onClick={collapseHandler}
            />
            <img alt="professional project" src={maximize} loading="lazy"></img>
          </div>
        )}
        <AcordianProject
          Id="ProjectId"
          fullScreen={overlayHandler}
          projects={projects}
        />
      </div>
    </div>
  );
}
export default react.memo(Projects);
