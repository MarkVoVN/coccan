"use client";

import {PayloadAction, createSlice} from "@reduxjs/toolkit"

export interface Staff {
  id: string,
  name: string,
  email: string,
  image: string,
  phone: string,
  role: number,
  status: number,
  token: string,
  //isTokenVerified: boolean
}

const initialState : Staff = {
  id: "001",
  name: "Test Staff",
  email: "testStaff@example.com",
  image: "testImage",
  phone: "0123456789",
  role: 0,
  status: 0,
  token: "",
  //isTokenVerified: false
};

export const staffSlice = createSlice(
  {
    name: 'sessionId',
    initialState,
    reducers: {
      loginStaff: (state, action : PayloadAction<{
        id: string,
        name: string,
        email: string,
        image: string,
        phone: string,
        role: number,
        status: number
        token: string
        }>) => {
            state = action.payload
      },
      // setTokenVerified: (state) => {state.isTokenVerified = true},
      logoutStaff: () => {initialState}
    }
  }
);

export const {loginStaff, logoutStaff} = staffSlice.actions;

export default staffSlice.reducer;