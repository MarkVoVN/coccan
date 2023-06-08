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

function ProductByCategorySection({
  category,
}: {
  category: {
    categoryId: number;
    categoryIconUrl: string;
    name: string;
  };
}) {
  const productList = [
    {
      id: 1,
      name: "Product Name",
      price: 12000,
      imageUrl: "/homepage/product-placeholder-img.png",
    },
    {
      id: 2,
      name: "Product Name",
      price: 12000,
      imageUrl: "/homepage/product-placeholder-img.png",
    },
    {
      id: 3,
      name: "Product Name",
      price: 12000,
      imageUrl: "/homepage/product-placeholder-img.png",
    },
    {
      id: 4,
      name: "Product Name",
      price: 12000,
      imageUrl: "/homepage/product-placeholder-img.png",
    },
    {
      id: 5,
      name: "Product Name",
      price: 12000,
      imageUrl: "/homepage/product-placeholder-img.png",
    },
    {
      id: 6,
      name: "Product Name",
      price: 12000,
      imageUrl: "/homepage/product-placeholder-img.png",
    },
    {
      id: 7,
      name: "Product Name",
      price: 12000,
      imageUrl: "/homepage/product-placeholder-img.png",
    },
    {
      id: 8,
      name: "Product Name",
      price: 12000,
      imageUrl: "/homepage/product-placeholder-img.png",
    },
  ];

  return (
    <Box className="product-by-category-wrapper">
      <Box className="product-by-category-container">
        <Box className="info">
          <Typography variant="h3" className="category-title">
            {category.name}
          </Typography>
          <Button variant="contained" className="view-more-btn">
            View more
          </Button>
        </Box>
        <Box className="product-list-container">
          {productList.map((product) => (
            <Card key={product.id} className="product-container">
              <CardMedia
                component={"img"}
                image={product.imageUrl}
                height=""
              ></CardMedia>
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Box className="product-info">
                  <Typography variant="h6">
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
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default ProductByCategorySection;
