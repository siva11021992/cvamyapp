import React, { useState } from 'react';

function ApiTest() {
  const [listItem, setListItem] = useState([]);

  const showResult = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/user')
      .then(response => response.json());
       setListItem(res);
  };

  return (
    <>
      <div>ApiTest</div>
      <button onClick={showResult}>Show Result</button>
      {
          <ul>
            {listItem.map((item, ind) => (
              <li key={ind}>{item.name}</li> 
            ))}
          </ul>
      }
    </>
  );
}

export default ApiTest;
