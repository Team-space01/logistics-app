import {useEffect, useState} from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import  Menu from '@mui/icons-material/MenuRounded'
import LogoImg from '../../images/logo.png'

function Navbar({toggle, handleScroll, ref2, ref1, ref3}) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    console.log('Current window.onscroll:', window.onscroll);
    window.onscroll = () => {
      console.log('Scrolling');
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    };
  }, []);

  return (
    <div className='navbar' style={isScrolled ? {background: "rgb(11, 208, 198)", transition: "0.9s ease"} : {}}>
        <h2>
            <Link to='/' className='link logo'>
                <img src={LogoImg} alt='logo' />
                Express
            </Link>
        </h2>

        <div className='menu_container'>
          <Menu className='menu' onClick={toggle}/>
        </div>

        <div className='navLink'>
            <button onClick={() => handleScroll(ref1)} className=' navLinks'>Home</button>
            <button onClick={() => handleScroll(ref2)} className=' navLinks'>About</button>
            <button onClick={() => handleScroll(ref3)} className=' navLinks'>Contact Us</button>
            <Link  to='/view-homes' className='navLinks link' style={{fontSize: '22px' }}>Sign Up</Link>
        </div>

        <div className='btn'>
          <Link to='/dashboard' className='link btn_link'>
            Dashboard
          </Link>
        </div>

    </div>
  )
}

export default Navbar