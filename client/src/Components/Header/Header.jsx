import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { BiMenuAltRight } from 'react-icons/bi'
import OutsideClickHandler from 'react-outside-click-handler'

function Header({handleScroll, ref2, ref1, ref3}) {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
      console.log('Current window.onscroll:', window.onscroll);
      window.onscroll = () => {
        console.log('Scrolling');
        setIsScrolled(window.pageYOffset === 0 ? false : true);
      };
    }, []);

    const [menuOpen, setMenuOpen] = useState(false);
    const getMenuStyles = (menuOpen) => {
        if(document.documentElement.clientWidth <=800){
            return {right: !menuOpen && "-100%"}
        }
    }

    return (
        <section className="h-wrapper" style={isScrolled ? {background: "black", transition: "0.9s ease"} : {}}>
            <div className='flexCenter paddings innerWidth h-container'>
                
                <p style={{fontSize: '30px', fontWeight: 'bolder'}}>Logistics Solutions</p>

                <OutsideClickHandler 
                    onOutsideClick={() => {
                        setMenuOpen(false)
                    }}
                >
                    <div className="flexCenter h-menu"
                        style={getMenuStyles(menuOpen)}
                        >
                        <Link to='/home'>Residencies</Link>
                        <Link  onClick={() => handleScroll(ref1)}>Our Value</Link>
                        <Link onClick={() => handleScroll(ref2)} >Contact Us</Link>
                        <Link to='/login' >Login</Link>
                        <button className="button">
                            <Link to='/signup' >Get Started</Link>
                        </button>
                    </div>
                </OutsideClickHandler>
            <div className="menu-icon" onClick={() => setMenuOpen((prev)=>!prev)}>
                <BiMenuAltRight size={30} />
            </div>
            </div>

        </section>
    )
}

export default Header