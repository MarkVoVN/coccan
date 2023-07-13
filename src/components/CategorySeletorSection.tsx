"use client";

import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import { Carousel } from "@trendyol-js/react-carousel";
import theme from "../app/theme";
import "../style/CategorySelectorSection.scss";

function CategorySeletorSection({
  storeList,
  handleSelectStore,
  SelectedStore,
}: {
  storeList: { id: string; image: string; name: string }[];
  handleSelectStore: (store: {
    id: string;
    image: string;
    name: string;
  }) => void;
  SelectedStore:
    | {
        id: string;
        image: string;
        name: string;
      }
    | undefined;
}) {
  return (
    <ThemeProvider theme={theme}>
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
            }}
            key={store.id}
            // className={
            //   SelectedStore
            //     ? store.id == SelectedStore.id
            //       ? "selected"
            //       : ""
            //     : ""
            // }
          >
            <Button
              variant={
                SelectedStore
                  ? store.id == SelectedStore.id
                    ? "contained"
                    : "outlined"
                  : "text"
              }
              onClick={(e) => {
                handleSelectStore(store);
              }}
            >
              <img
                src={store.image}
                alt={store.name + "logo"}
                className="store-image"
                width={100}
                height={100}
              />
              <Typography variant="body1" className="store-title" align="left">
                {store.name}
              </Typography>
            </Button>
          </Box>
        ))}
      </Carousel>
    </ThemeProvider>
  );
}

export default CategorySeletorSection;
