import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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

export const getBlogCat = createAsyncThunk(
  "blogCategory/get-category",
  async (id, thunkAPI) => {
    try {
      return await bcatService.getBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateBlogCat = createAsyncThunk(
  "blogCategory/update-category",
  async (blogCat, thunkAPI) => {
    try {
      return await bcatService.updateBlogCategory(blogCat);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBlogCat = createAsyncThunk(
  "blogCategory/delete-category",
  async (id, thunkAPI) => {
    try {
      return await bcatService.deleteBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  bCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const bCategorySlice = createSlice({
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
      })
      .addCase(getBlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCatName = action.payload.title;
      })
      .addCase(getBlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBCategory = action.payload;
      })
      .addCase(updateBlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteBlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBCategory = action.payload;
      })
      .addCase(deleteBlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default bCategorySlice.reducer;
