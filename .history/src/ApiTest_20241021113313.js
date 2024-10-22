import React from 'react'


const ShowResult = async () =>{
    await (fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => console.log(json)))
}

function ApiTest() {
  return (
    <>
    <div>ApiTest</div>
    <button onClick={()=>ShowResult}>Show Result</button>
    </>
  )
}
export default ApiTest
