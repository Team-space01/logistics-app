import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logo from '../../assest/mediplus.png'
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/fetch.hook'
import { useFormik } from 'formik'
import  { toast, Toaster } from 'react-hot-toast'
import { paymentVerify } from '../../helpers/validate'
import { paysavings } from '../../helpers/helper'
import { BiMenuAltRight } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler'



function Dashboard() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null)
  const [amount, setAmount] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const { apiData, isLoading, serverError } = useFetch()
  console.log('dashboard apidata', apiData?.email)

  const getMenuStyles = (menuOpen) => {
      if(document.documentElement.clientWidth <=800){
          return {right: !menuOpen && "-100%"}
      }
  }

  //user logout
  function userLogout(){
    localStorage.removeItem('token')
    navigate('/')
  }


  const formik = useFormik({
    initialValues: {
      email: apiData?.email,
      amount: ''
    },
    validate: paymentVerify,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      let payPromise = paysavings(values)

      toast.promise(payPromise, {
        loading: "Please Wait...",
        //success: <b>Payment Successful</b>,
        error: <b>Payment is not Successful</b> 
      });

      payPromise.then(
        navigate('/dashboard')
      )
    }
  })


  const renderPopupComponent = () => {
    switch(selectedCard) {
      case 'funding':
        return(
          <form onSubmit={formik.handleSubmit}>
            <label>Email:</label>
            <input {...formik.getFieldProps('email')} type='email' className='amount_input'  ></input>
            
            <label>Amount:</label>
            <input {...formik.getFieldProps('amount')} type='number' className='amount_input'></input>
            
            <button type='submit' className='submitBtn'>Pay</button>
          </form>
          
        )
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains('popup-overlay')) {
        setSelectedCard(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const closePopup = () => {
    setSelectedCard(null);
  };


  if(isLoading) return <h1>isLoading</h1>
  if(serverError) return <h1>{serverError.message}</h1>

  return (
    <div className='dashboard'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      
      {selectedCard && (
        <>
          <div className='popup-overlay' onClick={closePopup}></div>
          <div className={`popup active`}>
              <span className='popup-close' onClick={closePopup}>
                Close
              </span>
            <div className='popup-content'>
                {renderPopupComponent()}
            </div>
          </div>
        </>
      )}

          <div className="dashboard-menu-icon" onClick={() => setMenuOpen((prev)=>!prev)}>
            <BiMenuAltRight size={40}/>
          </div>

          <div className='top' style={getMenuStyles(menuOpen)}>
                <div className='dashboard_nav'>
                  <div className='logo'>
                    <h2 className='dashboard_logo'>Logistics Solution</h2>
                  </div>

                  <div className='profile_container'>
                    <Link to={'/profile'}>
                      {apiData.img ? <img src={apiData.profile} alt='profile' className='profile_img'/> : <AccountCircleIcon className='profile_img'/>}
                    </Link>
                  </div>

                </div>
                <div className='info'>
                  <h2>Hello, {apiData?.username || 'username'} </h2>
                  <h4>Accont Balance <span>0.00</span></h4>
                </div>

                <div className='acctFunding' onClick={() => setSelectedCard('funding')}>
                  Fund Account
                </div>

                <div className='menu'>
                    <Link className='menu_link'>Home</Link>
                    <Link className='menu_link'>My Orders</Link>
                    <Link className='menu_link'>Services</Link>
                    <Link className='menu_link'>Settings</Link>
                </div>

                <div className='logoutBtn'>
                    <button onClick={userLogout}>Logout</button>
                </div>
          </div>



      <div className='dashboard_container'>
          <h2>We are here for you, please chose a service</h2>

        <div className='dashboard_content'>

            <div className='card' >
              <h3>Ken Foods</h3>
            </div>

            <div className='card'>
              <h3>Ziera Boutique</h3>
            </div>

            <div className='card'>
              <h3>Take a Ride</h3>
            </div>

            <div className='card'>
              <h3>Mama's Resturant</h3>
            </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard