import React from "react";
import { Button, Typography } from "@mui/material";
import AddToCartBtn from "./AddToCartBtn";

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
    <div className="search-result-wrapper flex flex-row justify-center">
      <div className="w-[80vw] ">
        {searchResults.list.map((result) => (
          <div
            key={result.id}
            className="search-result-container flex flex-row items-center my-[2rem]"
          >
            <div className="search-result-logo-container h-full px-[2rem]">
              <img
                src={result.logoUrl}
                className="search-result-logo"
                alt={result.name + " logo"}
              />
            </div>
            <div className="search-result-info">
              <div className="search-result-name p-[1rem]">
                <Typography variant="h4">{result.name}</Typography>
              </div>
              <div className="search-result-list-container">
                {result.list.map((product) => (
                  <div
                    key={product.id}
                    className="product-container flex flex-row items-center"
                  >
                    <div className="product-img-container w-[25%] px-[1rem]">
                      <img
                        src={product.imgUrl}
                        className="product-img"
                        alt={product.name + " img"}
                      />
                    </div>
                    <div className="product-info flex flex-col w-full justify-evenly px-[2rem]">
                      <Typography
                        variant="h5"
                        className="product-name mb-[0.5rem]"
                      >
                        {product.name}
                      </Typography>
                      <Typography variant="h6" className="product-price">
                        {product.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </Typography>
                    </div>
                    <div className="product-add-to-cart-btn-container w-[1/6] mr-[1rem]">
                      <AddToCartBtn
                        type="text"
                        productId={product.id}
                      ></AddToCartBtn>
                    </div>
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
