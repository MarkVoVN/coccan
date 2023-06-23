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
  };
  handleViewProductDetail: (id: string) => void;
}) {
  return (
    <Card
      className="product-container"
      onClick={() => handleViewProductDetail(product.id)}
      sx={{ maxWidth: 216 }}
    >
      <CardMedia component="img" image={product.image} height=""></CardMedia>
      <CardContent>
        <Typography variant="h6" fontWeight="500">
          {product.name}
        </Typography>
        <Box className="product-info">
          <Typography variant="subtitle1">
            {product.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Typography>
          <AddToCartBtn type="icon" productId={product.id}></AddToCartBtn>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
