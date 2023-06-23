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
  handleSelectStore: (store: {
    id: string;
    image: string;
    name: string;
  }) => void;
}) {
  return (
    <Box className="category-wrapper">
      <Box className="category-section-container">
        <Typography variant="h3" className="category-title">
          Store
        </Typography>
        <Box
          className="store-list"
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          {storeList.map((store) => (
            <Card
              className="store-card"
              sx={{ minWidth: 200, bgcolor: "primary" }}
              key={store.id}
              onClick={(e) => {
                handleSelectStore(store);
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={store.image}
                  height="140px"
                ></CardMedia>
                <CardContent>
                  <Typography
                    variant="body1"
                    className="store-title"
                    align="left"
                  >
                    {store.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    className="store-title"
                    align="left"
                  >
                    Address: TBA
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default CategorySeletorSection;
