"use client";

import { Box, Stack, Typography, SvgIcon } from "@mui/material";
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
        </Box>
      </Box>
    </Box>
  );
}

export default CategorySeletorSection;
