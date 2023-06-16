import { useEffect, useRef, useState } from 'react'
import './Showcase.css'
import { SliderData } from '../../data/SliderData'
import { Link } from 'react-router-dom'
import ArrowLeft from '@mui/icons-material/ArrowLeftRounded'
import ArrowRight from '@mui/icons-material/ArrowRightOutlined'

function Showcase() {
    const [current, setCurrent] = useState(0);
    const length = SliderData.length
    console.log('data length >>', length)
    const timeout =useRef(null)

    useEffect(() =>{
        const nextSlide= () => {
            setCurrent(current => (current === length - 1 ? 0 : current + 1))
        }

        timeout.current = setTimeout(nextSlide, 2000)
        return function(){
            if(timeout.current){
                clearTimeout(timeout.current)
            }
        }
    },[current, length])

    const nextSlide = () => {
        if(timeout.current){
            clearTimeout(timeout.current)
        }

        setCurrent(current === length - 1 ? 0 : current + 1)

        console.log(current)
    }

    const prevSlide = () =>{
        if(timeout.current){
            clearTimeout(timeout.current)
        }

        setCurrent(current === 0 ? length -1 : current - 1)
        
        console.log(current)
    }

    if(!Array.isArray(SliderData) || SliderData.length <= 0){
        return null
    }

  return (
    <div className='showcase'>
        <div className='showcase_wrapper'>
            {SliderData.map((item, idx) => {
                return(
                    <div key={idx} className='slider'>
                        {idx === current && (
                            <div className='content'>
                                <img src={item.image} alt={item.alt} />
                                <div className='info'>
                                    <h1>{item.title}</h1>
                                    <p>{item.price}</p>
                                   <div className='btn'><Link to={item.path} className='link'>Get Started</Link></div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
            <div className='arrow_control'>
                <ArrowLeft className='arrow left' onClick={prevSlide}/>
                <ArrowRight className='arrow right' onClick={nextSlide}/>
            </div>
        </div>
    </div>
  )
}

export default Showcase