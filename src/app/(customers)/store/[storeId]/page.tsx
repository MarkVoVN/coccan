"use client";

import React from "react";
import StoreDetailSection from "@/components/StoreDetailSection";
import { Box, Button, ThemeProvider } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import ProductByCategorySection from "@/components/ProductByCategorySection";
import ProductDetailModal from "@/components/ProductDetailModal";
import { useAppSelector } from "@/app/GlobalRedux/Features/userSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import theme from "@/app/theme";
import "./store.scss";

function StoreDetailPage({ params }: { params: { storeId: string } }) {
  const router = useRouter();
  const productInfoPlaceholder = {
    id: "8",
    name: "Product Name",
    price: 12000,
    image: "/homepage/product-placeholder-img.png",
    description: "Product description",
    storeName: "Store Name",
    menudetailId: "menudetail-placeholder",
  };

  const [productModalOpen, setProducttModalOpen] = React.useState(false);

  const [productDetail, setProductDetail] = React.useState<{
    id: string;
    name: string;
    image: string;
    price: number;
    storeName: string;
    menudetailId: string;
  }>({
    id: "-1",
    name: "Product Name",
    price: 12000,
    image: "/homepage/product-placeholder-img.png",
    storeName: "Store Name",
    menudetailId: "menudetailid",
  });

  const handleProductModalOpen = (product: {
    id: string;
    name: string;
    image: string;
    price: number;
    storeName: string;
    menudetailId: string;
  }) => {
    setProductDetail(product);
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
        menudetailId: string;
      }[];
    }[]
  >([]);
  const [StoreInfo, setStoreInfo] = React.useState<{
    id: string;
    name: string;
    image: string;
    address: string;
  }>({
    id: "place-holder",
    name: "Store name placeholder",
    image: "/search/store-logo-placeholder.svg",
    address: "161A Nguyen Van Tang, P. Long Thanh My, TP. Thu duc",
  });

  const [isFetchLoading, setIsFetchLoading] = React.useState(true);
  const [isStoreLoading, setIsStoreLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  const sessionId = useAppSelector((state) => state.order.value.sessionId);
  React.useEffect(() => {
    if (params.storeId && sessionId.length > 0) {
      const parameters = {
        filter: JSON.stringify({
          session: sessionId,
        }),
      };
      const queryParams = new URLSearchParams(parameters);
      axios
        .get(`http://coccan-api.somee.com/api/stores/${params.storeId}`, {
          params: queryParams,
        })
        .then((response) => {
          setStoreInfo({
            id: response.data.id,
            name: response.data.name,
            image: response.data.image,
            address: response.data.address,
          });
          setIsStoreLoading(false);
        })
        .catch((error) => {
          setIsError(true);
        });
      //fetch product details for this Store
      const parameterForMenuDetails = {
        filter: JSON.stringify({
          session: sessionId,
          store: params.storeId,
        }),
      };
      const queryParams2 = new URLSearchParams(parameterForMenuDetails);
      const url = `https://coccan-api.somee.com/api/menudetails`;

      axios.get(url, { params: queryParams2 }).then((response) => {
        const categories: Record<string, any> = {};

        response.data.forEach(
          (menudetail: {
            id: string;
            price: number;
            menuId: string;
            product: {
              id: string;
              name: string;
              image: string;
              category: { id: string; name: string; image: string };
            };
          }) => {
            if (!menudetail.product.category)
              menudetail.product.category = {
                id: "placeholder-category",
                name: "Other",
                image: "placeholder-img",
              };

            const categoryId = menudetail.product.category.id;

            if (!categories[categoryId]) {
              categories[categoryId] = {
                id: categoryId,
                name: menudetail.product.category.name,
                image: menudetail.product.category.image,
                products: [],
              };
            }

            categories[categoryId].products.push({
              id: menudetail.product.id,
              name: menudetail.product.name,
              image: menudetail.product.image,
              price: menudetail.price,
              storeName: StoreInfo.name,
              menudetailId: menudetail.id,
            });
          }
        );

        const categoriesList = Object.values(categories);
        setIsFetchLoading(false);
        setProductListByCategoryFromSelectedStoreId(categoriesList);
      });
    }
  }, [isError, sessionId]);

  return (
    <>
      <ThemeProvider theme={theme}>
        {(isFetchLoading || isStoreLoading) && !isError && <h2>Loading...</h2>}

        {isError && <h2>An error occurred while loading. Trying again...</h2>}

        {!isFetchLoading && !isStoreLoading && !isError && (
          <>
            <Box className="container">
              <Button
                variant="outlined"
                size="large"
                onClick={() => router.push("/")}
                startIcon={<ArrowBackIos></ArrowBackIos>}
              >
                Back
              </Button>
              <StoreDetailSection store={StoreInfo}></StoreDetailSection>
              {ProductListByCategoryFromSelectedStoreId.map((category) => (
                <ProductByCategorySection
                  key={category.id}
                  category={category}
                  viewMore={false}
                  handleViewProductDetail={handleProductModalOpen}
                  store={undefined}
                ></ProductByCategorySection>
              ))}
              <ProductDetailModal
                open={productModalOpen}
                handleClose={handleProductModalClose}
                product={productDetail}
              ></ProductDetailModal>
            </Box>
          </>
        )}
      </ThemeProvider>
    </>
  );
}

export default StoreDetailPage;
