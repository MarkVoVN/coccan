"use client";

import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { Carousel } from "@trendyol-js/react-carousel";
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
      dynamic
    >
      {storeList.map((store) => (
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
