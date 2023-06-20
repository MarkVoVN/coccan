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

function ProductCard({
  product,
  handleViewProductDetail,
}: {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
  handleViewProductDetail: (id: number) => void;
}) {
  return (
    <Card
      className="product-container"
      onClick={() => handleViewProductDetail(product.id)}
      sx={{ maxWidth: 256 }}
    >
      <CardMedia component="img" image={product.imageUrl} height=""></CardMedia>
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
          <IconButton className="add-to-cart-btn">
            <Add color="inherit"></Add>
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
