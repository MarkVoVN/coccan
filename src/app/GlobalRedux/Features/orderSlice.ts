"use client";

import {PayloadAction, createSlice} from "@reduxjs/toolkit"

export interface OrderdState {
  value: {
    isSetByUser: boolean,
    sessionId: string,
    locationId: string,
    timeslotId: string,
    menuId: string,
    isUpdating: boolean,
  };
  timeslotList: {id: string, startTime: string, endTime: string}[];
  locationList: {id: string, name: string, address: string, status: number}[];
}

const initialState : OrderdState = { value:
{
  isSetByUser: false,
  sessionId: '',
  locationId: '',
  timeslotId: '',

  menuId: '',
  isUpdating: true,

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
            sessionId: string,
            menuId: string,
          }}>)  => {
            state.value.isSetByUser = true
            state.value.timeslotId = action.payload.value.timeslotId
            state.value.locationId = action.payload.value.locationId
            state.value.sessionId = action.payload.value.sessionId
            state.value.menuId = action.payload.value.menuId
            state.value.isUpdating = true

          
      },
      updateTimeslotId: (state, action : PayloadAction<string>) => {
          state.value.isSetByUser = (action.payload !== '' && state.value.locationId !== '')
          state.value.timeslotId = action.payload
          state.value.isUpdating = true


      },
      updateLocationId: (state, action : PayloadAction<string>) => {
          state.value.isSetByUser = (action.payload !== '' && state.value.locationId !== '')
          state.value.locationId = action.payload
          state.value.isUpdating = true

      },
      updateSessionId: (state, action : PayloadAction<string>) => {
        state.value.sessionId = action.payload;
        state.value.isUpdating = true

      },
      updateMenuId: (state, action : PayloadAction<string>) => {
        state.value.menuId = action.payload;
        state.value.isUpdating = true


      },
      setTimeslotList: (state, action : PayloadAction<{id: string, startTime: string, endTime: string}[]>) => {
        state.timeslotList = action.payload
        state.value.isUpdating = true

      },

      setLocationList: (state, action : PayloadAction<{id: string, name: string, address: string, status: number}[]>) => {
        state.locationList = action.payload
        state.value.isUpdating = true
      },

      finishUpdate: (state) => {
        state.value.isUpdating = false
      }

    }
  }
);

export const {setOrderInfo, updateTimeslotId, updateLocationId, updateSessionId, updateMenuId, finishUpdate, setTimeslotList, setLocationList} = orderSlice.actions;

export default orderSlice.reducer;