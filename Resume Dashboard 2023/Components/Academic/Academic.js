import classes from "./Academic.module.css";
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
//MusicClassifier
import MusicClassifier from "./MusicClassifier/MusicClassifier.jpg";
import mel_spectrograph from "./MusicClassifier/mel_spectrograph.jpg";
import pytorchcode from "./MusicClassifier/pytorchcode.jpg";
//MovieProject
import Showtimes from "./MovieProject/ShowTimes.png";
import TicketPurchase from "./MovieProject/TicketPurchase.png";
import Database from "./MovieProject/Database.png";
import Springboot from "./MovieProject/Springboot2.png";

//Deep Learning
import analytics from "./EconomicAnalytics/analytics.png";
import Profession from "./EconomicAnalytics/Profession.png";
import Tech from "./EconomicAnalytics/Tech.png";
var projectObserver;
var maxLeftScroll;
var max;
function Academic(props) {
  const ctx = useContext(Context);
  const [maximize, setMaximize] = useState(null);

  const myArray = useCallback(() => {
    var i = 0;
    var myArray = [];
    while (i + 0.01 < 1) {
      i = i + 0.01;
      myArray.push(i);
    }
    return myArray;
  }, []);

  useEffect(() => {
    props.contentObserver.observe(document.getElementById("Academic"));
    document.getElementById("AcademicId").scrollLeft = 1000;
    maxLeftScroll = document.getElementById("AcademicId").scrollLeft;
    document.getElementById("AcademicId").scrollLeft = 0;
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
          document.getElementById("AcademicId").scrollLeft =
            maxLeftScroll * entries[0].intersectionRatio;
        }
      },
      {
        threshold: myArray(),
      },
      { root: null }
    );
    projectObserver.observe(document.getElementById("AcademicId"));
  }, []);

  useEffect(() => {
    if (ctx.animationOverride) {
      projectObserver.disconnect();
    }
  }, [ctx.animationOverride]);

  const projects = useMemo(() => {
    return [
      {
        image: [MusicClassifier, mel_spectrograph, pytorchcode],
        title: ["Deep Learning Music Classifier: 2023"],
        description: [
          <>
            <p>
              <span className={classes.subheader}>Group Project</span>: I
              possess a passion for music and prior experience in image
              classification. I wanted to combine these two facets of my life
              into the creation of a deep learning neural network geared towards
              audio data.
            </p>
            <p>
              <span className={classes.subheader}>Implementation</span>:
              Developed using a CNN model alongside PyTorch-torchaudio. The
              network determines audio genres based on the waveform and
              spectrograph profiles of songs.
            </p>
            <p>
              <span className={classes.subheader}>Achievement</span>: A grade of
              100% was earned on the project.
            </p>
            <p>
              <span className={classes.subheader}>Required</span>:
              Python-PyTorch
            </p>
          </>,
          <>
            <p>
              <span className={classes.subheader}>Data Pre-Processing</span>:
              Facilitated sample rate selection, audio file uniformity, label
              encoding and MelSpectrogram conversion. Depicted is the
              visualization of a MelSpectrogram.
            </p>
          </>,
          <>
            <p>
              <span className={classes.subheader}>Deep Learning</span>:
              Implemented a 4 stage CNN to the audio data culminating in a
              softmax activation. Optimized neural network using a scheduler
              implementing a SGD learning rate optomizer. Depicted is the CNN
              declaration and model application to training data.
            </p>
          </>,
        ],
      },
      {
        image: [Showtimes, TicketPurchase, Database, Springboot],
        title: ["Full Stack Development: 2022"],
        description: [
          <>
            <p>
              <span className={classes.subheader}>Group Project</span>: Created
              a movie theater webpage facilitating registered and non-registered
              user access, seat selection, ticket purchase and confirmation
              emailing.
            </p>
            <p>
              <span className={classes.subheader}>Role</span>: Acted as group
              lead delegating workloads. Personally responsible for database
              design and Spring Boot backend implementation. In addition to my
              responsibilities, I assisted with challenges faced by peers on the
              React frontend. Involved gaining familiarity with React in less
              than 5 hours, teaching my group members debugging principles and
              assisting on ~70% of front end development.
            </p>
            <p>
              <span className={classes.subheader}>Achievement</span>: A grade of
              100% was earned on the project.
            </p>
            <p>
              <span className={classes.subheader}>Required</span>:
              JavaScript-React, Java-Spring Boot, SQL
            </p>
          </>,
          <>
            <p>
              This image display a seat grid for the movie How To Train Your
              Dragon's, first showtime availability. The interface visually and
              linguistically depicts seats with a status of taken or available.
              Below this grid a sample ticket is rendered displaying the users
              selection.
            </p>
            <p>
              <span className={classes.subheader}>Role</span>: I was responsible
              for backend development on this project. However, due to time
              constraints and necessity; I learned react and helped to assist my
              peers in circumventing fault points and developing this simple
              functional interface in 24 hours.
            </p>
            <p>
              <span className={classes.subheader}>Required</span>:
              JavaScript-React
            </p>
          </>,
          <>
            <p>
              <span className={classes.subheader}>Role</span>: Defined and
              developed backend database achitecture to meet project
              specifications.
            </p>
            <p>
              <span className={classes.subheader}>Description</span>: The
              relationships devised are a theaters table joined with a one to
              many relationship to movies. Thereby joined with a one to many
              relationship to showtimes, which is connected in the same manner
              to tickets. In parallel to this, a customer table was defined and
              on purchase joined to the ticket table using a one to many
              relationship.
            </p>

            <p>
              <span className={classes.subheader}>Required</span>: SQL
            </p>
          </>,
          <>
            <p>
              <span className={classes.subheader}>Role</span>: Development of
              the entirety of the Springboot backend architecture for this
              project.
            </p>
            <p>
              <span className={classes.subheader}>Description</span>: Depicted
              in the image is a subset of the backend respective to the ticket
              entity handling PUT, PATCH, and GET requests to the database. The
              image displays the ticket entity defintion, the tickets api
              controller and a defined ticket respository.
            </p>

            <p>
              <span className={classes.subheader}>Required</span>: Java-Spring
              Boot
            </p>
          </>,
        ],
      },
      {
        image: [analytics, Tech, Profession],
        title: ["Economic Data Analytics: 2022"],
        description: [
          <>
            <p>
              <span className={classes.subheader}>Group Project</span>: The
              concept for this project was derived from a conversation regarding
              economic outlooks for the information sector in Canada. Focusing
              on what was perceived as an apparent lack of consolidated credible
              data for job opportunities and earning potentials; relying instead
              on subjective sources like payscale.com. The conversation
              culminated in the concept for our project, to consolidate and
              report verified economic data.
            </p>
            <p>
              <span className={classes.subheader}>Role</span>: Responsible for
              data querying, engineering, analysis and visualization. Partner
              responsible for UI.
            </p>
            <p>
              <span className={classes.subheader}>Achievement</span>: Earned a
              grade of 100% and received praise on usefullness of the
              information conveyed; selected to present to the entire class.
            </p>
            <p>
              <span className={classes.subheader}>Required</span>: Python, R
            </p>
          </>,
          <>
            <p>
              <span className={classes.subheader}>Source</span>: Statistics
              Canada census
            </p>
            <p>
              <span className={classes.subheader}>Description</span>: This image
              displays the results of a user selection for IT/ Information
              sector economic data irrespective of province and year.
            </p>
            <p>
              <span className={classes.subheader}>Table 1</span>: Displays
              relative salary disparity between the industry average for IT and
              the average IT salary in a given province by year.
            </p>
            <p>
              <span className={classes.subheader}>Table 2</span>: Depicts the
              min and max salary disparities between the industry average and
              salary offered in each province.
            </p>
            <p>
              <span className={classes.subheader}>Table 3</span>: This table
              displays selected sector growth rates by province and year.
            </p>
          </>,
          <>
            <p>
              This image displays the results of a general statistics selection
              by the user. Providing insights across all provinces sectors and
              years.
            </p>
            <p>
              <span className={classes.subheader}>Table 1</span>: Displays top
              10 highest earning sectors based on 10 year average with respect
              to province. Provides users insight into the top earning sectors
              in their current province.
            </p>
            <p>
              <span className={classes.subheader}>Table 2</span>: Depicts the
              sector earning averages by year. Allowing the end user to compare
              sectors for on average profitability by year in Canada.
            </p>
            <p>
              <span className={classes.subheader}>Table 3</span>: This table
              displays unemployment rates by province organized from highest to
              lowest rate.
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
      id="Academic"
      className={classes.container}
      onMouseEnter={() => {
        ctx.setActivePage("Academic");
      }}
    >
      <div className={classes.headerContainer}>
        <h2 className={classes.header}>Academic Projects</h2>
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
            <img alt="academic project" src={maximize} loading="lazy"></img>
          </div>
        )}
        <AcordianProject
          Id="AcademicId"
          fullScreen={overlayHandler}
          projects={projects}
        />
      </div>
    </div>
  );
}
export default react.memo(Academic);
