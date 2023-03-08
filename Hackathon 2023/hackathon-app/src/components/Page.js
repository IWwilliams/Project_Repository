import classes from "./Page.module.css";
import NavBar from "../layout/NavBar";

const Page = (props) => {
  return (
    <div className={classes.page}>
      {props.show !== false && <NavBar />}
      {props.children}
    </div>
  );
};

export default Page;
