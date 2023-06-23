import React from "react";
import { Button, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import { addToCartSingle } from "@/app/GlobalRedux/Features/cartSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/GlobalRedux/Features/userSlice";
import useStorage from "@/hooks/useStorage";

function AddToCartBtn({
  type,
  product,
}: {
  type: string;
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
  };
}) {
  const dispatch = useDispatch();

  const handleAddToCart = (product: {
    id: string;
    name: string;
    image: string;
    price: number;
  }) => {
    dispatch(addToCartSingle({ product: product }));
  };

  return (
    <>
      {type == "text" ? (
        <Button
          variant="contained"
          size="large"
          className="w-full self-center px-[1rem] bg-[#EA5857] mt-[2rem]"
          onClick={(e) => {
            e.stopPropagation();

            handleAddToCart(product);

          }}
        >
          Add to cart
        </Button>
      ) : (
        <IconButton
          className="add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation();

            handleAddToCart(product);

          }}
        >
          <Add color="inherit"></Add>
        </IconButton>
      )}
    </>
  );
}

export default AddToCartBtn;
