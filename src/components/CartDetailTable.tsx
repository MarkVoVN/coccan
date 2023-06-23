"use client";

import { useAppSelector } from "@/app/GlobalRedux/Features/userSlice";
import { Add, Remove } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addToCartSingle,
  subtractFromCartSingle,
  removeFromCart,
  incrementItem,
} from "@/app/GlobalRedux/Features/cartSlice";

function CartDetailTable() {
  const productInfoPlaceholder = {
    id: "8",
    name: "Product Name",
    price: 12000,
    imageUrl: "/homepage/product-placeholder-img.png",
    description: "Product description",
    storeName: "Store Name",
  };

  const cart = useAppSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleIncrementItem = (id: string) => {
    dispatch(incrementItem(id));
  };

  const handleDecrementItem = (id: string) => {
    dispatch(subtractFromCartSingle(id));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  useEffect(() => {
    //Calculate total price
    var total = 0;
    cart.value.map((item) => {
      //get price from api
      var price = productInfoPlaceholder.price;

      total += price * item.quantity;
    });
    setCartTotalPrice(total);
  }, [cart]);

  return (
    <TableContainer className="flex flex-row justify-center">
      <Table className="w-[80vw]">
        <TableHead>
          <TableRow>
            <TableCell align="right">Item</TableCell>
            <TableCell></TableCell>
            <TableCell align="center">Store</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.value.map((item) => (
            <TableRow key={item.menuItemId}>
              <TableCell align="center">
                <img
                  src={productInfoPlaceholder.imageUrl}
                  alt={productInfoPlaceholder.name}
                  width={128}
                />
              </TableCell>
              <TableCell>
                <div>{productInfoPlaceholder.name + " " + item.menuItemId}</div>
                <div>
                  {productInfoPlaceholder.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </TableCell>

              <TableCell align="center">
                {productInfoPlaceholder.storeName}
              </TableCell>
              <TableCell align="center">
                <IconButton
                  onClick={() => handleDecrementItem(item.menuItemId)}
                >
                  <Remove></Remove>
                </IconButton>
                {item.quantity}

                <IconButton
                  onClick={() => handleIncrementItem(item.menuItemId)}
                >
                  <Add></Add>
                </IconButton>
              </TableCell>
              <TableCell align="center">
                {(item.quantity * productInfoPlaceholder.price).toLocaleString(
                  "vi-VN",
                  {
                    style: "currency",
                    currency: "VND",
                  }
                )}
              </TableCell>
              <TableCell>
                <Button onClick={() => handleRemoveItem(item.menuItemId)}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Total amount:</TableCell>
            <TableCell align="center">
              {cartTotalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CartDetailTable;
