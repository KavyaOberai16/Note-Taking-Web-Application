// contains the link or reference for view all,delete,add 
import {NavLink} from "react-router-dom"; 
export const NavBar = ()=>{
    return (
        <>
        {/* below '/' basically leads us to the Main.jsx where the routing of home will be enabled */}
        <NavLink to="/">Home</NavLink>
        <br/> 
        <NavLink to="/add">Add Note</NavLink>
        <br/>
        <NavLink to="/view-all">View All</NavLink>
        {/* <NavLink to="/delete">Delete Notes</NavLink> 
    <NavLink to="/search">Search Notes</NavLink> */}
        </>
    )
} 