"use client";

import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store";

export interface UserState {
  value : {
    isAuth: boolean;
    displayName: string | null,
    email: string | null,
    photoURL: string | null,
    uid: string,
    refreshToken: string,
  }

}

const initialState : UserState = {
  value : {
    isAuth: false,
    displayName: "defaultName",
    email: "",
    photoURL: "",
    uid: "",
    refreshToken: "",
  }

};

export const userSlice = createSlice(
  {
    name: 'user',
    initialState,
    reducers: {
      loginUser: (state, action : PayloadAction<{value: {
        displayName: string | null,
        email: string | null,
        photoURL: string | null,
        uid: string,
        refreshToken: string,
      }}>) => {
        return {
          value: {
            isAuth: true,
            displayName: action.payload.value.displayName,
            email: action.payload.value.email,
            photoURL: action.payload.value.photoURL,
            uid: action.payload.value.uid,
            refreshToken: action.payload.value.refreshToken,
          }
        }
      },
      logoutUser: (state) => {initialState},
    }
  }
);

export const {loginUser, logoutUser} = userSlice.actions;

export default userSlice.reducer;

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;