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
import axios from "axios";
import { useDispatch } from "react-redux";
import { finishUpdate } from "@/app/GlobalRedux/Features/orderSlice";

export default function Home() {
  const dispatch = useDispatch();
  const [productModalOpen, setProducttModalOpen] = React.useState(false);

  const [productDetail, setProductDetail] = React.useState<{
    id: string;
    name: string;
    image: string;
    price: number;
    storeName: string;
  }>({
    id: "-1",
    name: "Product Name",
    price: 12000,
    image: "/homepage/product-placeholder-img.png",
    storeName: "Store Name",
  });

  const handleProductModalOpen = (product: {
    id: string;
    name: string;
    image: string;
    price: number;
    storeName: string;
  }) => {
    setProductDetail(product);
    setProducttModalOpen(true);
  };

  const handleProductModalClose = () => {
    setProducttModalOpen(false);
  };

  const [isFetchLoading, setIsFetchLoading] = React.useState(true);
  const isOrderInfoSetByUser = useAppSelector(
    (state) => state.order.value.isSetByUser
  );

  const [StoreList, setStoreList] = React.useState<
    { id: string; image: string; name: string }[]
  >([]);

  const [SelectedStore, setSelectedStore] = React.useState<{
    id: string;
    image: string;
    name: string;
  }>();

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
  const orderInfo = useAppSelector((state) => state.order.value);
  const isOrderInfoUpdating = useAppSelector(
    (state) => state.order.value.isUpdating
  );

  React.useEffect(() => {

    if (SelectedStore) {
      fetchApi(
        `https://coccan-api.somee.com/api/stores/${SelectedStore.id}`

      ).then(
        (response: {
          id: string;
          name: string;
          image: string;
          address: string;
          products: {
            id: string;
            name: string;
            image: string;
            category: { id: string; name: string; image: string };
          }[];
        }) => {
          const categories: Record<string, any> = {};

          response.products.forEach((product) => {
            if (!product.category)
              product.category = {
                id: "placeholder-category",
                name: "Other",
                image: "placeholder-img",
              };
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
              storeName: SelectedStore.name,
            });
          });

          const categoriesList = Object.values(categories);

          setProductListByCategoryFromSelectedStoreId(categoriesList);
        }
      );
      console.log("Store list length: " + StoreList.length);
    }
  }, [SelectedStore]);

  React.useEffect(() => {
    //fetch api to get product with location and session id
    if (isOrderInfoUpdating && orderInfo.sessionId.length > 0) {
      const params = {
        filter: JSON.stringify({ session: orderInfo.sessionId }),
      };
      const queryParams = new URLSearchParams(params);
      const url = `https://coccan-api.somee.com/api/stores?${queryParams.toString()}`;
      fetchApi(url).then(
        (response: { id: string; image: string; name: string }[]) => {
          const uniqueList = Array.from(
            new Set(response.map((obj) => JSON.stringify(obj)))
          ).map((str) => JSON.parse(str));

          setStoreList(uniqueList);
          setSelectedStore(uniqueList[0]);
          dispatch(finishUpdate());
        }
      );
      console.log("Store list length: " + StoreList.length);
    }
    if (StoreList.length > 0) {
      setIsFetchLoading(false);
    }

  }, [StoreList, orderInfo.sessionId]);

  // React.useEffect(() => {
  //   console.log("isFetchLoading" + isFetchLoading);
  //   console.log("isSetByUser" + isOrderInfoSetByUser);
  // }, []);


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
                storeList={
                  StoreList as { id: string; image: string; name: string }[]
                }
                handleSelectStore={(store: {
                  id: string;
                  image: string;
                  name: string;
                }) => setSelectedStore(store)}
              ></CategorySeletorSection>

              {ProductListByCategoryFromSelectedStoreId.map((category) => (
                <ProductByCategorySection
                  key={category.id}
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
