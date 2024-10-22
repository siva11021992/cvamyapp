import React, { useState } from 'react';

function ApiTest() {
  const [listItem, setListItem] = useState([]);

  const showResult = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
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
              <li key={ind}>{item.name}</li> // Assuming you want to display the "name" property of each user
            ))}
          </ul>
      }
    </>
  );
}

export default ApiTest;
