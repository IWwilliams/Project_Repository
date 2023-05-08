import react, { useEffect, useState } from "react";
import classes from "./Cart.module.css";
import { BLUE } from "../../App";
import CartItem from "./CartItem/CartItem";
import CartTotal from "./CartTotal/CartTotal";
import DropDown from "../../UI/DropDown";
import PostalCode from "./PostalCode/PostalCode";
function Cart(props) {
  const [lineItems, setLineItems] = useState([]);

  useEffect(() => {
    const results = props.lineItems.filter((x) =>
      lineItems.some((y) => +x.id === +y.id)
    );
    results.length
      ? setLineItems([...results])
      : setLineItems([...props.lineItems]);
  }, [props.lineItems]);

  const removeLineItem = (lineItemId) => {
    setLineItems((prev) => {
      const removedItemIndex = prev.findIndex((item) => item.id === lineItemId);
      if (prev[removedItemIndex].quantity > 1) {
        prev[removedItemIndex].quantity -= 1;
      } else {
        prev.splice(removedItemIndex, 1);
      }
      return [...prev];
    });
  };

  const addLineItem = (lineItem) => {
    const itemId = lineItem.target.id.replace("item: ", "");
    setLineItems((prev) => {
      const itemIndex = prev.findIndex((item) => item.id === +itemId);
      if (itemIndex !== -1) {
        prev[itemIndex].quantity += 1;
      } else {
        prev.push(props.lineItems.filter((item) => +item.id === +itemId)[0]);
      }
      return [...prev];
    });
  };

  return (
    <div className={classes.cart}>
      <div className={classes.header}>
        <h2 style={{ color: BLUE }}>Your Cart</h2>
        <div className={classes.addToCartForm}>
          <DropDown onClick={addLineItem} options={props.lineItems} />
        </div>
      </div>

      <div className={classes.cartItems}>
        {lineItems.map((item) => {
          return (
            <CartItem
              key={item.id}
              item={item}
              removeLineItem={removeLineItem}
            />
          );
        })}
      </div>
      <CartTotal lineItems={lineItems} />
      <PostalCode postal={props.postal} setPostal={props.setPostal} />
    </div>
  );
}
export default Cart;
