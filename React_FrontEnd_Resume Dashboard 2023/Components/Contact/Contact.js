import classes from "./Contact.module.css";
import Context from "../../Context/Context";
import react, { useContext, useEffect } from "react";
import Card from "../../UI/Card/Card";
import me from "./beach.jpeg";
import EmailFormTool from "../../UI/EmailForm/EmailFormTool";
function Contact(props) {
  const ctx = useContext(Context);
  useEffect(() => {
    !ctx.animationOverride &&
      props.contentObserver.observe(document.getElementById("Contact"));
  }, []);
  return (
    <div
      id="Contact"
      className={classes.container}
      onMouseEnter={() => {
        ctx.setActivePage("Contact");
      }}
    >
      <h2 className={classes.header}>Contact</h2>
      <Card className={classes["Contact-card"]}>
        <section className={classes["section"]}>
          <div className={classes.column}>
            <div className={classes.imageContainer}>
              <img alt="self-portrait" src={me}></img>
            </div>
            <div className={classes.infoContainer}>
              <h3>Contact Information</h3>
              <div className={classes.infoWrapper}>
                <div className={classes.contactSection}>
                  <h5>Phone:</h5>
                  <h6>403-827-7215</h6>
                </div>
                <div className={classes.contactSection}>
                  <h5>Email:</h5>
                  <h6>isaiah.williams@ucalgary.ca</h6>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.column2}>
            <EmailFormTool></EmailFormTool>
          </div>
        </section>
      </Card>
    </div>
  );
}
export default react.memo(Contact);
