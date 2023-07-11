import Header from '../../Components/Header/Header'
import LandingPage from '../LandingPage/LandingPage'
import './Home.css'
import { Link } from 'react-router-dom'


function Home() {
  return (
    <div className='home'>
      <Header />
      <LandingPage />
    </div>
  )
}

export default Home