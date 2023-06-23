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
    id: string;
    name: string;
    image: string;
    products: { id: string; name: string; image: string; price: number }[];
  };

  viewMore: boolean;
  handleViewProductDetail: (id: string) => void;
}) {
  return (
    <Box className="product-by-category-wrapper">
      <Box className="product-by-category-container">
        <Box className="info">
          <Typography variant="h4" fontWeight="500" className="category-title">
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
          {category.products.map((product) => (
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
