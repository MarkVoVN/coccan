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
  const [CategoryList, setCategoryList] = React.useState<
    { id: string; name: string; image: string }[]
  >([]);

  async function fetchApi(url: string) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  React.useEffect(() => {
    //fetch api to get product with location and session id
    if (StoreList.length <= 0) {
      fetchApi("http://coccan-api.somee.com/api/stores").then(
        (response: { id: string; image: string; name: string }[]) => {
          setStoreList(response);
          setSelectedStore(response[0]);
        }
      );
      console.log("Store list length: " + StoreList.length);
    }

    if (SelectedStore) {
      fetchApi(
        `http://coccan-api.somee.com/api/stores/${SelectedStore.id}`
      ).then(
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
              storeName: SelectedStore.name,
            });
          });

          const categoriesList = Object.values(categories);

          setProductListByCategoryFromSelectedStoreId(categoriesList);
        }
      );
      console.log("Store list length: " + StoreList.length);
    }

    if (CategoryList.length <= 0) {
      fetchApi("http://coccan-api.somee.com/api/categories").then(
        (response: { id: string; name: string; image: string }[]) =>
          setCategoryList(response)
      );
      console.log("Category list length: " + CategoryList);
    }

    if (StoreList.length > 0 && CategoryList.length > 0) {
      setIsFetchLoading(false);
    }
  }, [StoreList, CategoryList, SelectedStore]);

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
