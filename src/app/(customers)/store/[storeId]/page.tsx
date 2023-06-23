"use client";

import React from "react";
import StoreDetailSection from "@/components/StoreDetailSection";
import { Button } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import ProductByCategorySection from "@/components/ProductByCategorySection";
import ProductDetailModal from "@/components/ProductDetailModal";

function StoreDetailPage({ params }: { params: { storeId: string } }) {
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

  const [
    ProductListByCategoryFromSelectedStoreId,
    setProductListByCategoryFromSelectedStoreId,
  ] = React.useState<
    {
      id: string;
      name: string;
      image: string;
      products: {
        id: string;
        name: string;
        image: string;
        price: number;
        storeName: string;
      }[];
    }[]
  >([]);

  async function fetchApi(url: string) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  const [isFetchLoading, setIsFetchLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    if (params.storeId) {
      fetchApi(`http://coccan-api.somee.com/api/stores/${params.storeId}`)
        .then(
          (response: {
            id: string;
            name: string;
            image: string;
            products: {
              id: string;
              name: string;
              image: string;
              category: { id: string; name: string; image: string };
            }[];
          }) => {
            const categories: Record<string, any> = {};

            response.products.forEach((product) => {
              const categoryId = product.category.id;

              if (!categories[categoryId]) {
                categories[categoryId] = {
                  id: categoryId,
                  name: product.category.name,
                  image: product.category.image,
                  products: [],
                };
              }

              categories[categoryId].products.push({
                id: product.id,
                name: product.name,
                image: product.image,
                price: 12000,
                storeName: "ABC",
              });
            });

            const categoriesList = Object.values(categories);
            setIsFetchLoading(false);
            setProductListByCategoryFromSelectedStoreId(categoriesList);
          }
        )
        .catch((error) => {
          setIsError(true);
        });
    }
  }, [isError]);

  return (
    <>
      {isFetchLoading && !isError && <h2>Loading...</h2>}

      {isError && <h2>An error occurred while loading. Trying again...</h2>}

      {!isFetchLoading && !isError && (
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
          {ProductListByCategoryFromSelectedStoreId.map((category) => (
            <ProductByCategorySection
              key={category.id}
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
      )}
    </>
  );
}

export default StoreDetailPage;
