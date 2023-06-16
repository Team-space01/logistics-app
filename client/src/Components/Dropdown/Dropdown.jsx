import './Dropdown.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Link } from 'react-router-dom';

function Dropdown({isopen, toggle, handleScroll, ref1, ref2, ref3}) {
  return (
    <div className='dropdown' 
        isopen={isopen ? "true" : undefined } 
        onClick={toggle} 
        style={isopen ? {opacity: 1, top: 0} : {opacity: 0, top:'-100vh'}}
    >
        <CloseOutlinedIcon className='closeBtn' onClick={toggle}/>
        <div className='dropdown_menu'>
                <button className=' dropdown_link' onClick={()=> handleScroll(ref1)}>Home</button>
                <button className=' dropdown_link'  onClick={()=> handleScroll(ref2)}>About</button>
                <button className=' dropdown_link'  onClick={()=> handleScroll(ref3)}>Contact Us</button>
                <Link to='/view-homes' className=' dropdown_link link' style={{fontSize: '22px' }}>View Homes</Link>
        </div>
        <Link to='/mortgage' className='link btn'>Mortgage Calculator</Link>
    </div>
  )
}

export default Dropdown