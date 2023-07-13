"use client";

import React from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import AddToCartBtn from "./AddToCartBtn";
import "../style/SearchResultSection.scss";
import { useRouter } from "next/navigation";

function SearchResultSection({
  StoreList,
  keyword,
}: {
  StoreList:
    | {
        id: string;
        name: string;
        image: string;
        address: string;
        product: {
          id: string;
          price: number;
          menuId: string;
          product: {
            id: string;
            name: string;
            image: string;
            category: { id: string; name: string; image: string };
          };
        }[];
      }[]
    | undefined;
  keyword: string;
}) {
  const router = useRouter();
  return (
    <div className="search-result-wrapper">
      <div className="container">
        {StoreList?.map((store) => (
          <div key={store.id} className="search-result-container">
            <div className="search-result-logo-container">
              <img
                src={store.image}
                className="search-result-logo"
                alt={store.name + " logo"}
                width={360}
                height={360}
              />
            </div>
            <div className="search-result-info">
              <div className="search-result-name">
                <Tooltip title="View store" arrow>
                  <Button onClick={() => router.push(`/store/${store.id}`)}>
                    <Typography variant="h4" fontWeight="500">
                      {store.name}
                    </Typography>
                  </Button>
                </Tooltip>
              </div>
              <Box
                className="search-result-list-container"
                sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                {store.product.map((menudetail) => (
                  <div key={menudetail.id} className="search-product-container">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "32px",
                      }}
                    >
                      <Box
                        className="product-img-container"
                        sx={{
                          width: "96px",
                          height: "96px",
                          overflow: "hidden",
                          borderRadius: "8px",
                        }}
                      >
                        <img
                          src={menudetail.product.image}
                          className="product-img"
                          alt={menudetail.product.name + " img"}
                          height={96}
                          width={96}
                        />
                      </Box>
                      <div className="product-info">
                        <Typography variant="h5" className="product-name">
                          {menudetail.product.name}
                        </Typography>
                        <Typography variant="h6" className="product-price">
                          {menudetail.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </Typography>
                      </div>
                    </div>
                    <AddToCartBtn
                      type="text"
                      product={{
                        id: menudetail.product.id,
                        name: menudetail.product.name,
                        image: menudetail.product.image,
                        price: menudetail.price,
                        storeName: store.name,
                        menudetailId: menudetail.id,
                      }}
                    ></AddToCartBtn>
                  </div>
                ))}
              </Box>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResultSection;
