"use client";

import {createSlice} from "@reduxjs/toolkit"

export interface SessionIdState {
  value: string;
}

const initialState : SessionIdState = { value: "-1" };

export const sessionIdSlice = createSlice(
  {
    name: 'sessionId',
    initialState,
    reducers: {
      setSelectedSessionId: (state, action) => {state.value = action.payload}
    }
  }
);

export const {setSelectedSessionId} = sessionIdSlice.actions;

export default sessionIdSlice.reducer;