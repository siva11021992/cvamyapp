import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const YupApi = () => {
  const [inputValue, setInputValue] = useState('');

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .test('checkUsername', 'Username already taken', async (value) => {
        if (!value) return false; 
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/users');
          const isUsernameTaken = response.data.some((user) => user.username === value);
          return !isUsernameTaken; 
        } catch (error) {
          return false; 
        }
      }),
  });

  const postData = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
        type: 'survey',
        description: 'form1',
      }, {
        headers: {
          'Authorization': 'Bearer your-token',
          'Content-Type': 'application/json',
        }
      });

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  const updateData = async () => {
    try {
      const response = await axios.put('https://jsonplaceholder.typicode.com/users/1', {
        key1: inputValue, 
        key2: 'newValue2',
      }, {
        headers: {
          'Authorization': 'Bearer your-token',
          'Content-Type': 'application/json',
        }
      });

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  const shoot = (a) => {
    alert(a);
  }


  return (
    <>
      <Formik
        initialValues={{ username: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="username" placeholder="Username" />
            <ErrorMessage name="username" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>

      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // Update state on input change
          placeholder="Enter value for key1"
        />
        <button onClick={postData}>Create</button>
        <button onClick={updateData}>Update</button> {/* Fixed the function call */}
      </div>
    </>
  );
};

export default YupApi;
