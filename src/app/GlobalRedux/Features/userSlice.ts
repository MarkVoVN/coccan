"use client";

import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store";

export interface UserState {
  value : {
    isAuth: boolean;
    displayName: string | undefined,
    email: string | undefined,
    photoURL: string | undefined,
    uid: string,
    refreshToken: string,
    preferedLocationId: string
    balance: number,
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
    preferedLocationId: "-1",
    balance: -1
  }

};

export const userSlice = createSlice(
  {
    name: 'user',
    initialState,
    reducers: {
      loginUser: (_, action : PayloadAction<{value: {
        displayName: string | undefined,
        email: string | undefined,
        photoURL: string | undefined,
        uid: string,
        refreshToken: string,
        preferedLocationId: string
        balance: number,
      }}>) => {
        return {
          value: {
            isAuth: true,
            displayName: action.payload.value.displayName,
            email: action.payload.value.email,
            photoURL: action.payload.value.photoURL,
            uid: action.payload.value.uid,
            refreshToken: action.payload.value.refreshToken,
            preferedLocationId: action.payload.value.preferedLocationId,
            balance: action.payload.value.balance,
          }
        }
      },
      logoutUser: (_) => initialState,
      updatePreferedLocation: (state, action: PayloadAction<string>) => {
        state.value.preferedLocationId = action.payload;
        //TODO: call api to update prefered location on BE
      },
    }
  }
);

export const {loginUser, logoutUser, updatePreferedLocation} = userSlice.actions;

export default userSlice.reducer;

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;