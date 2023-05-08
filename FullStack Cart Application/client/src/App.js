import "./App.css";
import Cart from "./Components/Cart/Cart";
import react, { useMemo, useEffect, useState } from "react";
import api from "./API/axios";
//Styling variables
export const BLUE = "#172162"; //"rgb(23, 33, 98)";
export const LIGHT_GREY = "#6e7484";
export const BLACK = "#000000";
//First part given
export const ESTIMATED_DELIVERY = "Nov 24, 2021";

const SUBTOTAL = 2094.97;
const HST = 272.3461;
const TOTAL = 2382.3161;

export const CartObject = {
  SUBTOTAL: SUBTOTAL,
  HST: HST,
  TOTAL: TOTAL,
};

function App() {
  const [lineItems, setLineItems] = useState([]);
  const [postal, setPostal] = useState();
  // let lineItems = useMemo(
  //   () => [
  //     {
  //       id: 1,
  //       title: "Grey Sofa",
  //       price: 499.99,
  //       quantity: 1,
  //       image:
  //         "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_DARK_GREY_OFF_OFF_SLOPE_17f0f115-11f8-4a78-b412-e9a2fea4748d.png%3Fv%3D1629310667&w=1920&q=75",
  //       swatchColor: "#959392",
  //       swatchTitle: "Grey",
  //     },
  //     {
  //       id: 2,
  //       title: "Blue Sofa",
  //       price: 994.99,
  //       quantity: 1,
  //       image:
  //         "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F3_Seater_SofaSofa_Ottoman_Off_Arm_Configuration_Two_Arms_Arm_Design_Slope_Chaise_Off_Fabric_Navy_Blue2.png%3Fv%3D1629231450&w=1920&q=75",
  //       swatchColor: "#191944",
  //       swatchTitle: "Blue",
  //     },
  //     {
  //       id: 3,
  //       title: "White Sofa",
  //       price: 599.99,
  //       quantity: 1,
  //       image:
  //         "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_IVORY_OFF_OFF_SLOPE_5379af1f-9318-4e37-b514-962d33d1ce64.png%3Fv%3D1629231450&w=1920&q=75",
  //       swatchColor: "#F8F1EC",
  //       swatchTitle: "White",
  //     },
  //   ],
  //   []
  // );

  const apiCall = async (route) => {
    try {
      const response = await api.get(route);
      const json = response.data.data;
      console.log(json);
      setLineItems(json);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    apiCall("/getAllLineItems");
  }, []);

  useEffect(() => {
    if (postal) {
      apiCall(`/getPostalLineItems/${postal}`);
    }
  }, [postal]);

  return (
    <>
      <Cart lineItems={lineItems} postal={postal} setPostal={setPostal} />
    </>
  );
}

export default App;
