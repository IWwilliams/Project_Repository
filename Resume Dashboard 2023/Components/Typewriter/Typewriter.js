import classes from "../Typewriter/typewriter.module.css";
import { useEffect, useState } from "react";
function Typewriter(props) {
  const [desciptionIndex, setDesciptionIndex] = useState(0);
  const descriptorList = [
    "Developed a deep learning natural language model saving $80,000 per year",
    "Leading development of a full-stack web application using React.js and Node.js",
    "Implemented process optimizations saving 3200 hours per year",
    "Proficient in AGILE Scrum project management",
    "Posseses a Master's in Software Engineering and a Bachelor's in Chemical Engineering",
    "Excellent at database design, querying, processing and visualization",
    "Proficient with ER, use case, scenario, state transition, activity and prototype wireframe diagrams",
    "Prides himself on developing impactful, aesthetic, and functional web applications",
  ];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(async () => {
      setLoading(false);
      setDesciptionIndex((old) => {
        return (old + 1) % descriptorList.length;
      });
    }, 3800);
    return () => clearTimeout(timer);
  }, [desciptionIndex]);

  return (
    <div className={`${classes.container} ${classes[props.className]}`}>
      <h1 className={`${classes.name}`}>Isaiah Williams</h1>
      {loading && (
        <div
          id="writer"
          className={`${classes.achievement} ${classes.phaseIn}`}
        >
          {descriptorList[desciptionIndex]}
        </div>
      )}
      <span></span>
    </div>
  );
}
export default Typewriter;
