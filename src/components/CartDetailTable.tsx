"use client";

import { useAppSelector } from "@/app/GlobalRedux/Features/userSlice";
import { Add, Remove, Warning } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addToCartSingle,
  subtractFromCartSingle,
  removeFromCart,
  incrementItem,
} from "@/app/GlobalRedux/Features/cartSlice";
import { useRouter } from "next/navigation";

function CartDetailTable() {
  const router = useRouter();
  const productInfoPlaceholder = {
    id: "8",
    name: "Product Name",
    price: 12000,
    imageUrl: "/homepage/product-placeholder-img.png",
    description: "Product description",
    storeName: "Store Name",
  };

  const cart = useAppSelector((state) => state.cart);
  const userInfo = useAppSelector((state) => state.user);
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
  const [warningDialogOpen, setWarningDialogOpen] = React.useState(false);

  const handleCloseWarningDialog = () => {
    setWarningDialogOpen(false);
  };

  const handleCheckout = () => {
    if (userInfo.value.isAuth) {
      router.push("/checkout");
    } else {
      setWarningDialogOpen(true);
    }
  };

  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  useEffect(() => {
    //Calculate total price
    var total = 0;
    cart.value.map((item) => {
      //get price from api
      total += item.price * item.quantity;
    });
    setCartTotalPrice(total);
  }, [cart]);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" fontWeight="500">
                  Item
                </Typography>
              </TableCell>
              <TableCell></TableCell>
              <TableCell align="center">
                <Typography variant="h6" fontWeight="500">
                  Quantity
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" fontWeight="500">
                  Store
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" fontWeight="500">
                  Amount
                </Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.value.map((item) => (
              <TableRow key={item.menudetailId}>
                <TableCell align="center">
                  <img src={item.image} alt={item.name} width={128} />
                </TableCell>
                <TableCell>
                  <Typography>{item.name}</Typography>
                  <Typography>
                    {item.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleDecrementItem(item.menudetailId)}
                  >
                    <Remove></Remove>
                  </IconButton>
                  {item.quantity}

                  <IconButton
                    onClick={() => handleIncrementItem(item.menudetailId)}
                  >
                    <Add></Add>
                  </IconButton>
                </TableCell>
                <TableCell align="center">{item.storeName}</TableCell>
                <TableCell align="center">
                  {(item.price * item.quantity).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleRemoveItem(item.menudetailId)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">Total price:</TableCell>
              <TableCell align="center">
                {cartTotalPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  onClick={handleCheckout}
                  // disabled={!userInfo.value.isAuth}
                >
                  Checkout
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={warningDialogOpen} onClose={handleCloseWarningDialog}>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Warning sx={{ color: "primary.main" }}></Warning>
            <Typography variant="h5">Warning</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h4">You must login to checkout.</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseWarningDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CartDetailTable;
