// import React, { useState } from 'react';
// import { Formik } from 'formik';
// import { Form } from 'react-bootstrap';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import './App.css';

// // Register necessary Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const ChartComponent = () => {
//   const [results, setResults] = useState({
//     TotalAgentsNeeded: null,
//     ApproximateAgentNeeded: null,
//     packages: {
//       starter: false,
//       basic: false,
//       pro: false,
//       advanced: false,
//       enterprise: false,
//       custom: false,
//     },
//     mappedPackageData: [],
//     mappedYearData: [],
//     discountedPrices: [],
//   });

//   const JsonPackageData = {
//     starter: 450,
//     basic: 1225,
//     pro: 3225,
//     advanced: 4250,
//     enterprise: 8550,
//     custom: 15625,
//   };

//   const JsonYearData = {
//     "1stYear": 35,
//     "2ndYear": 45,
//     "3rdYear": 55,
//     "4thYear": 65,
//     "5thYear": 75,
//   };

//   const JsonDiscountData = {
//     starter: {
//       "1stYear": 0,
//       "2ndYear": 5,
//       "3rdYear": 10,
//       "4thYear": 20,
//       "5thYear": 25,
//     },
//     basic: {
//       "1stYear": 5,
//       "2ndYear": 10,
//       "3rdYear": 15,
//       "4thYear": 20,
//       "5thYear": 25,
//     },
//     pro: {
//       "1stYear": 10,
//       "2ndYear": 15,
//       "3rdYear": 20,
//       "4thYear": 25,
//       "5thYear": 30,
//     },
//     advanced: {
//       "1stYear": 15,
//       "2ndYear": 20,
//       "3rdYear": 25,
//       "4thYear": 30,
//       "5thYear": 35,
//     },
//     enterprise: {
//       "1stYear": 20,
//       "2ndYear": 25,
//       "3rdYear": 30,
//       "4thYear": 35,
//       "5thYear": 40,
//     },
//     custom: {
//       "1stYear": 25,
//       "2ndYear": 30,
//       "3rdYear": 35,
//       "4thYear": 40,
//       "5thYear": 45,
//     },
//   };


//   const handleCustomChange = (e, setFieldValue) => {
//     const value = e.target.value;
//     setFieldValue('number', value);

//     if (!isNaN(value) && value.trim() !== '') {
//       const numericValue = parseFloat(value);
//       const totalAgentsNeeded = numericValue / 960;
//       const approximateAgentNeeded = totalAgentsNeeded * 0.70;

//       const mappedPackageData = Object.entries(JsonPackageData).map(([plan, price]) => ({ plan, price }));
//       const mappedYearData = Object.entries(JsonYearData).map(([plan, percentage]) => ({ plan, percentage }));

//       const discountedPrices = mappedPackageData.map(({ plan, price }) => {
//         const yearlyDiscounts = Object.entries(JsonDiscountData[plan]).map(([year, discount]) => {
//           const discountedPrice = price * (1 - discount / 100);
//           return { year, discountedPrice: discountedPrice.toFixed(2) };
//         });
//         return { plan, yearlyDiscounts };
//       });

//       const applicablePackage = (() => {
//         if (approximateAgentNeeded <= 5) return 'starter';
//         if (approximateAgentNeeded <= 10) return 'basic';
//         if (approximateAgentNeeded <= 30) return 'pro';
//         if (approximateAgentNeeded <= 35) return 'advanced';
//         if (approximateAgentNeeded <= 70) return 'enterprise';
//         return 'custom';
//       })();

//       setResults({
//         TotalAgentsNeeded: totalAgentsNeeded,
//         ApproximateAgentNeeded: approximateAgentNeeded,
//         packages: {
//           starter: applicablePackage === 'starter',
//           basic: applicablePackage === 'basic',
//           pro: applicablePackage === 'pro',
//           advanced: applicablePackage === 'advanced',
//           enterprise: applicablePackage === 'enterprise',
//           custom: applicablePackage === 'custom',
//         },
//         mappedPackageData,
//         mappedYearData,
//         discountedPrices,
//       });
//     } else {
//       setResults({
//         TotalAgentsNeeded: null,
//         ApproximateAgentNeeded: null,
//         packages: {
//           starter: false,
//           basic: false,
//           pro: false,
//           advanced: false,
//           enterprise: false,
//           custom: false,
//         },
//         mappedPackageData: [],
//         mappedYearData: [],
//         discountedPrices: [],
//       });
//     }
//   };

