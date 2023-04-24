import classes from "./Content.module.css";
import MenuButton from "../UI/MenuButton/MenuButton";
import Context from "../Context/Context";
import react, { useContext, useEffect, lazy, Suspense, useState } from "react";
import useObserver from "../Objects/useObserver";
const Resume = lazy(() => import("../Components/Resume/Resume"));
const VideoPage = lazy(() => import("../Components/VideoPage/VideoPage"));
const Dashboard = lazy(() => import("../Components/Dashboard/Dashboard"));
const Projects = lazy(() => import("../Components/Projects/Projects"));
const Academic = lazy(() => import("../Components/Academic/Academic"));
const Contact = lazy(() => import("../Components/Contact/Contact"));
var pageObserver;
function Content(props) {
  const ctx = useContext(Context);
  const [createObserver] = useObserver();
  const [dashboard, setDashboard] = useState(false);
  const [projects, setProjects] = useState(false);
  const [academic, setAcademic] = useState(false);
  const [resume, setResume] = useState(false);
  const [contact, setContact] = useState(false);
  useEffect(() => {
    pageObserver = createObserver({
      reactionFunction: function (entries) {
        if (entries[0].intersectionRatio > 0.1) {
          if (entries[0].target.id === "Home-Video") {
            setDashboard(true);
            pageObserver.unobserve(document.getElementById("Home-Video"));
          } else if (entries[0].target.id === "Dashboard") {
            setProjects(true);
            pageObserver.unobserve(document.getElementById("Dashboard"));
          } else if (entries[0].target.id === "Projects") {
            setAcademic(true);
            pageObserver.unobserve(document.getElementById("Projects"));
          } else if (entries[0].target.id === "Academic") {
            setResume(true);
            pageObserver.unobserve(document.getElementById("Academic"));
          } else if (entries[0].target.id === "Resume") {
            setContact(true);
            pageObserver.unobserve(document.getElementById("Resume"));
          }
        }
      },
      threshold: 0.1,
      root: null,
    });
    pageObserver.observe(document.getElementById("Home-Video"));
  }, []);

  // useEffect(() => {
  //   if (ctx.animationOverride) {
  //     pageObserver.disconnect();
  //   }
  // }, [ctx.animationOverride]);

  const menuClickHandler = (event) => {
    ctx.setHideNav((lastVal) => {
      return { caller: "menu", value: !lastVal.value };
    });
  };

  return (
    <main className={`${props.className} ${classes.content}`}>
      <MenuButton
        onClick={menuClickHandler}
        className={`${classes.menuButton} ${
          classes[ctx.classSetter(ctx.hideNav)]
        }`}
      ></MenuButton>
      <VideoPage />
      {(dashboard || ctx.animationOverride) && (
        <Suspense fallback={<div>Loading</div>}>
          <Dashboard contentObserver={pageObserver} />
        </Suspense>
      )}
      {(projects || ctx.animationOverride) && (
        <Suspense fallback={<div>Loading</div>}>
          <Projects contentObserver={pageObserver} />
        </Suspense>
      )}
      {(academic || ctx.animationOverride) && (
        <Suspense fallback={<div>Loading</div>}>
          <Academic contentObserver={pageObserver} />
        </Suspense>
      )}
      {(resume || ctx.animationOverride) && (
        <Suspense fallback={<div>Loading</div>}>
          <Resume contentObserver={pageObserver} />
        </Suspense>
      )}
      {(contact || ctx.animationOverride) && (
        <Suspense fallback={<div>Loading</div>}>
          <Contact contentObserver={pageObserver} />
        </Suspense>
      )}
    </main>
  );
}
export default react.memo(Content);
