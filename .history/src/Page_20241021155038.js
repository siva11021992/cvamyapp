import React,{useContext} from 'react';
import ContextApi from './ContextApi';

const Page = () => {
    const user = useContext(ContextApi);
    console.log("pageUser",user)
    if(user?.name){
        return <p>you are logged in {user?.name}</p>
    }else{
        return <p>you are not logged in</p>
    }
}
export default Page;