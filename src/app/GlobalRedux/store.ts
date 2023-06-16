"use client";

import {configureStore} from '@reduxjs/toolkit';
import userReducer from "@/app/GlobalRedux/Features/userSlice";
import orderReducer from "@/app/GlobalRedux/Features/orderSlice";
import cartReducer from "@/app/GlobalRedux/Features/cartSlice";
import categoryReducer from './Features/categorySlice';

export const store = configureStore(
  {
    reducer: {
      order: orderReducer,
      user: userReducer,
      cart: cartReducer,
      category: categoryReducer,
    }
  }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

