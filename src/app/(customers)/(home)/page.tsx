"use client";

import CallToActionSection from "../../../components/CallToActionSection";
import SessionSeletorSection from "../../../components/SessionSeletorSection";
import CategorySeletorSection from "../../../components/CategorySeletorSection";
import ProductByCategorySection from "../../../components/ProductByCategorySection";
import ProductDetailModal from "@/components/ProductDetailModal";
import "./style.scss";
import React from "react";

export default function Home() {
  const categoryList = [
    {
      categoryId: 0,
      categoryIconUrl: "rice.svg",
      name: "Rice",
    },
    {
      categoryId: 1,
      categoryIconUrl: "bread.svg",
      name: "Bread",
    },
    {
      categoryId: 2,
      categoryIconUrl: "drink.svg",
      name: "Drink",
    },
    {
      categoryId: 3,
      categoryIconUrl: "snack.svg",
      name: "Snack",
    },
    {
      categoryId: 4,
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

  const [productModalOpen, setProducttModalOpen] = React.useState(false);

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

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const orderInfo = sessionStorage.getItem("orderInfo");
    if (orderInfo) {
      //fetch api to get product with location and session id

      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <CallToActionSection></CallToActionSection>
      {isLoading && (
        <>
          <h2>LOADING...</h2>
        </>
      )}

      {isLoading && (
        <>
          <div className="selectors-wrapper w-full flex flex-row">
            <div className="w-1/6 ml-[9vw]">
              <SessionSeletorSection></SessionSeletorSection>
            </div>
          </div>
          <CategorySeletorSection
            categoryList={categoryList}
          ></CategorySeletorSection>

          {categoryList.map((category) => (
            <ProductByCategorySection
              key={category.categoryId}
              category={category}
              viewMore={true}
              handleViewProductDetail={handleProductModalOpen}
            ></ProductByCategorySection>
          ))}
          <ProductDetailModal
            open={productModalOpen}
            handleClose={handleProductModalClose}
            product={productDetail}
          ></ProductDetailModal>
        </>
      )}
    </>
  );
}
