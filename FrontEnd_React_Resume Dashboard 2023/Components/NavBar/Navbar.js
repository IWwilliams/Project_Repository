import classes from "./navbar.module.css";
import LinkedIn from "../../UI/Logo/LinkedIn";
import Routes from "./Routes";
import Context from "../../Context/Context";
import GitHub from "./GitHub.svg";
import { useContext } from "react";
function NavBar(props) {
  const ctx = useContext(Context);
  const goToMail = () => {
    ctx.setAnimationOverride(true);
    if (ctx.waitForElement("Contact", true)) {
      ctx.setActivePage("Contact");
    }
  };
  return (
    <div
      className={`${classes.navbar} ${classes[ctx.classSetter(ctx.hideNav)]}`}
    >
      <div className={classes.imageContainer}>
        <img alt="me nav logo" src={require("./logo.jpg")} />
      </div>
      <div className={classes.links}>
        {/* <a target="_blank" href="https://www.instagram.com/notisahwlms_/">
          <div className={`${classes["gg-instagram"]}`}></div>
        </a> */}
        <a
          target="_blank"
          href="https://www.linkedin.com/in/isaiah-williams-8441a4155/"
          aria-label="LinkedIn"
        >
          <LinkedIn className={`${classes["gg-linkedin"]}`} />
        </a>
        <div className={classes.spacer}></div>
        <div className={classes.mailContainer} onClick={goToMail}>
          <div className={`${classes["gg-mail"]}`}>
            <div className={classes.leftline}></div>
            <div className={classes.rightline}></div>
          </div>
        </div>
        <div className={classes.spacer}></div>
        <a
          target="_blank"
          href="https://github.com/IWwilliams/Project_Repository.git"
          aria-label="GitHub"
        >
          <div className={classes.gitContainer}>
            <div className={classes.github}>
              <img
                alt="github logo"
                src={GitHub}
                className={classes.github2}
              ></img>
            </div>
          </div>
        </a>
      </div>

      <Routes></Routes>
      <div className={classes.trademark}>
        <p>Proprietary Code and Design</p>
        <p>By Isaiah Williams</p>
      </div>
    </div>
  );
}
export default NavBar;
