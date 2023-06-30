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
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import { type } from "os";
import React, { useState } from "react";
import { Carousel, ScrollingCarousel } from "@trendyol-js/react-carousel";
import { Add, NavigateBefore, NavigateNext } from "@mui/icons-material";
import "../style/CategorySelectorSection.scss";

function CategorySeletorSection({
  storeList,
  handleSelectStore,
}: {
  storeList: { id: string; image: string; name: string }[];
  handleSelectStore: (store: {
    id: string;
    image: string;
    name: string;
  }) => void;
}) {
  return (
    <Carousel
      show={3.5}
      slide={1}
      infinite={true}
      swiping={true}
      leftArrow={<NavigateBefore></NavigateBefore>}
      rightArrow={<NavigateNext></NavigateNext>}
      className="carousel-container"
    >
      {storeList.map((store) => (
        // <Card
        //   className="store-card"
        //   sx={{ minWidth: 200, bgcolor: "primary" }}
        //   key={store.id}
        //   onClick={(e) => {
        //     handleSelectStore(store);
        //   }}
        // >
        //   <CardActionArea>
        //     <CardMedia
        //       component="img"
        //       image={store.image}
        //       height="140px"
        //     ></CardMedia>
        //     <CardContent>
        //       <Typography variant="body1" className="store-title" align="left">
        //         {store.name}
        //       </Typography>
        //     </CardContent>
        //   </CardActionArea>
        // </Card>
        <Box
          sx={{
            width: "240px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
          key={store.id}
        >
          <IconButton
            onClick={(e) => {
              handleSelectStore(store);
            }}
          >
            <Avatar
              src={store.image}
              sx={{
                width: "104px",
                height: "104px",
              }}
            />
          </IconButton>
          <Typography variant="body1" className="store-title" align="left">
            {store.name}
          </Typography>
        </Box>
      ))}
    </Carousel>
  );
}

export default CategorySeletorSection;
