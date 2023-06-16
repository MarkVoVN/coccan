"use client";

import {PayloadAction, createSlice, createAsyncThunk} from "@reduxjs/toolkit"


export interface CategoriesState {
  value: {  
    categoryId: string,
    name: string,
  }[],
  loading: boolean,
  error: string
}

const initialCategoriesState : CategoriesState = {
  value: [],
  loading: true,
  error: "",
};

export const categoriesSlice = createSlice(
  {
    name: 'categories',
    initialState: initialCategoriesState,
    reducers: {
      setCategories: (state, action : PayloadAction<{categoryId: string, name: string}[]>) => {
        if (action.payload.length > 0) {
          return {
            value: action.payload,
            loading: false,
            error: ""
          }
        }
        return {
          value: [],
          loading: false,
          error: "loading failed"
        }
      },

    }
  }
);

export const {setCategories} = categoriesSlice.actions;

export default categoriesSlice.reducer;