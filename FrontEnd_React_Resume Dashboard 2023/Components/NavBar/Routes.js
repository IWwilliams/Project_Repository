import classes from "./routes.module.css";
import Button from "../../UI/Button/Button";
import Context from "../../Context/Context";
import { useContext } from "react";

function Routes() {
  const ctx = useContext(Context);

  const buttonClickHandler = (ids) => {
    ctx.setAnimationOverride(true);
    if (ctx.waitForElement(ids, true)) {
      ctx.setActivePage(ids);
    }
  };

  const highlightRoute = (id) => {
    return ctx.activePage === id && classes["activePage"];
  };

  return (
    <div className={classes.routes}>
      <Button
        ids={"Home-Video"}
        onClick={buttonClickHandler}
        className={`${classes.Button} ${highlightRoute("Home-Video")}`}
      >
        <div className={`${classes["img-icon"]}`}>
          <div className={`${classes["gg-home"]}`}></div>
        </div>
        <h2>Home</h2>
      </Button>
      <Button
        ids="Dashboard"
        onClick={buttonClickHandler}
        className={`${classes.Button} ${highlightRoute("Dashboard")}`}
        onMouseEnter={() => {
          ctx.setAnimationOverride(true);
        }}
      >
        <div className={`${classes["img-icon"]}`}>
          <div className={`${classes["gg-notes"]}`}></div>
        </div>
        <h2>Dashboard</h2>
      </Button>
      <Button
        ids="Projects"
        onClick={buttonClickHandler}
        className={`${classes.Button} ${highlightRoute("Projects")}`}
      >
        <div className={`${classes["img-icon"]}`}>
          <div className={`${classes["gg-list-tree"]}`}></div>
        </div>
        <h2>Projects</h2>
      </Button>
      <Button
        ids="Academic"
        onClick={buttonClickHandler}
        className={`${classes.Button} ${highlightRoute("Academic")}`}
      >
        <div className={`${classes["img-icon"]}`}>
          <div className={`${classes["gg-toolbox"]}`}></div>
        </div>
        <h2>Academic</h2>
      </Button>
      <Button
        ids={"Resume"}
        onClick={buttonClickHandler}
        className={`${classes.Button} ${highlightRoute("Resume")}`}
      >
        <div className={`${classes["img-icon"]}`}>
          <div className={`${classes["gg-user"]}`}></div>
        </div>
        <h2>Resume</h2>
      </Button>
      <Button
        ids={"Contact"}
        onClick={buttonClickHandler}
        className={`${classes.Button} ${highlightRoute("Contact")}`}
      >
        <div className={`${classes["img-icon"]}`}>
          <div className={`${classes["gg-toolbox"]}`}></div>
        </div>
        <h2>Contact</h2>
      </Button>
    </div>
  );
}
export default Routes;
