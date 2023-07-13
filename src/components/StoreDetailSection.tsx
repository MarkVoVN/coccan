import { Box, Typography } from "@mui/material";
import React from "react";

function StoreDetailSection({
  store,
}: {
  store: { id: string; name: string; image: string; address: string };
}) {
  return (
    <div className="store-detail-section-wrapper">
      <Box
        className="store-detail-section-container"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "32px 0px",
        }}
      >
        <Box className="store-info-container">
          <Box className="store-title" sx={{ marginBottom: "16px" }}>
            <Typography variant="h3" fontWeight={600}>
              {store.name}
            </Typography>
          </Box>
          <div className="store-addresses">
            <Typography variant="h6">Address: {store.address}</Typography>
          </div>
          <div className="store-contact">
            <Typography variant="h6">Contact:</Typography>
          </div>
        </Box>
        <Box className="store-logo-container">
          <img
            width={216}
            height={216}
            src={store.image}
            alt={store.name + " store logo"}
          />
        </Box>
      </Box>
    </div>
  );
}

export default StoreDetailSection;
