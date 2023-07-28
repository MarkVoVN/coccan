import React from "react";
import {
  Modal,
  Typography,
  Button,
  IconButton,
  ThemeProvider,
  Box,
  Dialog,
} from "@mui/material";
import "@/style/ProductDetailModal.scss";
import { ArrowBackIos } from "@mui/icons-material";
import AddToCartBtn from "@/components/AddToCartBtn";
import theme from "../app/theme";

function ProductDetailModal({
  open,
  handleClose,
  product,
}: {
  open: boolean;
  handleClose: () => void;
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    storeName: string;
    menudetailId: string;
  };
}) {
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        maxWidth={false}
      >
        <Box
          className="modal-container"
          sx={{
            bgcolor: "background.default",
          }}
        >
          <Box
            className="modal-title"
            sx={{
              bgcolor: "secondary.main",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              color: "#fff",
              padding: "8px",
              gap: "216px",
            }}
          >
            <IconButton
              onClick={handleClose}
              size="large"
              sx={{ position: "absolute" }}
            >
              <ArrowBackIos sx={{ color: "#fff" }}></ArrowBackIos>
            </IconButton>
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Typography variant="h4">Product detail</Typography>
            </Box>
          </Box>
          <Box
            className="modal-body"
            sx={{
              display: "flex",
              padding: "64px",
              alignItems: "center",
              gap: "32px",
            }}
          >
            <Box
              className="product-img-container"
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                width: "fit-content",
              }}
            >
              <img
                src={product.image}
                alt={"Image of " + product.name}
                height={256}
              ></img>
            </Box>
            <Box
              className="product-info"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                maxWidth: "400px",
              }}
            >
              <Typography variant="h3" fontWeight="600">
                {product.name}
              </Typography>
              {/* <Typography variant="h6" className="mb-[2rem] font-thin">
              {product.description}
            </Typography> */}
              <Typography variant="h6">
                {"Store: " + product.storeName}
              </Typography>
              <Typography variant="h5">
                {product.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </Typography>
              <AddToCartBtn type="text" product={product}></AddToCartBtn>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </ThemeProvider>
  );
}

export default ProductDetailModal;
