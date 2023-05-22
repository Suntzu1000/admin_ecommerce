import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bcatService from "./bcatService";

export const getCategories = createAsyncThunk(
  "blogCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await bcatService.getBlogCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createNewBlogCat = createAsyncThunk(
  "blogCategory/create-category",
  async (bcatData, thunkAPI) => {
    try {
      return await bcatService.createNewBlogCategory(bcatData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  bCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const pCategorySlice = createSlice({
  name: "bCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bCategories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createNewBlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewBlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlogCategory = action.payload;
      })
      .addCase(createNewBlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default pCategorySlice.reducer;
