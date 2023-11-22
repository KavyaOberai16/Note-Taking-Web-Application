import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
//import { noteOperations } from '../services/note-operation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchNotes, getTotalRecords, sortNote } from '../redux/note-slice';
import TextField from '@mui/material/TextField';
import { searchNote } from '../redux/note-slice';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import { apiClient } from '../../../shared/services/api-client';
import Container from '@mui/material/Container';
export const  List = (props)=>{
    // console.log('Props are', props.notes);
    const [sort, setSort] = useState('');
    // below code is for search bar and called to the note-slice file 
    const dispatch = useDispatch(); 
    const takeSearchValue = (event)=>{
        const searchValue = event.target.value;
        console.log('Search Value is', searchValue);
        const searchData = {search:searchValue};
        dispatch(searchNote(searchData));
    }
    // below code is for adding sort function
    const sortIt = (event)=>{
        const sortBy = event.target.value;
        setSort(sortBy);
        dispatch(sortNote({sortBy})); // here we formed an object and pushed the sortBy key and forwarded to the note-slice file. 
    }
    
    const notesObject = useSelector(state=>{
        console.log('****** State is', state.noteSlice.isLoading);
        return {'notes': state.noteSlice.notes, 'total': state.noteSlice.total, 'results':state.noteSlice['search-result'], 'isLoading':state.noteSlice.isLoading}; //notes and total extracted from the noteSlice
     }); // basically to retireve or extract data from the slice file and putted it into a notesObject
    useEffect(()=>{ // life cycle method
        console.log('Component Mount....'); // data will get mount with the help of useSelecter then belowit gets dispatch
        dispatch(getTotalRecords()); // push the data into the slice file
        dispatch(fetchNotes());
        // below we are calling from the apiclient file for network call to connect with the component which is not the appropriate method
        // const promise = apiClient.read();
        // promise.then(result=>{
        //   console.log('Result is ::::', result);
        // }).catch(err=>{
        //   console.log('Error is', err);
        // })
        
    },[]);
// below is the code for styling the table font 
const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

    return (<div>
        {/* below getting all the notes printed with the help of notepage file */}
        {/* <h1>Total Records{props.notes.length}</h1> */}
        {/* below we basically forwarde back the data to notepage in the form of props */}
        {/* <h1>{props.note.id} {props.note.title} {props.note.descr}</h1> */}
        <h1>Total Records{notesObject.total}</h1>
        {/* above will help in retrieving data */}
        {notesObject.isLoading?<p>Loading...</p>:<p>Data Comes...</p>}
        <TextField onChange={takeSearchValue} label="Search by Title" variant="outlined" />
        <br/>
        {/* code for adding sortfunction */}
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Sort"
          onChange={sortIt}
        >
          
          <MenuItem value="id">By id</MenuItem>
          <MenuItem value="title">By title</MenuItem>
          <MenuItem value="descr">By descr</MenuItem>
        </Select>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{backgroundColor:'black', color:'white'}}>
          <TableRow>
            <StyledTableCell align="left">Id</StyledTableCell>
            <StyledTableCell align="left">Title</StyledTableCell>
            <StyledTableCell align="left">Descr</StyledTableCell>
            <StyledTableCell align="left">Completion Date</StyledTableCell>
            <StyledTableCell align="left">Importance</StyledTableCell>
            <StyledTableCell align="left">Operations</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {/* below code is for search component  */}
            {notesObject.results.length > 0 ? (
    notesObject.results.map((note) => (
      <TableRow key={note.id}>
        <TableCell align="left">{note.id}</TableCell>
        <TableCell align="left">{note.title}</TableCell>
        <TableCell align="left">{note.descr}</TableCell>
        <TableCell align="left">{note.cdate}</TableCell>
        <TableCell align="left">{note.importance}</TableCell>
        {/* Update the next line to display operations or any other field */}
        <TableCell align="left">
          <i className="fa-solid fa-trash"></i>
          <i className="fa-solid fa-pen-to-square"></i>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={6}>No results found</TableCell>
    </TableRow>
  )}
</TableBody>
        </Table>
        </TableContainer>
    </div>)
} 