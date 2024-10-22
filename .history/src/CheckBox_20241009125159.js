import { useState } from "react";

function CheckBox({ title, age, editItem }) {
  const arr = ["Apple", "Orange", "Banana"];

  const [fruitsArr, setFruitsArr] = useState([...arr]);
  const [chkBoxStates, setChkBoxStates] = useState(arr.map(() => false));

  const deleteClickHandler = (index) => {
    console.log("index: ",index);
    // Update the fruitsArr
    const filteredArr = fruitsArr.filter((_, i) =>{console.log(i);return i !== index});
    setFruitsArr(filteredArr);

    // Update the chkBoxStates by removing the corresponding checkbox state
    const updatedChkBoxStates = chkBoxStates.filter((_, i) => i !== index);
    setChkBoxStates(updatedChkBoxStates);
  };

  const handleCheck = (isChecked, index) => {
    setChkBoxStates((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = isChecked;
      return newArray;
    });
  };

   setFruitsArr((prevState)=>{
 console.log("prevState",prevState)
  })

  return (
    <div className="App">
      <h1>Hello Codeandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {fruitsArr.map((element, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={chkBoxStates[index]}
            onChange={(e) => handleCheck(e.target.checked, index)}
          />
          &nbsp;&nbsp;
          {element} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {chkBoxStates[index] && (
            <button onClick={() => deleteClickHandler(index)}>Delete</button>
          )}
        </div>
      ))}
      {title}
      {editItem}
    </div>
  );
}

export default CheckBox;
