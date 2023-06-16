"use client";

import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ProductCard from "@/components/ProductCard";
import "@/style/ProductByCategory.scss";
function ProductByCategorySection({
  category,
  viewMore,
  handleViewProductDetail,
}: {
  category: {
    categoryId: number;
    categoryIconUrl: string;
    name: string;
  };
  viewMore: boolean;
  handleViewProductDetail: (id: number) => void;
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
          {viewMore ? (
            <Button variant="contained" className="view-more-btn">
              View more
            </Button>
          ) : (
            <></>
          )}
        </Box>
        <Box className="product-list-container">
          {productList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleViewProductDetail={handleViewProductDetail}
            ></ProductCard>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default ProductByCategorySection;
