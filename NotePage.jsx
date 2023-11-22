import { useState } from "react";
import { Header } from "../../../shared/components/Header"
import { Add } from "../components/Add"
import { List } from "../components/List"
import {container} from '@mui/material/Container';
import { noteOperations } from "../services/note-operation";

export const NotePage = ()=>{
    console.log('Note Page Call');
    // below we used hook because we want from VDOM=>DOM for rerendering as react does not follow the normal form
    const [notes, setNotes] = useState([]);
    const collectNoteData = ()=>{
        
        // console.log('Rec data from Add', noteObject,'');
        
        // below getting all notes printed from the note operations file 
        setNotes([...noteOperations.getNotes()]);  // setNotes changes the status
        // above [] brackets helps in forming new array and ... helps in cloning new address of the array
    
    }
    return (<container fixed>
         <Header/>
         {/* below we basically forwarded the object in fn(CollectNoteData) form to reach the Add part  */}
        <Add fn = {collectNoteData}/>
          {/*below we basically we forwarded the object in note form to the list file  */}
        <List notes = {notes} />
    </container>)
}