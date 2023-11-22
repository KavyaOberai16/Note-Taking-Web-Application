import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import DescriptionIcon from '@mui/icons-material/Description';
import Box from '@mui/material/Box';
import TitleIcon from '@mui/icons-material/Title';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import { noteOperations } from '../services/note-operation';

import { MuiColorInput } from 'mui-color-input'
import dayjs from 'dayjs';
import { addNote } from '../redux/note-slice';
import { Note } from '../models/note';
import {useDispatch} from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useForm} from 'react-hook-form';
import { FormDatePicker } from '../../../shared/components/FormDatePicker';
import './Add.css';
export const Add = (props)=>{
  const {control, register, handleSubmit, formState:{errors}} = useForm(); // for creating form
  // handling registeraton, submit all at once with the help of useform hook  
  const id = useRef('');
    const title = useRef('');
    const descr = useRef('');
    const [dateValue, setDateValue] = useState(null);
    // below we have used usestate for color palette
    const [colorValue, setColorValue] = useState('#ffffff');
    const [open, setOpen] = useState(false); // for getting the notificaton that the note has been added
    const dispatch = useDispatch(); // here dispatch hook is being used so that action can be forwarded 
    
    // below is the cod for snackbar
    const handleClose = ()=>setOpen(false);
    const onSubmit = (data)=>{
      console.log('Data is', data);
    }
    const action = <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>

    const takeNote = ()=>{
      const idValue = id.current.value;
      const titleValue = title.current.value;
      const descrValue = descr.current.value;
      const date = dateValue ? dayjs(dateValue).format('MM/DD/YYYY') : '';
    
      // Create a plain JavaScript object
      const noteObject = {
        id: idValue,
        title: titleValue,
        descr: descrValue,
        cdate: date,
        importance: colorValue,
      };
    
      dispatch(addNote(noteObject));
      setOpen(true);
    
        //  below we basically forwarded back the note object to notepage file in props form
    // const noteObject = {'id':idValue, 'title':titleValue, 'descr':descValue}; 
    
    // const noteObject = noteOperations.addNote(idValue, titleValue, descrValue, '', '');
    // above we basically are converting the note into object and hand it over to note-operations file
    
    // noteOperations.addNote(idValue, titleValue, descrValue, date, colorValue);
    // props.fn(); // call collectNoteData from notepage file
    }
    return (<>
    

    <Box sx={{
        margin:5 , flexDirection:'column', display:'flex'
      }}>
        <form onSubmit={handleSubmit(takeNote)}>
       <FormControl>
       <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note Added"
        action={action}
      />
        

        <TextField
        id="note-id"
        {...register('id')}
        label="Id"
        inputRef = {id}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DescriptionIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
        />
        <TextField
        id="note-title"
        {...register('title', {required:true, minLength:3, pattern:/^[a-z]{3,10}/})}
        label="Title"
        inputRef = {title}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TitleIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
        />
        {errors.title && errors.title.type==='required' && (<p className='errorMsg'>Title Is Required</p>)}
        {errors.title && errors.title.type==='minLength' && (<p className='errorMsg'>Title Min Length Is 3</p>)}
        <TextField
        id="note-desc"
        label="Description"
        {...register('descr', {validate:{
          checkLength:(value)=>value.length >=6
        }})}
        //inputRef = {descr}
        multiline
        maxRows={4}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FormatIndentIncreaseIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
        />
        {errors.descr?.type === 'checkLength' && (<p>Min Length for Descr is</p>)}
        <FormDatePicker name="cdate" {...register('cdate')} control = {control}/>
        
        {/* below is the code for color  */}
        <MuiColorInput {...register('importance')} value={colorValue} onChange={(selectedColor)=>setColorValue(selectedColor)} />
         <Button type='submit' variant="contained" color='info'>Add Note</Button>
         </FormControl>
         </form>
        </Box>  
    </>)
}