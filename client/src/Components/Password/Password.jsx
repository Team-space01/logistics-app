import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Password.css'
import Avatar from '@mui/material/Avatar'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { passwordValidate } from '../../helpers/validate'
import useFetch from '../../hooks/fetch.hook'
import { useAuthStore } from '../../store/store'
import { verifyPassword } from '../../helpers/helper'

function Password() {

    const navigate = useNavigate();

    const { email } = useAuthStore(state => state.auth)
    const { apiData, isLoading, serverError } = useFetch(`user/${email}`)


    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            
            let loginPromise = verifyPassword({ email, password : values.password })
            toast.promise(loginPromise, {
                loading: 'Checking.. Please wait.',
                success: <b>Login Successfull.</b>,
                error: <b>Password Not Match</b>
            });

            loginPromise.then(res => {
                let { token } = res.data;
                localStorage.setItem('token', token)
                navigate('/dashboard')
            })
        }
    })

    if(isLoading) return <h1>isLoading</h1>
    if(serverError) return <h1>{serverError.message}</h1>
    if(apiData){
        console.log("yes apiData")
    }else{
        console.log('no api data')
    }
  return (
    <div className='password'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='password_container'>
            <h3><span>Welcome</span> {apiData?.email || apiData?.firstName /**? `${apiData.firstName} (${apiData.email})` : '' */}</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className='password_img'>
                    {apiData.profile ? <img src={apiData.profile} alt='Profile' className='profilePic'/> :  <Avatar className='avatar'/>}
                </div>

                <label>Password:</label>
                <input {...formik.getFieldProps('password')} type='password' placeholder='Password'/>
                <button type='submit'>Login</button>
            </form>
            <p>Forgot Password? <Link to='/getOTP' className='link'>Recover Here</Link></p>
        </div>
    </div>
  )
}

export default Password