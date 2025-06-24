import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEpisodes = createAsyncThunk(
  'episodes/fetchEpisodes',
  async (page = 1) => {
    const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`);
    return response.data;
  }
);

export const fetchEpisodeDetails = createAsyncThunk(
  'episodes/fetchEpisodeDetails',
  async (id) => {
    const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
    return response.data;
  }
);

const episodesSlice = createSlice({
  name: 'episodes',
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
      .addCase(fetchEpisodes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = [...state.list, ...action.payload.results];
        state.page += 1;
        state.hasMore = !!action.payload.info.next;
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchEpisodeDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEpisodeDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(fetchEpisodeDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFilter, resetDetails } = episodesSlice.actions;
export default episodesSlice.reducer;