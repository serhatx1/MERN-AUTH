import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import "./register.css"
export const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isFormFilled, setIsFormFilled] = useState(false);


  useEffect(() => {
    setIsFormFilled(data.email !== '' && data.password !== '' && data.name!=="");
  }, [data]);



  const registerUser = async function (e) {
    e.preventDefault();
    try {
      const newData = await axios.post('/register', data);
      console.log(newData.data['error']);
      if (newData.data['error']) {
        toast.error(newData.data['error']);
      } else {
        toast.success('Registration is successful');
        setData({
          name: '',
          email: '',
          password: ''
        });
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className='registerDiv'>
      <form onSubmit={registerUser}>
        <h1>Create Your Acoount</h1>
        <div className={`input-container ${data.name ? 'input-filled' : ''}`}>
          <label htmlFor='name' className={data.name ? 'label-moved' : ''}>
            Name
          </label>
          <input
            id='name'
            type='text'
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className={`input-container ${data.email ? 'input-filled' : ''}`}>
          <label htmlFor='email' className={data.email ? 'label-moved' : ''}>
            Email
          </label>
          <input
            id='email'
            type='email'
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className={`input-container ${data.password ? 'input-filled' : ''}`}>
          <label htmlFor='password' className={data.password ? 'label-moved' : ''}>
            Password
          </label>
          <input
            id='password'
            type='password'
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <button type='submit' className={`submit ${isFormFilled ? 'submit-filled' : ''} `}>
          Submit
        </button>
      </form>
    </div>
  );
};
