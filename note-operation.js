// CRUD logic
// now this file will become centralised which means it will connect add, delet, view-all. now the communication will not be done through props.

import { Note } from "../models/note"


export const noteOperations = {
    notes:[], // here we formed an array
    addNote(id, title, descr, cdate, importance){
        // below we basically pushed the noteObject into an array and transferred it into the note.js file after recieving from add file
        const noteObject = new Note(id, title, descr, cdate, importance);
        this.notes.push(noteObject);
        console.log('All notes are ', this.notes);
        return noteObject;
    },
    getNotes(){
        return this.notes;
    }
}