import React,{useState,useContext,createContext,useEffect} from 'react';

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
console.log("user",user)
    return (
        <UserContext.Provider  value={user}>
        <h1>Hi</h1>
        {/* <Page /> */}
        </UserContext.Provider>
    )
}


// function Page (){
//     const user = useContext(UserContext);
//     if(user?.name){
//         return <p>you are logged in {user?.name}</p>
//     }else{
//         return <p>you are not logged in</p>
//     }
// }
export default ContextApi;