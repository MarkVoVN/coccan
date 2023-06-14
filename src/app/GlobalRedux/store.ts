"use client";

import {configureStore} from '@reduxjs/toolkit';
import sessionIdReducer from "@/app/GlobalRedux/Features/counterSlice";

export const store = configureStore(
  {
    reducer: {
      sessionId: sessionIdReducer,
    }
  }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

