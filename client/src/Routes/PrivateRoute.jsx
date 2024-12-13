import React, { useContext } from 'react'
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  
    const {user} = useContext(AuthContext);
   console.log(user);
   
    if(user){
        return <Navigate to = "/"/>
        
    } else if(user===null){
      return  <Navigate to = "/login"/>
    } else{
        return <Outlet/> 
      }
}

export default PrivateRoute