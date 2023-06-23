"use client";

import {PayloadAction, createSlice} from "@reduxjs/toolkit"

export interface OrderdState {
  value: {
    isSetByUser: boolean,
    sessionId: string,
    locationId: string,
    timeslotId: string,
  };
  timeslotList: {id: string, startTime: string, endTime: string}[];
  locationList: {id: string, name: string, address: string, status: number}[];
}

const initialState : OrderdState = { value:
{
  isSetByUser: false,
  sessionId: '-1',
  locationId: '-1',
  timeslotId: '-1',
},
timeslotList: [],
locationList: [],
};

export const orderSlice = createSlice(
  {
    name: 'order',
    initialState,
    reducers: {
      setOrderInfo: (state, action : PayloadAction<{value : {
            timeslotId: string,
            locationId: string,
          }}>)  => {
          state.value = {
            isSetByUser: true,
            timeslotId: action.payload.value.timeslotId,
            locationId: action.payload.value.locationId,
            sessionId: initialState.value.sessionId,
          }
      },
      updateTimeslotId: (state, action : PayloadAction<string>) => {

          state.value = {
            isSetByUser: (action.payload !== '-1' && state.value.locationId !== '-1'),
            timeslotId: action.payload,
            locationId: state.value.locationId,
            sessionId: initialState.value.sessionId,
          }
        
      },
      updateLocationId: (state, action : PayloadAction<string>) => {
          state.value = {
            isSetByUser: (action.payload !== '-1' && state.value.timeslotId !== '-1'),
            timeslotId: state.value.sessionId,
            locationId: action.payload,
            sessionId: initialState.value.sessionId,
          }
      },
      setTimeslotList: (state, action : PayloadAction<{id: string, startTime: string, endTime: string}[]>) => {
        state.timeslotList = action.payload
      },

      setLocationList: (state, action : PayloadAction<{id: string, name: string, address: string, status: number}[]>) => {
        state.locationList = action.payload
      }
    }
  }
);

export const {setOrderInfo, updateTimeslotId, updateLocationId, setTimeslotList, setLocationList} = orderSlice.actions;

export default orderSlice.reducer;