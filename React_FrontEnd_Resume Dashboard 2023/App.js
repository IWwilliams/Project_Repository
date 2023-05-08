import NavBar from "./Components/NavBar/Navbar";
import classes from "./App.module.css";
import Content from "./Content/Content";
import react, { useEffect, useState } from "react";
import Context from "./Context/Context";
import classes2 from "./UI/AcordianProject/Project.module.css";

let lastWindowSize = window.innerWidth;
let doit;
function App() {
  const [hideNav, setHideNav] = useState({ caller: null, value: true });
  const [activePage, setActivePage] = useState("Home-Video");
  const [animationOverride, setAnimationOverride] = useState(false);

  async function waitForElement(selector, caller = undefined, timeout = 2000) {
    const start = Date.now();

    while (Date.now() - start < timeout) {
      const el = document.getElementById(selector);
      if (el) {
        if (caller) {
          el.scrollIntoView({ alignToTop: true, behavior: "smooth" });
        }
        return true;
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    return false;
  }

  const classSetter = (hideNav) => {
    if (window.innerWidth < 700) {
      if (hideNav.caller === null || hideNav.caller === "master") {
        return "hidden";
      } else if (hideNav.caller === "menu") {
        return hideNav.value ? "hidden" : "visible";
      }
    } else {
      return hideNav.value ? "hidden" : "visible";
    }
  };

  const reCalcParagraph = (arg) => {
    if (arg === undefined) {
      var ele = document.getElementsByClassName(classes2.textContainer);
      let original = 1.2;
      for (var i = 0; i < ele.length; i++) {
        ele[i].style.fontSize = `${original}rem`;
      }
      let c = 0;
      while (c < ele.length) {
        ele[c].style.fontSize = `${original}rem`;
        if (ele[c].scrollHeight > ele[c].clientHeight) {
          original = original - 0.1;
          if (original < 0.2) {
            original = 1.2;
            c++;
          }
        } else {
          c++;
        }
      }
    } else {
      var ele = document.getElementById(arg);
      let original = 1.2;
      ele.style.fontSize = `${original}rem`;
      if (!(ele.scrollHeight > ele.clientHeight)) {
        original = 1.2;
      }
      while (true) {
        ele.style.fontSize = `${original}rem`;
        if (ele.scrollHeight > ele.clientHeight) {
          original = original - 0.01;
        } else {
          break;
        }
        if (original < 0.1) {
          break;
        }
      }
    }
  };

  function resize() {
    if ((window.innerWidth < 700) & (lastWindowSize > 700)) {
      setHideNav({ caller: "master", value: true });
    } else if ((window.innerWidth > 700) & (lastWindowSize < 700)) {
      setHideNav({ caller: "master", value: false });
    }
    lastWindowSize = window.innerWidth;
    clearTimeout(doit);
    doit = setTimeout(() => {
      reCalcParagraph();
    }, 100);
  }

  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div className={classes.app}>
        <Context.Provider
          value={{
            hideNav,
            setHideNav,
            activePage,
            setActivePage,
            classSetter,
            reCalcParagraph,
            animationOverride,
            setAnimationOverride,
            waitForElement,
          }}
        >
          <NavBar></NavBar>
          <div className={classes.Home}>
            <div
              id="Home-Nav"
              className={`${classes["Home-Nav"]} ${
                classes[classSetter(hideNav)]
              }`}
            ></div>
            <Content className={classes.content}></Content>
          </div>
        </Context.Provider>
      </div>
    </>
  );
}

export default react.memo(App);
