import {useRef, useState} from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import Dropdown from '../../Components/Dropdown/Dropdown'
import Showcase from '../../Components/Showcase/Showcase'
import { InfoDataOne, InfoDatatwo } from '../../data/InfoData'
import Footer from '../../Components/Footer/Footer'
import Info from '../../Components/Info/Info'
import Contact from '../../Components/Contact/Contact'
import { WhyUs } from '../../data/WhyUs'

import Img from '../../images/whyChooseUs1.png'

function Home() {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
      setIsOpen(!isOpen)
    }
  
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    const ref4 = useRef(null)
  
    const handleScroll = (ref) =>{
      ref.current.scrollIntoView({ behavior: 'smooth'})
    }
  
    return (
      <div className='home'>
        <Navbar toggle={toggle} handleScroll={handleScroll} ref2={ref2} ref1={ref1} ref3={ref3}/>
        <Dropdown isopen={isOpen} toggle={toggle} handleScroll={handleScroll} ref2={ref2} ref1={ref1} ref3={ref3}/>
        <section ref={ref1}>
          <Showcase />
        </section>

        <section ref={ref2} className='services'>
            <h2>Our Services</h2>
            <span>Express Company Logistics is redefining the logistics industry with cutting-edge AI technology. We leverage the power of artificial intelligence to transform traditional logistics operations, making them more efficient, streamlined, and cost-effective.</span>

        </section>
  
        <section ref={ref3}>
          <Info {...InfoDataOne}/>
          <Info {...InfoDatatwo} />
        </section>
  
        <section ref={ref4} className='home_contact'>
          <div className='contactOne'>
            <Contact />
          </div>

          <div className='contactTwo'>
                <h3>Why Choose Express Logistics?</h3>

            {
                WhyUs.map((item, idx) => {
                    return(
                        <span className='card' key={idx}>
                            <img src={item.img} alt='12' />
                            <p>
                            <b>{item.title}</b> 
                            {item.text}
                            </p>
                        </span>
                    )
                })
            }      
          </div>
        </section>
  
        <section>
          <Footer />
        </section>
      </div>
    )
}

export default Home