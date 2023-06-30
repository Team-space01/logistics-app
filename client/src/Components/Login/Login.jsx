import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { emailValidate } from '../../helpers/validate'
import { useAuthStore } from '../../store/store'

function Login() {
    const navigate = useNavigate()
    const setEmail = useAuthStore(state => state.setEmail)

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: emailValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            setEmail(values.email)
            navigate('/password')
        }
    })

  return (
    <div className='login'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>

        <div className='login_container'>
            <h3>Welcome Back</h3>
            <form onSubmit={formik.handleSubmit}>
                <label>Email Address:</label>
                <input {...formik.getFieldProps('email')} type='email' placeholder='Email'/>
                <button type='submit'>Continue</button>
            </form>
            <p>Not a member? <Link to='/signup' className='link'>Signup Here</Link></p>
        </div>
    </div>
  )
}

export default Login