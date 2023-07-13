"use client";

import { useAppSelector } from "@/app/GlobalRedux/Features/userSlice";
import CartDetailTable from "@/components/CartDetailTable";
import OrderCheckoutSection from "@/components/OrderCheckoutSection";
import { Alert, Collapse, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import "./cartPage.scss";
import theme from "../../theme";

function CartPage() {
  const cart = useAppSelector((state) => state.cart);

  return (
    <ThemeProvider theme={theme}>
      <div className="cart-page">
        <div className="container">
          <div className="title">
            <Typography variant="h2" fontWeight="500">
              CART
            </Typography>
          </div>
          {cart.value.length > 0 && (
            <>
              <CartDetailTable></CartDetailTable>
            </>
          )}
          {cart.value.length <= 0 && <h1>CART IS EMPTY</h1>}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default CartPage;
