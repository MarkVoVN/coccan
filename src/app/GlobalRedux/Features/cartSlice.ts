"use client";

import {PayloadAction, createSlice} from "@reduxjs/toolkit"

export interface CartState {
  value: 
    {
      menuItemId: string,
      name: string;
      image: string;
      price: number;
      quantity : number,
    }[]
  countOfItem : number,
  countOfItemQuantity : number
}

const initialState : CartState = { 
  value: [],
  countOfItem: 0,
  countOfItemQuantity: 0
};

export const cartSlice = createSlice(
  {
    name: 'cart',
    initialState,
    reducers: {
      setCart: (_, action : PayloadAction<CartState>) => {
        return action.payload
      },

      addToCartSingle: (state, action : PayloadAction<{product: {
        id: string;
        name: string;
        image: string;
        price: number;
      }}>) => {
        let item = state.value.find(item => item.menuItemId === action.payload.product.id);
        if (item) {
          //if item is already in cart, increment the quantity
          item.quantity++;
          state.countOfItemQuantity++;
        } else {
          //if item is not in cart, add item to cart
          state.value.push({ menuItemId: action.payload.product.id, name : action.payload.product.name, image : action.payload.product.image, price : action.payload.product.price, quantity: 1});
          state.countOfItem++;
          state.countOfItemQuantity++;
        }
      },

      subtractFromCartSingle: (state, action : PayloadAction<string>) => {
        let item = state.value.find(item => item.menuItemId === action.payload);
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
      }, amount: number}>) => {
        let item = state.value.find(item => item.menuItemId === action.payload.product.id);
        if (item) {
          //if item is already in cart, increment the quantity
          item.quantity+= action.payload.amount;
          state.countOfItemQuantity+= action.payload.amount;
        } else {
          //if item is not in cart, add item to cart
          state.value.push({ menuItemId: action.payload.product.id, name : action.payload.product.name, image : action.payload.product.image, price : action.payload.product.price, quantity: action.payload.amount});
          state.countOfItem++;
          state.countOfItemQuantity+= action.payload.amount;
        }

      },

      removeFromCart: (state, action : PayloadAction<string>) => {
        let item = state.value.find(item => item.menuItemId === action.payload);
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

export const {setCart, addToCartSingle, subtractFromCartSingle, addToCartByAmount, removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;