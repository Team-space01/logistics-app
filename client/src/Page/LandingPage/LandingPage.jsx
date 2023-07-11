import './LandingPage.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import Hero from '../../Components/LandingPage/Hero/Hero'

function LandingPage() {
  Aos.init({
    duration: 1800,
    offset: 0,
  })

  return (
    <div className='overflow-hidden'>
      <Hero />
    </div>
  )
}

export default LandingPage