// Contains option for Main,View,Delete 
import {Route,Routes} from "react-router-dom"

import {Add} from "../../notes/components/Add"
import { Home } from "../../notes/components/Home"
import { List } from "../../notes/components/List"



export const Main = ()=>{
    return (
        <>
        <Routes>
            {/* below here it will get processed through NavBar link*/}
            <Route path="/" element={<Home/>}/> 
            <Route path="/add" element={<Add/>}/>
            <Route path="/view-all" element={<List/>}/>
        </Routes>
        </>
    )
}