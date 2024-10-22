import React from 'react';
// import ChartComponent from './ChartComponent';
// import LayoutExe from './LayoutExe';
// import FlexLayout from './FlexLayout';
// import GridLayout from './GridLayout';
// import YupApi from './YupApi';
// import CrudComponent from './CrudComponent';
// import Sidebar from './SideBar';
// import MyForm from './MyForm';
// import Breadcrumb from './BreadCrumb';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Home';
// import Contact from './Contact';
// import About from './About';
import CheckBox from './CheckBox';
// import Navbar from './NewBar';
// import LocalStore from './LocalStore';

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      {/* <ChartComponent width="600px" height="400px"/>
      <LayoutExe/>
      <FlexLayout />
      <GridLayout/>
      <YupApi/> */}
     {/* <CrudComponent/> */}
     {/* <Sidebar/>
     <MyForm/> */}
     <CheckBox/>
     {/* <Navbar/> */}
     {/* <LocalStore/> */}
    </div>

  //   <Router>
  //   <div>
  //     <Breadcrumb />
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/about" element={<About />} />
  //       <Route path="/contact" element={<Contact />} />
  //     </Routes>
  //   </div>
  // </Router>
  );
}

export default App;