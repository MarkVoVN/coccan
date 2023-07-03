"use client";

import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ProductCard from "@/components/ProductCard";
import "@/style/ProductByCategory.scss";
import { useRouter } from "next/navigation";
function ProductByCategorySection({
  category,
  viewMore,
  handleViewProductDetail,
  store,
}: {
  category: {
    id: string;
    name: string;
    image: string;
    products: {
      id: string;
      name: string;
      image: string;
      price: number;
      storeName: string;
      menudetailId: string;
    }[];
  };

  viewMore: boolean;
  handleViewProductDetail: (product: {
    id: string;
    name: string;
    image: string;
    price: number;
    storeName: string;

    menudetailId: string;
  }) => void;
  store:
    | {
        id: string;
        image: string;
        name: string;
      }
    | undefined;
}) {
  const router = useRouter();
  return (
    <Box className="product-by-category-wrapper">
      <Box className="product-by-category-container">
        <Box className="info">
          <Typography variant="h4" fontWeight="500" className="category-title">
            {category.name}
          </Typography>
          {viewMore ? (
            <Button
              variant="contained"
              className="view-more-btn"
              onClick={() => router.push(`/store/${store?.id}`)}
            >
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
