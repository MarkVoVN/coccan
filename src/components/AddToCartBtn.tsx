import React from "react";
import { Button, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import { addToCartSingle } from "@/app/GlobalRedux/Features/cartSlice";
import { useDispatch } from "react-redux";

function AddToCartBtn({
  type,
  productId,
}: {
  type: string;
  productId: string;
}) {
  // const handleAddToCart = (productId: string) => {
  //   let cartInfo = sessionStorage.getItem("cart");
  //   if (cartInfo != null) {
  //     let cart: {
  //       userId: string;
  //       locationId: string;
  //       timeslotId: string;
  //       list: { productId: string; amount: number }[];
  //     } = JSON.parse(cartInfo);
  //     let item = cart.list.find((item) => item.productId === productId);
  //     if (item) {
  //       item.amount++;
  //     } else {
  //       cart.list.concat({ productId: productId, amount: 1 });
  //     }

  //     sessionStorage.setItem("cart", JSON.stringify(cart));
  //   } else {
  //     let cart: {
  //       userId: string;
  //       locationId: string;
  //       timeslotId: string;
  //       list: { productId: string; amount: number }[];
  //     } = {
  //       userId: "",
  //       locationId: "",
  //       timeslotId: "",
  //       list: [
  //         {
  //           productId: productId,
  //           amount: 1,
  //         },
  //       ],
  //     };

  //     sessionStorage.setItem("cart", JSON.stringify(cart));
  //   }
  // };
  const dispatch = useDispatch();
  const handleAddToCart = (productId: string) => {
    dispatch(addToCartSingle(productId));
  };

  return (
    <>
      {type == "text" ? (
        <Button
          variant="contained"
          size="large"
          className="w-full self-center px-[1rem] bg-[#EA5857] mt-[2rem]"
          onClick={() => handleAddToCart(productId)}
        >
          Add to cart
        </Button>
      ) : (
        <IconButton
          className="add-to-cart-btn"
          onClick={() => handleAddToCart(productId)}
        >
          <Add color="inherit"></Add>
        </IconButton>
      )}
    </>
  );
}

export default AddToCartBtn;
