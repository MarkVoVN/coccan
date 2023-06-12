import React from "react";
import { Modal, Typography, Box, Button, IconButton } from "@mui/material";
import "@/style/ProductDetailModal.scss";
import { ArrowBackIos } from "@mui/icons-material";

function ProductDetailModal({
  open,
  handleClose,
  product,
}: {
  open: boolean;
  handleClose: () => void;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    storeName: string;
  };
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modal-wrapper flex flex-row justify-center items-center"
    >
      <div className="modal-container">
        <div className="modal-title px-[2rem] flex flex-row">
          <IconButton onClick={handleClose} size="large" className="">
            <ArrowBackIos></ArrowBackIos>
          </IconButton>

          <div className="w-full flex flex-row justify-center py-[0.3rem] pr-12">
            <Typography variant="h4" className="font-thin">
              Product detail
            </Typography>
          </div>
        </div>
        <div className="modal-body flex flex-row ">
          <div className="product-img-container w-[20vw] h-fit m-[2rem] p-[1rem]">
            <img src={product.imageUrl} alt={"Image of " + product.name}></img>
          </div>
          <div className="product-info flex flex-col  w-[30vw] p-[2rem]">
            <Typography variant="h3" className="my-[1rem]">
              {product.name}
            </Typography>
            <Typography variant="h6" className="mb-[2rem] font-thin">
              {product.description}
            </Typography>
            <Typography variant="h5" className="my-[1rem]">
              {"Store: " + product.storeName}
            </Typography>
            <Typography variant="h4">
              {product.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
            <Button
              variant="contained"
              size="large"
              className="w-full self-center px-[1rem] bg-[#EA5857] mt-[2rem]"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ProductDetailModal;
