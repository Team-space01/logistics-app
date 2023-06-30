import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'
import Avatar from '@mui/material/Avatar'
import convertToBase64 from '../../helpers/convert'
import { toast, Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { registrationValidation } from '../../helpers/validate'
import { registerUser } from '../../helpers/helper'

function Signup() {
  const navigate = useNavigate();

  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues:{
      username: '',
      email: '',
      password: ''
    },
    validate: registrationValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, { profile: file || ''})
      let registerPromise =  registerUser(values)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success: <b>Register Successfully</b>,
        error: <b>Could not register.</b>
      });

      registerPromise.then(function(){navigate('/login')})
    }
  })

  const unUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <div className='signup'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='signup_container'>
            <h3>Get Started</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className='signup_profile'>
                <label htmlFor='image-upload'>
                    {file ? <img src={file} alt='Profile' className='profilePic'/> :  <Avatar className='avatar'/>}
                </label>
                <input onChange={unUpload} type='file' hidden id='image-upload' accept='image/jpeg image/png'/>
              </div>

                <label>Username:</label>
                <input {...formik.getFieldProps('username')} type='text' placeholder='Username'/>

                <label>Email Address:</label>
                <input {...formik.getFieldProps('email')} type='email' placeholder='Email'/>
                
                <label>Password:</label>
                <input {...formik.getFieldProps('password')} type='password' placeholder='Password'/>
                <button type='submit'>Signup</button>
            </form>
            <p>Already a member? <Link to='/login' className='link'>Login Here</Link></p>
        </div>
    </div>
  )
}

export default Signup