//   const prepareLineChartData = () => {
//     const labels = results.mappedYearData.map(({ plan }) => plan);

//     const manHoursData = results.mappedYearData.map(({ plan, percentage }) => {
//       return (((results.TotalAgentsNeeded * parseFloat(percentage) / 100) / 960 * 20 * 7 * 12) * 1000).toFixed(2);
//     });

//     const discountData = results.discountedPrices
//       .filter(({ plan }) => results.packages[plan])
//       .map(({ yearlyDiscounts }) => {
//         return yearlyDiscounts.map(({ discountedPrice }) => (discountedPrice * 12).toFixed(2));
//       })[0] || [];

//     return {
//       manHours: {
//         labels,
//         datasets: [
//           {
//             label: 'Number Of ManHour Saved',
//             data: manHoursData,
//             fill: false,
//             borderColor: 'blue',
//           },
//           {
//             label: 'Discounts based on the package',
//             data: discountData,
//             fill: false,
//             borderColor: 'green',
//           },
//         ],
//       },
//     };
//   };

//   const chartData = prepareLineChartData();

//   return (
//     <>
//       <Formik
//         initialValues={{ number: '' }}
//       >
//         {({ setFieldValue, values }) => (
//           <Form>
//             <Form.Group>
//               <Form.Label className="label-custom-color">Monthly Number Of Sessions:</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="number"
//                 onChange={(e) => handleCustomChange(e, setFieldValue)}
//                 value={values.number}
//                 style={{ width: '300px' }}
//               />
//             </Form.Group>
//               <div style={{ color: 'black' }}>
//                 1. Total Agents Needed: {results.TotalAgentsNeeded !== null ? results.TotalAgentsNeeded.toFixed(2) : ""}
//               </div>
           
//               <div style={{ color: 'green' }}>
//               2. Approximate Agent Needed With Eserve AI: {
//                 results.ApproximateAgentNeeded !== null ? results.ApproximateAgentNeeded.toFixed(2) : ""
//               }
//             </div>
//             <div style={{ color: 'blue' }}>
//               3. Applicable package:
//               {Object.keys(results.packages).map((pkg) => (
//                 results.packages[pkg] && <div key={pkg}>{pkg.charAt(0).toUpperCase() + pkg.slice(1)}: Yes</div>
//               ))}
//             </div>
//             <div style={{ color: 'orange' }}>
//               4. Per Month Cost:
//               {results.mappedPackageData
//                 .filter(({ plan }) => results.packages[plan])
//                 .map(({ plan, price }) => (
//                   <div key={plan}>
//                     {plan.charAt(0).toUpperCase() + plan.slice(1)}: ${price}
//                   </div>
//                 ))}
//             </div>
//             <div style={{ color: 'green' }}>
//               5. Self Serving Sessions:
//               {results.mappedYearData.map(({ plan, percentage }) => {
//                 const totalSessions = (values.number * parseFloat(percentage) / 100).toFixed(2);
//                 return (
//                   <div key={plan}>
//                     {plan.charAt(0).toUpperCase() + plan.slice(1)}: {values.number} * {percentage}% = {totalSessions}
//                   </div>
//                 );
//               })}
//             </div>
//             <div style={{ color: 'black' }}>
//               6. Number Of Agent Savings:
//               {results.mappedYearData.map(({ plan, percentage }) => {
//                 const totalSessions = ((values.number * parseFloat(percentage) / 100) / 960).toFixed(2);
//                 return (
//                   <div key={plan}>
//                     {plan.charAt(0).toUpperCase() + plan.slice(1)}: ({values.number} * {percentage}%) / 960 = {totalSessions}
//                   </div>
//                 );
//               })}
//             </div>
//             <div style={{ color: 'blue' }}>
//               7. Number Of ManHour Saved:
//               {results.mappedYearData.map(({ plan, percentage }) => {
//                   const totalSessions = ((values.number * parseFloat(percentage) / 100) / 960 * 20 * 7 * 12).toFixed(2);
//                   return (
//                     <div key={plan}>
//                       {plan.charAt(0).toUpperCase() + plan.slice(1)}: ({values.number} * {percentage}%) / 960 * 20 * 7 * 12 = {totalSessions}
//                     </div>
//                   );
//                 })}
//               </div>
//               <div style={{ color: 'orange' }}>
//                 8. Yearly Cost Of EserveCloud:
//                 {results.mappedPackageData
//                   .filter(({ plan }) => results.packages[plan])
//                   .map(({ plan, price }) => (
//                     <div key={plan}>
//                       {plan.charAt(0).toUpperCase() + plan.slice(1)}: ${(price * 12).toFixed(2)}
//                     </div>
//                   ))}
//               </div>
  
