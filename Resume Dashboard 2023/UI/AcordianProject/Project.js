import classes from "./Project.module.css";
import Card from "../Card/Card";
import react, { useContext, useEffect, useState } from "react";
import Expand from "../Expand/Expand";
import Context from "../../Context/Context";
function Project(props) {
  const [ImageIndex, setImageIndex] = useState(0);
  const ctx = useContext(Context);
  const sliderSelector = (event) => {
    setImageIndex(+event.target.id);
  };

  useEffect(() => {
    ctx.reCalcParagraph(`text${props.project.title}`);
  }, [ImageIndex]);

  const circles = () => {
    let i = -1;
    return props.project.image.map((selection) => {
      i++;
      return (
        <div
          className={classes.circleContainer}
          id={i}
          key={"container" + i}
          onClick={sliderSelector}
        >
          <div
            className={`${classes.circle} ${
              i === ImageIndex && classes.filled
            }`}
            id={i}
            key={"circle" + i}
            onClick={sliderSelector}
          ></div>
        </div>
      );
    });
  };

  const expandHandler = (event) => {
    props.fullScreen(props.project.image[ImageIndex]);
  };

  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card}>
        <Expand
          className={classes.expand}
          expand={true}
          onClick={expandHandler}
        />
        <div className={classes.cardContent}>
          <div className={classes.image}>
            <img src={props.project.image[ImageIndex]} alt="project"></img>
          </div>
          <div className={classes.projectNameContainer}>
            <div className={classes.projectName}>{props.project.title}</div>
          </div>
          <div className={classes.descSlider}>
            <div className={classes.description}>
              <div
                id={`text${props.project.title}`}
                className={classes.textContainer}
              >
                {props.project.description[ImageIndex]}
              </div>
            </div>
            <div className={classes.slider}>{circles()}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
export default react.memo(Project);
