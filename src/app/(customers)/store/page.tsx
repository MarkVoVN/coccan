"use client";

import React from "react";
import StoreDetailSection from "@/components/StoreDetailSection";
import { Button } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import ProductByCategorySection from "../../../components/ProductByCategorySection";
import ProductDetailModal from "@/components/ProductDetailModal";

function StoreDetailPage() {
  const store = {
    id: "1",
    name: "711 Bakery",
    logoUrl: "/search/store-logo-placeholder.svg",
    description: "We sell the best pastry in the area",
    address: "161A Nguyen Van Tang, P. Long Thanh My, TP. Thu duc",
    contact: "0909 123 456",
  };

  const categoryList = [
    {
      categoryId: "0",
      categoryIconUrl: "rice.svg",
      name: "Rice",
    },
    {
      categoryId: "1",
      categoryIconUrl: "bread.svg",
      name: "Bread",
    },
    {
      categoryId: "2",
      categoryIconUrl: "drink.svg",
      name: "Drink",
    },
    {
      categoryId: "3",
      categoryIconUrl: "snack.svg",
      name: "Snack",
    },
    {
      categoryId: "4",
      categoryIconUrl: "others.svg",
      name: "Others",
    },
  ];

  const productInfoPlaceholder = {
    id: "8",
    name: "Product Name",
    price: 12000,
    imageUrl: "/homepage/product-placeholder-img.png",
    description: "Product description",
    storeName: "Store Name",
  };

  const [productModalOpen, setProducttModalOpen] = React.useState(true);

  const [productDetail, setProductDetail] = React.useState(
    productInfoPlaceholder
  );

  const handleProductModalOpen = () => {
    setProductDetail(productInfoPlaceholder);
    setProducttModalOpen(true);
  };

  const handleProductModalClose = () => {
    setProducttModalOpen(false);
  };

  return (
    <>
      <div className="back-btn-section-wrapper flex flex-row justify-center">
        <div className="back-btn-section-container w-[80%] my-[2ren]">
          <Button
            variant="outlined"
            size="large"
            onClick={() => console.log("return to previous page")}
            startIcon={<ArrowBackIos></ArrowBackIos>}
          >
            Back
          </Button>
        </div>
      </div>
      <StoreDetailSection store={store}></StoreDetailSection>
      {categoryList.map((category) => (
        <ProductByCategorySection
          key={category.categoryId}
          category={category}
          viewMore={false}
          handleViewProductDetail={handleProductModalOpen}
        ></ProductByCategorySection>
      ))}
      <ProductDetailModal
        open={productModalOpen}
        handleClose={handleProductModalClose}
        product={productDetail}
      ></ProductDetailModal>
    </>
  );
}

export default StoreDetailPage;
