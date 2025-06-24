import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (page = 1) => {
    const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
    return response.data;
  }
);

export const fetchCharacterDetails = createAsyncThunk(
  'characters/fetchCharacterDetails',
  async (id) => {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
    return response.data;
  }
);

const charactersSlice = createSlice({
  name: 'characters',
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
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = [...state.list, ...action.payload.results];
        state.page += 1;
        state.hasMore = !!action.payload.info.next;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCharacterDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacterDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(fetchCharacterDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFilter, resetDetails } = charactersSlice.actions;
export default charactersSlice.reducer;