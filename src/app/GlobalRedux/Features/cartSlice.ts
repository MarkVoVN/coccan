"use client";

import {PayloadAction, createSlice} from "@reduxjs/toolkit"

export interface CartState {
  value: 
    {
      productId: string,
      name: string;
      image: string;
      price: number;
      storeName: string,
      quantity : number,
      menudetailId: string;
    }[]
  countOfItem : number,
  countOfItemQuantity : number
}

const initialState : CartState = { 
  value: [],
  countOfItem: 0,
  countOfItemQuantity: 0,
};

export const cartSlice = createSlice(
  {
    name: 'cart',
    initialState,
    reducers: {
      setCart: (_, action : PayloadAction<CartState>) => {
        return action.payload
      },

      resetCart: () => {
        return initialState
      },

      addToCartSingle: (state, action : PayloadAction<{product: {
        id: string;
        name: string;
        image: string;
        price: number;
        storeName: string;
        menudetailId: string;
      }}>) => {
        let item = state.value.find(item => item.menudetailId === action.payload.product.menudetailId);
        if (item) {
          //if item is already in cart, increment the quantity
          item.quantity++;
          state.countOfItemQuantity++;
        } else {
          //if item is not in cart, add item to cart
          state.value.push({ 
            productId: action.payload.product.id, 
            name : action.payload.product.name, 
            image : action.payload.product.image, 
            price : action.payload.product.price, 
            storeName : action.payload.product.storeName,
            quantity: 1,
            menudetailId : action.payload.product.menudetailId});
          state.countOfItem++;
          state.countOfItemQuantity++;
        }
      },
      incrementItem: (state, action : PayloadAction<string>) => {
        let item = state.value.find(item => item.menudetailId === action.payload);
        if (item) {
          //if item is already in cart, increment the quantity
          item.quantity++;
          state.countOfItemQuantity++;
        }
      },

      subtractFromCartSingle: (state, action : PayloadAction<string>) => {
        let item = state.value.find(item => item.menudetailId === action.payload);
        if (item) {
          //if item is already in cart, increment the quantity
          item.quantity--;
          state.countOfItemQuantity--;
        }
        if (item?.quantity === 0) {
          state.value.splice(state.value.indexOf(item), 1);
        }
      },



      addToCartByAmount: (state, action : PayloadAction<{product: {
        id: string;
        name: string;
        image: string;
        price: number;
        storeName: string;
        menudetailId: string;
      }, amount: number}>) => {
        let item = state.value.find(item => item.menudetailId === action.payload.product.menudetailId);
        if (item) {
          //if item is already in cart, increment the quantity
          item.quantity+= action.payload.amount;
          state.countOfItemQuantity+= action.payload.amount;
        } else {
          //if item is not in cart, add item to cart
          state.value.push({ 
            productId: action.payload.product.id, 
            name : action.payload.product.name, 
            image : action.payload.product.image, 
            price : action.payload.product.price, 
            storeName : action.payload.product.storeName,
            quantity: action.payload.amount,
            menudetailId: action.payload.product.menudetailId});
          state.countOfItem++;
          state.countOfItemQuantity+= action.payload.amount;
        }

      },

      removeFromCart: (state, action : PayloadAction<string>) => {
        let item = state.value.find(item => item.menudetailId === action.payload);
        if (item) {
          //if item is already in cart, increment the quantity
          state.countOfItemQuantity -= item.quantity;
          state.countOfItem--;
          state.value.splice(state.value.indexOf(item), 1);
        }
      }
    }
  }
);

export const {setCart, resetCart, addToCartSingle, incrementItem, subtractFromCartSingle, addToCartByAmount, removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;