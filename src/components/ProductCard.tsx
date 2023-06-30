"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { Add } from "@mui/icons-material";
import AddToCartBtn from "./AddToCartBtn";

function ProductCard({
  product,
  handleViewProductDetail,
}: {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    storeName: string;
    menudetailId: string;
  };
  handleViewProductDetail: (product: {
    id: string;
    name: string;
    image: string;
    price: number;
    storeName: string;
    menudetailId: string;
  }) => void;
}) {
  return (
    <Card
      className="product-container"
      onClick={() => handleViewProductDetail(product)}
      sx={{ maxWidth: 216, maxHeight: 320 }}
    >
      <CardMedia component="img" image={product.image} height="200"></CardMedia>
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="500"
          lineHeight={1.5}
          sx={{ height: "56px" }}
        >
          {product.name}
        </Typography>
        <Box className="product-info">
          <Typography variant="subtitle1">
            {product.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Typography>

          <AddToCartBtn type="icon" product={product}></AddToCartBtn>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
