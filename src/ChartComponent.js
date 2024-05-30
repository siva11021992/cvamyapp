import React, { useState } from 'react';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import './App.css';

const ChartComponent = () => {
  const [results, setResults] = useState({
    TotalAgentsNeeded: null,
    ApproximateAgentNeeded: null,
    packages: {
      starter: false,
      basic: false,
      pro: false,
      advanced: false,
      enterprise: false,
      custom: false,
    },
    mappedPackageData: [],
    mappedYearData: [],
    discountedPrices: [],
  });

  const JsonPackageData = {
    starter: 450,
    basic: 1225,
    pro: 3225,
    advanced: 4250,
    enterprise: 8550,
    custom: 15625,
  };

  const JsonYearData = {
    "1stYear": 25,
    "2ndYear": 35,
    "3rdYear": 45,
    "4thYear": 55,
    "5thYear": 65,
  };

  const JsonDiscountData = {
    starter: {
      "1stYear": 0,
      "2ndYear": 5,
      "3rdYear": 10,
      "4thYear": 20,
      "5thYear": 25,
    },
    basic: {
      "1stYear": 5,
      "2ndYear": 10,
      "3rdYear": 15,
      "4thYear": 20,
      "5thYear": 25,
    },
    pro: {
      "1stYear": 10,
      "2ndYear": 15,
      "3rdYear": 20,
      "4thYear": 25,
      "5thYear": 30,
    },
    advanced: {
      "1stYear": 15,
      "2ndYear": 20,
      "3rdYear": 25,
      "4thYear": 30,
      "5thYear": 35,
    },
    enterprise: {
      "1stYear": 20,
      "2ndYear": 25,
      "3rdYear": 30,
      "4thYear": 35,
      "5thYear": 40,
    },
    custom: {
      "1stYear": 25,
      "2ndYear": 30,
      "3rdYear": 35,
      "4thYear": 40,
      "5thYear": 45,
    },
  };

  const handleCustomChange = (e, setFieldValue) => {
    const value = e.target.value;
    setFieldValue('number', value);

    if (!isNaN(value) && value.trim() !== '') {
      const numericValue = parseFloat(value);
      const totalAgentsNeeded = numericValue / 960;
      const approximateAgentNeeded = totalAgentsNeeded * 0.70;

      const mappedPackageData = Object.entries(JsonPackageData).map(([plan, price]) => {
        return { plan, price };
      });
      const mappedYearData = Object.entries(JsonYearData).map(([plan, percentage]) => {
        return { plan, percentage };
      });

      const discountedPrices = mappedPackageData.map(({ plan, price }) => {
        const yearlyDiscounts = Object.entries(JsonDiscountData[plan]).map(([year, discount]) => {
          const discountedPrice = price * (1 - discount / 100);
          return { year, discountedPrice: discountedPrice.toFixed(2) };
        });
        return { plan, yearlyDiscounts };
      });

      setResults({
        TotalAgentsNeeded: totalAgentsNeeded,
        ApproximateAgentNeeded: approximateAgentNeeded,
        packages: {
          starter: approximateAgentNeeded <= 5,
          basic: approximateAgentNeeded <= 10,
          pro: approximateAgentNeeded <= 30,
          advanced: approximateAgentNeeded <= 35,
          enterprise: approximateAgentNeeded <= 70,
          custom: approximateAgentNeeded <= 125,
        },
        mappedPackageData,
        mappedYearData,
        discountedPrices,
      });
    } else {
      setResults({
        TotalAgentsNeeded: null,
        ApproximateAgentNeeded: null,
        packages: {
          starter: false,
          basic: false,
          pro: false,
          advanced: false,
          enterprise: false,
          custom: false,
        },
        mappedPackageData: [],
        mappedYearData: [],
        discountedPrices: [],
      });
    }
  };

  return (
    <>
      <Formik
        initialValues={{ number: '' }}
        onSubmit={(values) => {
          console.log('Submitted values:', values);
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="label-custom-color">Monthly Number Of Sessions:</Form.Label>
              <Form.Control
                type="text"
                name="number"
                onChange={(e) => handleCustomChange(e, setFieldValue)}
                value={values.number}
                style={{ width: '300px' }}
              />
            </Form.Group>
            {results.TotalAgentsNeeded !== null && (
              <div style={{ color: 'black' }}>
                1. Total Agents Needed: {results.TotalAgentsNeeded.toFixed(2)}
              </div>
            )}
            {results.ApproximateAgentNeeded !== null && (
              <div style={{ color: 'green' }}>
                2. Approximate Agent Needed With Eserve AI: {results.ApproximateAgentNeeded.toFixed(2)}
              </div>
            )}
            <div style={{ color: 'blue' }}>
              3. Applicable package:
              {results.packages.enterprise && (
                <div>Enterprise: {results.packages.enterprise ? 'Yes' : 'No'}</div>
              )}
            </div>
            <div style={{ color: 'orange' }}>
              4. Per Month Cost:
              {results.mappedPackageData
                .filter(({ plan }) => plan === 'enterprise' && results.packages[plan])
                .map(({ plan, price }) => (
                  <div key={plan}>
                    {plan.charAt(0).toUpperCase() + plan.slice(1)}: ${price}
                  </div>
                ))}
            </div>
            <div style={{ color: 'green' }}>
              5. Self Serving Sessions:
              {results.mappedYearData.map(({ plan, percentage }) => {
                const totalSessions = (values.number * parseFloat(percentage) / 100).toFixed(2);
                return (
                  <div key={plan}>
                    {plan.charAt(0).toUpperCase() + plan.slice(1)}: {values.number} * {percentage}% = {totalSessions}
                  </div>
                );
              })}
            </div>
            <div style={{ color: 'black' }}>
              6. Number Of Agent Savings:
              {results.mappedYearData.map(({ plan, percentage }) => {
                const totalSessions = ((values.number * parseFloat(percentage) / 100) / 960).toFixed(2);
                return (
                  <div key={plan}>
                    {plan.charAt(0).toUpperCase() + plan.slice(1)}: ({values.number} * {percentage}%) / 960 = {totalSessions}
                  </div>
                );
              })}
            </div>
            <div style={{ color: 'blue' }}>
              7. Number Of ManHour Saved:
              {results.mappedYearData.map(({ plan, percentage }) => {
                const totalSessions = ((values.number * parseFloat(percentage) / 100) / 960 * 20 * 7 * 12).toFixed(2);
                return (
                  <div key={plan}>
                    {plan.charAt(0).toUpperCase() + plan.slice(1)}: ({values.number} * {percentage}%) / 960 * 20 * 7 * 12 = {totalSessions}
                  </div>
                );
              })}
            </div>
            <div style={{ color: 'orange' }}>
              8. Yearly Cost Of EserveCloud:
              {results.mappedPackageData
                .filter(({ plan }) => plan === 'enterprise' && results.packages[plan])
                .map(({ plan, price }) => (
                  <div key={plan}>
                    {plan.charAt(0).toUpperCase() + plan.slice(1)}: ${(price * 12).toFixed(2)}
                  </div>
                ))}
            </div>

            <div>
              <table border="1">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Num of <br />ManHours</th>
                    <th> Yearly Cost of <br />EserveCloud</th>
                  </tr>
                </thead>
                <tbody>
                  {results.mappedYearData.map(({ plan, percentage }, index) => {
                    const totalSessions = (
                      (values.number * parseFloat(percentage) / 100) / 960 * 20 * 7 * 12
                    ).toFixed(2);
                    const applicablePackage = results.mappedPackageData.find(({ plan }) => results.packages[plan]);
                    const monthlyCost = applicablePackage ? (applicablePackage.price * 12).toFixed(2) : 'N/A';
                    return (
                      <tr key={index}>
                        <td>{plan}</td>
                        <td>{totalSessions}</td>
                        <td>${monthlyCost}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={{ color: 'green' }}>
              9. Discounts based on the package:
              {results.discountedPrices
                .filter(({ plan }) => plan === 'enterprise' && results.packages[plan])
                .map(({ plan, yearlyDiscounts }) => (
                  yearlyDiscounts.map(({ year, discountedPrice }) => (
                    <div key={`${plan}-${year}`}>
                      {plan.charAt(0).toUpperCase() + plan.slice(1)} - {year}: ${(discountedPrice * 12).toFixed(2)}
                    </div>
                  ))
                ))}
            </div>
            <div>
              <table border="1">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Num of <br />ManHours</th>
                    <th>Discounts based<br />on the package</th>
                  </tr>
                </thead>
                <tbody>
                  {results.mappedYearData.map(({ plan, percentage }, index) => {
                    const totalSessions = (
                      (values.number * parseFloat(percentage) / 100) / 960 * 20 * 7 * 12
                    ).toFixed(2);
                    const applicablePackage = results.discountedPrices.find(({ plan: p }) => results.packages[p]);
                    const yearlyDiscount = applicablePackage

                      ? applicablePackage.yearlyDiscounts.find(({ year }) => year === plan).discountedPrice * 12
                      : 'N/A';
                    return (
                      <tr key={index}>
                        <td>{plan}</td>
                        <td>{totalSessions}</td>
                        <td>${yearlyDiscount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ChartComponent;

