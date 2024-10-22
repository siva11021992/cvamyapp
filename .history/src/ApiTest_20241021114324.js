import React,{useState} from 'react'

function ApiTest() {

    const [listItem,SetListItem] = useState();

    const ShowResult = async () =>{
       let res= await (fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json()))
        SetListItem(res)
    }

  return (
    <>
    <div>ApiTest</div>
    <button onClick={()=>ShowResult}>Show Result</button>
    {
        listItem.map((item,ind) =>(
            <ul  key={ind}>
             {item}
             </ul>
        ))
    }
    </>
  )
}
export default ApiTest
