"use client";

import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import SortProductSection from "@/components/SortProductSection";
import SearchResultSection from "@/components/SearchResultSection";
import "./search.scss";

function SearchPage() {
  const [sortMetricId, setSortMetric] = useState("0");

  const handleSortChange = (e: SelectChangeEvent) => {
    setSortMetric(e.target.value);
  };

  const sortMetricList = [
    {
      id: 0,
      iconUrl: "what.svg",
      name: "All",
    },
    {
      id: 1,
      iconUrl: "rice.svg",
      name: "Metric 1",
    },
    {
      id: 2,
      iconUrl: "bread.svg",
      name: "Metric 2",
    },
  ];

  const searchResult = {
    type: "store with 3 products",
    list: [
      {
        id: 1,
        name: "store 1",
        logoUrl: "/search/store-logo-placeholder.svg",
        list: [
          {
            id: 13,
            name: "product 13",
            imgUrl: "/homepage/product-placeholder-img.png",
            price: 10000,
          },
          {
            id: 12,
            name: "product 12",
            imgUrl: "/homepage/product-placeholder-img.png",
            price: 10000,
          },
          {
            id: 19,
            name: "product 19",
            imgUrl: "/homepage/product-placeholder-img.png",
            price: 10000,
          },
        ],
      },
      {
        id: 2,
        name: "store 2",
        logoUrl: "/search/store-logo-placeholder.svg",
        list: [
          {
            id: 13,
            name: "product 13",
            imgUrl: "/homepage/product-placeholder-img.png",
            price: 10000,
          },
          {
            id: 12,
            name: "product 12",
            imgUrl: "/homepage/product-placeholder-img.png",
            price: 10000,
          },
          {
            id: 19,
            name: "product 19",
            imgUrl: "/homepage/product-placeholder-img.png",
            price: 10000,
          },
        ],
      },
      {
        id: 3,
        name: "store 3",
        logoUrl: "/search/store-logo-placeholder.svg",
        list: [
          {
            id: 13,
            name: "product 13",
            imgUrl: "/homepage/product-placeholder-img.png",
            price: 10000,
          },
          {
            id: 12,
            name: "product 12",
            imgUrl: "/homepage/product-placeholder-img.png",
            price: 10000,
          },
          {
            id: 19,
            name: "product 19",
            imgUrl: "/homepage/product-placeholder-img.png",
            price: 10000,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <SearchResultSection searchResults={searchResult}></SearchResultSection>
    </div>
  );
}

export default SearchPage;
