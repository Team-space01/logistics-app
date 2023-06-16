import React from 'react'
import './Footer.css'
import FBIcon from '@mui/icons-material/FacebookOutlined'
import WAIcon from '@mui/icons-material/WhatsApp'
import IGIcon from '@mui/icons-material/Instagram'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/EmailOutlined'
import { Link } from 'react-router-dom'
import Logo from '../../images/logo.png'

function Footer() {
  return (
    <div className='footer'>
        <div className='connect'>
            <span>Connect with us</span>
            <span>
                <FBIcon className='icons' />
                <WAIcon className='icons' />
                <IGIcon className='icons'/>
            </span>
        </div>

        <div className='imprint'>
            <Link to='/' className='link'>
                <img src={Logo} alt='footer' className='footerLogo'/>
                Express Logistics
            </Link>
            <span> Redefining Logistics with AI-Powered Solutions</span>
        </div>

        <div className='contact'>
            <span>
                <PhoneIcon />
                0900 900 900
            </span>
            <span>
                <EmailIcon />
                ExpressLogistics@gmail.com
            </span>
        </div>
    </div>
  )
}

export default Footer