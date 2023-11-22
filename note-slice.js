import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '../../../shared/services/api-client';
import produce from 'immer';


export const fetchNotes = createAsyncThunk('notes/fetch', async () => {
  try {
    const response = await apiClient.read();
    console.log('response is', response);
    return response;
  } catch (err) {
    console.log('Err is :::', err);
    throw err;
  }
});

const noteSlice = createSlice({
  name: 'noteslice',
  initialState: { notes: [], total: 0, 'search-result': [], isLoading: true, err: null },
  reducers: {
    addNote: (state, action) => {
        const noteObject = action.payload;
      
        // Ensure that 'descr' is a valid value (not undefined)
        noteObject.descr = noteObject.descr || '';
      
        console.log('Add Note Reducer Operation Called.... ', noteObject);
      
        // Use immer to ensure immutability
        const newState = produce(state, (draftState) => {
          // Stringify the Note object to handle non-serializable values
          const serializedNote = JSON.parse(JSON.stringify(noteObject));
          draftState.notes.push(serializedNote);
        });
      
        // Update the state
        return newState;
      },
      
      
      
    getTotalRecords(state, action) {
      if (state.notes) {
        state.total = state.notes.length;
      } else {
        state.total = 0;
      }
    },
    removeNote(state, action) {
      // Implement your removeNote logic if needed
    },
    searchNote(state, action) {
      const searchObj = action.payload;
      console.log('Search Obj ::::', searchObj);
      state['search-result'] = state.notes.filter(note => note.id === searchObj.search);
    },
    sortNote(state, action) {
      const sortObject = action.payload;
      const key = sortObject.sortBy;
      state.notes.sort((first, second) => {
        if (key === 'id') {
          return first[key] - second[key];
        } else {
          return first[key].localeCompare(second[key]);
        }
      });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state, action) => {
      state.isLoading = true;
      console.log('Pending...', action.payload);
    })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        console.log('Fulfilled...', action.payload);
        state.isLoading = false;
        state.notes = action.payload;
      }).addCase(fetchNotes.rejected, (state, action) => {
        console.log('Rejected...', action.payload);
        state.isLoading = false;
        state.notes = [];
        state.err = action.payload;
      });
  }
});

export const { addNote, removeNote, getNote, getTotalRecords, searchNote, sortNote } = noteSlice.actions;
export default noteSlice.reducer;
