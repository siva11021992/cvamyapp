import React,{useState,createContext,useEffect} from 'react';

import Page from './Page';

const UserContext = createContext();

 function ContextApi (){

           const[user,setUser] = useState(null);

    useEffect(() =>{
        const fetchUser = () =>{
         fetch("https://jsonplaceholder.typicode.com/users")
         .then((response)=>response.json())
         .then((result)=>setUser(result?.[0]?.company))
         .catch((error)=>console.error("server side error"))
        }
        fetchUser();
    },[]);
    return (
        <UserContext.Provider  value={user}>
        <h1>Hi</h1>
        <Page />
        </UserContext.Provider>
    )
}
export default ContextApi;