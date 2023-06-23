"use client";

// import CallToActionSection from "../../../components/CallToActionSection";
import SessionSeletorSection from "../../../components/SessionSeletorSection";
import CategorySeletorSection from "../../../components/CategorySeletorSection";
import ProductByCategorySection from "../../../components/ProductByCategorySection";
import ProductDetailModal from "@/components/ProductDetailModal";
import "./style.scss";
import React from "react";
import theme from "../../theme";
import { useAppSelector } from "@/app/GlobalRedux/Features/userSlice";
import { ThemeProvider } from "@emotion/react";
import Carousel from "react-material-ui-carousel";
import { Box, Button, Card, CardMedia, Paper } from "@mui/material";

export default function Home() {
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

  const [isFetchLoading, setIsFetchLoading] = React.useState(true);
  const isOrderInfoSetByUser = useAppSelector(
    (state) => state.order.value.isSetByUser
  );

  React.useEffect(() => {
    //fetch api to get product with location and session id

    setIsFetchLoading(false);
  }, []);
  const name = useAppSelector((state) => state.user.value.displayName);

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="container">
          <Carousel indicators={false} sx={{ borderRadius: "8px" }}>
            <Card>
              <CardMedia
                component="img"
                image="/homepage/Food-Facebook-Cover-Banner-13.png"
                height=""
              ></CardMedia>
            </Card>
            <Card>
              <CardMedia
                component="img"
                image="/homepage/Food-Facebook-Cover-Banner-19.png"
                height=""
              ></CardMedia>
            </Card>
          </Carousel>
          {(isFetchLoading || !isOrderInfoSetByUser) && (
            <>
              <h2>Loading...</h2>
            </>
          )}

          {!(isFetchLoading || !isOrderInfoSetByUser) && (
            <>
              <div className="selectors-wrapper">
                <Box sx={{ marginTop: "36px" }}>
                  <SessionSeletorSection></SessionSeletorSection>
                </Box>
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
        </div>
      </ThemeProvider>
    </>
  );
}
