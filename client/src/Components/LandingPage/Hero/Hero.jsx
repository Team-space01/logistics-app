import React from 'react'
import './Hero.css'
import { heroData } from '../../../data/data'

function Hero() {
    const {title, subtitle, subtitle2, btnText, img} = heroData
  return (
    <section>
        <div className="flexCenter paddings innerWidth hero">
            <div className='hero-content'>
                <div className='h-1'>
                    <h1 className='h1 xl:max-w-[700px] mb-6 lg:mb-12'>{title}</h1>
                    <p>{subtitle}</p>
                    <p>{subtitle2}</p>
                    <button>{btnText}</button>               
                </div>

                <div className='h-2'>
                    <img src={img} alt='hero' />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero