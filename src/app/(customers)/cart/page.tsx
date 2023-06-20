"use client";

import { useAppSelector } from "@/app/GlobalRedux/Features/userSlice";
import CartDetailTable from "@/components/CartDetailTable";
import OrderCheckoutSection from "@/components/OrderCheckoutSection";
import { Typography } from "@mui/material";
import React from "react";
import "./cartPage.scss";

function CartPage() {
  const cart = useAppSelector((state) => state.cart);

  return (
    <div className="cart-page">
      <div className="text-center my-12">
        <Typography variant="h2">CART</Typography>
      </div>
      {cart.value.length > 0 && (
        <>
          <CartDetailTable></CartDetailTable>
          <OrderCheckoutSection></OrderCheckoutSection>
        </>
      )}
      {cart.value.length <= 0 && <h1>CART IS EMPTY</h1>}
    </div>
  );
}

export default CartPage;
