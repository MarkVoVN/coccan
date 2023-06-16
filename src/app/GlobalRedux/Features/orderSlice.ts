"use client";

import {PayloadAction, createSlice} from "@reduxjs/toolkit"

export interface OrderdState {
  value: {
    isSetByUser: boolean,
    sessionId: string,
    locationId: string,
  };
}

const initialState : OrderdState = { value:
{
  isSetByUser: false,
  sessionId: '-1',
  locationId: '-1',
} };

export const orderSlice = createSlice(
  {
    name: 'order',
    initialState,
    reducers: {
      setOrderInfo: (_, action : PayloadAction<{value : {
            sessionId: string,
            locationId: string,
          }}>)  => {
        return {
          value: {
            isSetByUser: true,
            sessionId: action.payload.value.sessionId,
            locationId: action.payload.value.locationId
          }
        }
      },
      updateSessionId: (state, action : PayloadAction<string>) => {
        return {
          value: {
            isSetByUser: (action.payload !== '-1' && state.value.locationId !== '-1'),
            sessionId: action.payload,
            locationId: state.value.locationId
          }
        }
      },
      updateLocationId: (state, action : PayloadAction<string>) => {
        return {
          value: {
            isSetByUser: (action.payload !== '-1' && state.value.sessionId !== '-1'),
            sessionId: state.value.sessionId,
            locationId: action.payload
          }
        }
      },

    }
  }
);

export const {setOrderInfo, updateSessionId, updateLocationId} = orderSlice.actions;

export default orderSlice.reducer;