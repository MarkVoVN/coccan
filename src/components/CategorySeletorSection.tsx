"use client";

import {
  Box,
  Stack,
  Typography,
  SvgIcon,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
} from "@mui/material";
import Image from "next/image";
import React from "react";

function CategorySeletorSection({
  storeList,
  handleSelectStore,
}: {
  storeList: { id: string; image: string; name: string }[];
  handleSelectStore: (id: string) => void;
}) {
  return (
    <Box className="category-wrapper">
      <Box className="category-section-container">
        <Typography variant="h3" className="category-title">
          Store
        </Typography>
        <Box
          className="store-list"
          sx={{ display: "flex", flexDirection: "row", gap: "16px" }}
        >
          <Card
            className="store-card"
            sx={{ minWidth: 240, bgcolor: "primary" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                image="/search/store-logo-placeholder.svg"
                height="144px"
              ></CardMedia>
              <CardContent>
                <Typography variant="h4" className="store-title" align="left">
                  666 Bakery
                </Typography>
                <Typography
                  variant="subtitle2"
                  className="store-title"
                  align="left"
                >
                  Address: ABC Street
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            className="store-card"
            sx={{ minWidth: 240, bgcolor: "primary" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                image="/search/store-logo-placeholder.svg"
                height="144px"
              ></CardMedia>
              <CardContent>
                <Typography variant="h4" className="store-title" align="left">
                  666 Bakery
                </Typography>
                <Typography
                  variant="subtitle2"
                  className="store-title"
                  align="left"
                >
                  Address: ABC Street
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            className="store-card"
            sx={{ minWidth: 240, bgcolor: "primary" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                image="/search/store-logo-placeholder.svg"
                height="144px"
              ></CardMedia>
              <CardContent>
                <Typography variant="h4" className="store-title" align="left">
                  666 Bakery
                </Typography>
                <Typography
                  variant="subtitle2"
                  className="store-title"
                  align="left"
                >
                  Address: ABC Street
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
        {/* <Box className="category-list">
          {categoryList.map((category) => (
            // <Box className="category-container" key={category.categoryId}>
            //   <Box className="category-icon-container">
            //     <img
            //       src={"/homepage/category/" + category.categoryIconUrl}
            //       alt={category.name}
            //     ></img>
            //   </Box>
            //   <Typography variant="h5">{category.name}</Typography>
            // </Box>
          Stores
        </Typography>
        <Box className="category-list">
          {storeList.map((store) => (
            <Box
              className="category-container"
              key={store.id}
              onClick={(e) => {
                handleSelectStore(store.id);
              }}
            >
              <Box className="category-icon-container">
                <img src={store.image} alt={store.name}></img>
              </Box>
              <Typography variant="h5">{store.name}</Typography>
            </Box>
          ))}
        </Box> */}
      </Box>
    </Box>
  );
}

export default CategorySeletorSection;
