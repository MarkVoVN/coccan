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
        menudetailId: string;
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
      const params = {
        filter: JSON.stringify({
          session: orderInfo.sessionId,
          store: SelectedStore.id,
        }),
      };
      const queryParams = new URLSearchParams(params);
      const url = `https://coccan-api.somee.com/api/menudetails`;


      axios.get(url, { params: queryParams }).then((response) => {
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
              storeName: SelectedStore.name,
              menudetailId: menudetail.id,
            });
          }
        );

        const categoriesList = Object.values(categories);

        setProductListByCategoryFromSelectedStoreId(categoriesList);
      });
    }
  }, [SelectedStore]);

  React.useEffect(() => {
    //fetch api to get product with location and session id
    if (isOrderInfoUpdating && orderInfo.sessionId.length > 0) {
      const params = {
        filter: JSON.stringify({ session: orderInfo.sessionId }),
      };
      const queryParams = new URLSearchParams(params);
      axios
        .get("https://coccan-api.somee.com/api/stores", { params: queryParams })
        .then((response) => {
          setStoreList(response.data);
          setSelectedStore(response.data[0]);
          dispatch(finishUpdate());
        });

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
          <div className="selectors-wrapper">
            <Box sx={{ marginTop: "32px" }}>
              <SessionSeletorSection></SessionSeletorSection>
            </Box>
          </div>
          <Carousel
            indicators={false}
            sx={{ marginBottom: "32px", borderRadius: "8px" }}
          >
            <Card>
              <CardMedia
                component="img"
                image="/homepage/Food-Facebook-Cover-Banner-13.png"
                height="200"
              ></CardMedia>
            </Card>
            <Card>
              <CardMedia
                component="img"
                image="/homepage/Food-Facebook-Cover-Banner-19.png"
                height="200"
              ></CardMedia>
            </Card>
          </Carousel>
          {(isFetchLoading || !isOrderInfoSetByUser) && (
            <>
              <h2>Loading...</h2>
            </>
          )}

          {!orderInfo.isSessionAvailable && (
            <>
              <h2>This session is not active</h2>
            </>
          )}

          {!(isFetchLoading || !isOrderInfoSetByUser) &&
            orderInfo.isSessionAvailable && (
              <>
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
                    store={SelectedStore}
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
