import classes from "./Resume.module.css";
import Card from "../../UI/Card/Card";
import Context from "../../Context/Context";
import react, { useEffect, useContext, useState } from "react";
import Toolbar from "../../UI/Toolbar/Toolbar";
import page1 from "./CV_Isaiah_Williams-1.webp";
import page2 from "./CV_Isaiah_Williams-2.webp";
import page1Alt from "./CV_Isaiah_Williams-1.jpg";
import page2Alt from "./CV_Isaiah_Williams-2.jpg";
function Resume(props) {
  const ctx = useContext(Context);
  const [pointer, setPointer] = useState(false);
  let timer = null;
  const [zoom, setZoom] = useState(80);
  useEffect(() => {
    props.contentObserver.observe(document.getElementById("Resume"));
  }, []);
  const resume = [
    { id: "page1", image: page1, alt: page1Alt },
    { id: "page2", image: page2, alt: page2Alt },
  ];

  const zoomHandler = (indicator) => {
    if (indicator > 0) {
      if (zoom <= 100) {
        setZoom(zoom + indicator);
        return;
      }
    } else if (indicator < 0) {
      if (zoom >= 0) {
        setZoom(zoom + indicator);
        return;
      }
    }
  };

  if ((window.innerWidth < 400) & !pointer) {
    setPointer(true);
  }

  return (
    <div
      id="Resume"
      className={classes.container}
      onMouseEnter={() => {
        ctx.setActivePage("Resume");
      }}
    >
      <h2 className={classes.header}>Resume</h2>
      <Toolbar className={classes.toolBarContainer} onZoom={zoomHandler} />
      <Card className={classes["Resume-card"]}>
        <section
          className={classes["section"]}
          onMouseEnter={() => {
            timer = setTimeout(() => {
              setPointer(true);
            }, [100]);
          }}
          onMouseLeave={() => {
            clearTimeout(timer);
            setPointer(false);
          }}
        >
          <div
            className={`${classes["pageContainer"]} ${
              !pointer && classes["pointerEventOff"]
            }`}
          >
            {resume.map((pages) => {
              return (
                <div
                  key={pages.id}
                  className={classes.page}
                  style={{
                    minWidth: `${zoom}%`,
                    width: `${zoom}%`,
                    maxWidth: `${zoom}%`,
                  }}
                >
                  <picture
                    key={`${pages.id}_picture`}
                    className={classes.picture}
                  >
                    <source
                      key={`${pages.id}_source`}
                      srcSet={pages.image}
                      type="image/webp"
                    />
                    <img
                      key={`${pages.id}_image`}
                      className={classes.image}
                      src={pages.alt}
                      alt="Resume"
                      loading="lazy"
                    ></img>
                  </picture>
                </div>
              );
            })}
          </div>
        </section>
      </Card>
    </div>
  );
}
export default react.memo(Resume);
