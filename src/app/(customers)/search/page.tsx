"use client";
import SearchResultSection from "@/components/SearchResultSection";
import "./search.scss";
import { ThemeProvider } from "@mui/material";
import theme from "../../theme";

function SearchPage() {
  const searchResult = {
    type: "store with 3 products",
    list: [
      {
        id: "1",
        name: "store 1",
        logoUrl: "/search/store-logo-placeholder.svg",
        list: [
          {
            id: "73",
            name: "product 13",
            imgUrl: "/homepage/product-placeholder-img.png",
            price: 10000,
          },
          {
            id: "52",
            name: "product 12",
            imgUrl: "/homepage/product-placeholder-img.png",
            price: 10000,
          },
          {
            id: "09",
            name: "product 19",
            imgUrl: "/homepage/product-placeholder-img.png",
            price: 10000,
          },
        ],
      },
      {
        id: "2",
        name: "store 2",
        logoUrl: "/search/store-logo-placeholder.svg",
        list: [
          {
            id: "23",
            name: "product 13",
            imgUrl: "/homepage/product-placeholder-img.png",
            price: 10000,
          },
          {
            id: "18",
            name: "product 12",
            imgUrl: "/homepage/product-placeholder-img.png",
            price: 10000,
          },
          {
            id: "10",
            name: "product 19",
            imgUrl: "/homepage/product-placeholder-img.png",
            price: 10000,
          },
        ],
      },
      {
        id: "3",
        name: "store 3",
        logoUrl: "/search/store-logo-placeholder.svg",
        list: [
          {
            id: "13",
            name: "product 13",
            imgUrl: "/homepage/product-placeholder-img.png",
            price: 10000,
          },
          {
            id: "12",
            name: "product 12",
            imgUrl: "/homepage/product-placeholder-img.png",
            price: 10000,
          },
          {
            id: "19",
            name: "product 19",
            imgUrl: "/homepage/product-placeholder-img.png",
            price: 10000,
          },
        ],
      },
    ],
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <SearchResultSection searchResults={searchResult}></SearchResultSection>
      </div>
    </ThemeProvider>
  );
}

export default SearchPage;
