import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTotalRecords } from '../../modules/notes/redux/note-slice';
export const Header = ()=>{
  const dispatch = useDispatch();
  const {total} = useSelector((state)=>state.noteSlice);
  useEffect(()=>{
    dispatch(getTotalRecords());
  })
    return( <AppBar style={{background: '#000000'}} position="static">
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Note Taking App
      </Typography>
      <Typography>
        Total Records {total} &nbsp;&nbsp;&nbsp;
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>

    )
}