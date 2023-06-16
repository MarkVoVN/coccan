import React from "react";
import { Button, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import { addToCartSingle } from "@/app/GlobalRedux/Features/cartSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/GlobalRedux/Features/userSlice";
import useStorage from "@/hooks/useStorage";

function AddToCartBtn({
  type,
  productId,
}: {
  type: string;
  productId: string;
}) {
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
