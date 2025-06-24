import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLocations = createAsyncThunk(
  'locations/fetchLocations',
  async (page = 1) => {
    const response = await axios.get(`https://rickandmortyapi.com/api/location?page=${page}`);
    return response.data;
  }
);

export const fetchLocationDetails = createAsyncThunk(
  'locations/fetchLocationDetails',
  async (id) => {
    const response = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
    return response.data;
  }
);

const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    list: [],
    details: null,
    status: 'idle',
    error: null,
    page: 1,
    hasMore: true,
    filter: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    resetDetails: (state) => {
      state.details = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = [...state.list, ...action.payload.results];
        state.page += 1;
        state.hasMore = !!action.payload.info.next;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchLocationDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLocationDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(fetchLocationDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFilter, resetDetails } = locationsSlice.actions;
export default locationsSlice.reducer;