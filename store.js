// this file is for storing data and act as a container which holds your application together
import {configureStore} from '@reduxjs/toolkit';
import noteSlice from '../../modules/notes/redux/note-slice';
export default configureStore({
    reducer:{
        // below it is being called from the note-slice app
        noteSlice 
    }
});