"use client";

import React from "react";
import { Button, Typography } from "@mui/material";
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
              />
            </div>
            <div className="search-result-info">
              <div className="search-result-name">
                <Typography
                  variant="h4"
                  fontWeight="500"
                  onClick={() => router.push(`/store/${store.id}`)}
                >
                  {store.name}
                </Typography>
              </div>
              <div className="search-result-list-container">
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
                      <div className="product-img-container">
                        <img
                          src={menudetail.product.image}
                          className="product-img"
                          alt={menudetail.product.name + " img"}
                          height="96px"
                        />
                      </div>
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResultSection;
