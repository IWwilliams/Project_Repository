import classes from "./CartTotal.module.css";
import { CartObject, BLUE } from "../../../App";
function CartTotal(props) {
  let shipping = 0;
  let subtotal = 0;
  let tax = 0;
  let total = 0;
  const taxRate = 0.13;

  const calculateFees = () => {
    props.lineItems.map((item) => {
      subtotal += item.price * item.quantity;
    });
    tax = subtotal * taxRate;
    shipping = 15;
    total = subtotal + tax + shipping;
  };

  calculateFees();

  return (
    <div className={classes.gridContainer}>
      <div className={classes.gridItemLeft}>Subtotal</div>
      <div className={classes.gridItemRight}>{`$${subtotal.toFixed(2)}`}</div>
      <div className={classes.gridItemLeft}>Taxes (estimated)</div>
      <div className={classes.gridItemRight}>{`$${tax.toFixed(2)}`}</div>
      <div className={classes.gridItemLeft}>Shipping</div>
      <div className={classes.gridItemRight}>{`$${shipping}`}</div>
      <div
        style={{ color: BLUE, fontWeight: "bold" }}
        className={classes.gridItemLeft}
      >
        Total
      </div>
      <div
        style={{ color: BLUE, fontWeight: "bold" }}
        className={classes.gridItemRight}
      >{`$${total.toFixed(2)}`}</div>
    </div>
  );
}
export default CartTotal;
