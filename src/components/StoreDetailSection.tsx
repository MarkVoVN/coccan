import { Typography } from "@mui/material";
import React from "react";

function StoreDetailSection({
  store,
}: {
  store: { id: string; name: string; image: string; address: string };
}) {
  return (
    <div className="store-detail-section-wrapper flex flex-row justify-center">
      <div className="store-detail-section-container w-[80%] flex flex-row justify-between">
        <div className="store-info-container p-[1rem]">
          <div className="store-title">
            <Typography variant="h1">{store.name}</Typography>
          </div>
          <div className="store-addresses flex flex-row">
            <Typography variant="h6" className="mr-[1rem]">
              Address:
            </Typography>
            <Typography variant="h6">{store.address}</Typography>
          </div>
          <div className="store-contact flex flex-row">
            <Typography variant="h6" className="mr-[1rem]">
              Contact:
            </Typography>{" "}
          </div>
        </div>
        <div className="store-logo-container p-[1rem]">
          <img src={store.image} alt={store.name + " store logo"} />
        </div>
      </div>
    </div>
  );
}

export default StoreDetailSection;
