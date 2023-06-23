import React from "react";
import { Button, Typography } from "@mui/material";
import AddToCartBtn from "./AddToCartBtn";
import "../style/SearchResultSection.scss";

function SearchResultSection({
  searchResults,
}: {
  searchResults: {
    type: string;
    list: {
      id: string;
      name: string;
      logoUrl: string;
      list: {
        id: string;
        name: string;
        imgUrl: string;
        price: number;
      }[];
    }[];
  };
}) {
  return (
    <div className="search-result-wrapper">
      <div className="container">
        {searchResults.list.map((result) => (
          <div key={result.id} className="search-result-container">
            <div className="search-result-logo-container">
              <img
                src={result.logoUrl}
                className="search-result-logo"
                alt={result.name + " logo"}
              />
            </div>
            <div className="search-result-info">
              <div className="search-result-name">
                <Typography variant="h4" fontWeight="500">
                  {result.name}
                </Typography>
              </div>
              <div className="search-result-list-container">
                {result.list.map((product) => (
                  <div key={product.id} className="search-product-container">
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
                          src={product.imgUrl}
                          className="product-img"
                          alt={product.name + " img"}
                          height="96px"
                        />
                      </div>
                      <div className="product-info">
                        <Typography variant="h5" className="product-name">
                          {product.name}
                        </Typography>
                        <Typography variant="h6" className="product-price">
                          {product.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </Typography>
                      </div>
                    </div>
                    <AddToCartBtn
                      type="text"
                      productId={product.id}
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
