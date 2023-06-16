import './Info.css'
import { Link } from 'react-router-dom'


function Info({heading, paraOne, paraTwo, image, reverse}) {
  return (
    <section className='section_info'>
        <div className='container'>
            <div className='colLeft' style={reverse ? {order: 2} : {order: 1}}>
                <h1>{heading}</h1>
                <p>{paraOne}</p>
                <p>{paraTwo}</p>
                <Link to='/homes' className='link btn'>View</Link>
            </div>
            <div className='colRight' reverse={reverse} style={reverse ? {order: 1} : {order: 2}}>
                <img src={image} alt='home'/>
            </div>
        </div>
    </section>
  )
}

export default Info