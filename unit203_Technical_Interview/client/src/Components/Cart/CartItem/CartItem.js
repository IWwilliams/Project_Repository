import react from "react";
import classes from "./CartItem.module.css";
import { BLUE, ESTIMATED_DELIVERY } from "../../../App";
import Swatch from "./Swatch";

function CartItem(props) {
  return (
    <div className={classes.gridContainer}>
      <div className={`${classes.gridItem1}`}>
        <img src={props.item.image} className={`${classes.image}`} />
      </div>

      <h4
        className={`${classes.productTitle}  ${classes.gridItem2}`}
        style={{ color: BLUE }}
      >{`${props.item.title} / Without Ottoman / ${props.item.quantity}`}</h4>
      <div
        className={`${classes.price}  ${classes.gridItem3}`}
      >{`$${props.item.price}`}</div>

      <Swatch
        className={`${classes.gridItem} ${classes.gridItem4}`}
        swatchColor={props.item.swatchColor}
        swatchTitle={props.item.swatchTitle}
      />

      <div
        className={`${classes.deliveryDate}  ${classes.gridItem5}`}
      >{`Estimated Delivery Date: ${
        props.item.estimatedDeliveryDate
          ? props.item.estimatedDeliveryDate
          : ESTIMATED_DELIVERY
      }`}</div>

      <div
        className={`${classes.removeButton} ${classes.gridItem6}`}
        onClick={() => {
          props.removeLineItem(props.item.id);
        }}
      >
        Remove
      </div>
    </div>
  );
}
export default react.memo(CartItem);