//               <div>
//                 <table border="1">
//                   <thead>
//                     <tr>
//                       <th>Year</th>
//                       <th>Num of <br />ManHours</th>
//                       <th> Yearly Cost of <br />EserveCloud</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {results.mappedYearData.map(({ plan, percentage }, index) => {
//                       const totalSessions = (
//                         (values.number * parseFloat(percentage) / 100) / 960 * 20 * 7 * 12
//                       ).toFixed(2);
//                       const applicablePackage = results.mappedPackageData.find(({ plan }) => results.packages[plan]);
//                       const monthlyCost = applicablePackage ? (applicablePackage.price * 12).toFixed(2) : 'N/A';
//                       return (
//                         <tr key={index}>
//                           <td>{plan}</td>
//                           <td>{totalSessions}</td>
//                           <td>${monthlyCost}</td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
  
//               <div style={{ color: 'green' }}>
//                 9. Discounts based on the package:
//                 {results.discountedPrices
//                   .filter(({ plan }) => results.packages[plan])
//                   .map(({ plan, yearlyDiscounts }) => (
//                     yearlyDiscounts.map(({ year, discountedPrice }) => (
//                       <div key={`${plan}-${year}`}>
//                         {plan.charAt(0).toUpperCase() + plan.slice(1)} - {year}: ${(discountedPrice * 12).toFixed(2)}
//                       </div>
//                     ))
//                   ))}
//               </div>
//               <div>
//                 <table border="1">
//                   <thead>
//                     <tr>
//                       <th>Year</th>
//                       <th>Num of <br />ManHours</th>
//                       <th>Discounts based<br />on the package</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {results.mappedYearData.map(({ plan, percentage }, index) => {
//                       const totalSessions = (
//                         (values.number * parseFloat(percentage) / 100) / 960 * 20 * 7 * 12
//                       ).toFixed(2);
//                       const applicablePackage = results.discountedPrices.find(({ plan: p }) => results.packages[p]);
//                       const yearlyDiscount = applicablePackage
//                         ? applicablePackage.yearlyDiscounts.find(({ year }) => year === plan).discountedPrice * 12
//                         : 'N/A';
//                       return (
//                         <tr key={index}>
//                           <td>{plan}</td>
//                           <td>{totalSessions}</td>
//                           <td>${yearlyDiscount}</td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
  
//               <div>
//                 <h3 style={{ color: 'red' }}>Chart:</h3>
//                 <div style={{ width: '800px', height: '400px' }}>
//                   <Line data={chartData.manHours} />
//                 </div>
//               </div>
//               <div class="container">
//                 <div class="box" id="box1">1</div>
//                 <div class="box" id="box2">2</div>
//                 <div class="box" id="box3">3</div>
//                 <div class="box" id="box4">4</div>

//               </div>
//             </Form>
//           )}
//         </Formik>
//       </>
//     );
//   };
  
//   export default ChartComponent;

// import React from 'react';
// import './App.css';
 

// const ChartComponent = () => {


//   return (
//     <>
//     <div class="container">
//     <div class="box" id="box1">header</div>
//     <div class="box" id="box2">nav</div>
//     <div class="box" id="box3">main</div>
//     <div class="box" id="box4">sidebar</div>
//     <div class="box" id="box5">footer</div>


//   </div>
//   </>
//   )
// }
// export default ChartComponent;


import React from 'react';
import './App.css';
 

const ChartComponent = () => {


  return (
    <>
    <div class="container">
    <div class="box" id="box1">1</div>
    <div class="box" id="box2">2</div>
    <div class="box" id="box3">CSS GRID LAYOUT</div>
    <div class="box" id="box4">4</div>
    <div class="box" id="box5">5</div>
    <div class="box" id="box6">6</div>
    <div class="box" id="box7">7</div>
    <div class="box" id="box8">8</div>
    <div class="box" id="box9">9</div>
    <div class="box" id="box10">10</div>
    <div class="box" id="box11">11</div>
    <div class="box" id="box12">12</div>



  </div>
  </>
  )
}
export default ChartComponent;