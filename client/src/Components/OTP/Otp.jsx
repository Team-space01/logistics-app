import './Otp.css'
import { toast, Toaster } from 'react-hot-toast'
import { useAuthStore } from '../../store/store'
import { useEffect, useState } from 'react'
import { generateOTP, verifyOTP } from '../../helpers/helper'
import { useNavigate } from 'react-router-dom'


function Otp() {
  const navigate = useNavigate();
  const { email } = useAuthStore(state => state.auth)
  const [OTP, setOTP] = useState();

  useEffect(() => {
    generateOTP(email).then((OTP) => {
      console.log(OTP)
      if(OTP) return toast.success('OTP has been sent to you email')
      return toast.error('Problem while generating OTP')
    })
  }, [ email ] )

  async function onSubmit(e){
    e.preventDefault();

    try {
      let { status } = await verifyOTP({email, code: OTP })
      if(status === 201){
        toast.success('Verify Successfully')
        navigate('/passwordReset')
      }
    } catch (error) {
      return toast.error('Wrong OTP!. Check email or click resend OTP')
    }

  }

  // handler Resend OTP
  function resendOTP(){
    let sendPromise = generateOTP(email);

    toast.promise(sendPromise, {
      loading: "Sending",
      success: <b>OTP has been send to to your email</b>,
      error: <b>Could not send</b>
    });

    sendPromise.then(OTP => {
      console.log(OTP)
    })
  }

  return (
    <div className='otp'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='otp_container'>
            <h3>Recovery</h3>
            <p>Enter OTP to reset your password</p>
            <small>Check Spam folder also.</small>
            <form onSubmit={onSubmit}>
                <label>OTP:</label>
                <input onChange={(e) => setOTP(e.target.value) } type='text' placeholder='Enter OTP'/>
                <button type='submit'>Processed</button>
            </form>
            <p>Could not get OTP? <button onClick={resendOTP}>Resend</button></p>
        </div>
    </div>
  )
}

export default Otp