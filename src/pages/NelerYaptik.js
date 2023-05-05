import React from 'react'
import IletisimForm from '../Comp/IletisimForm'
import "./NelerYaptik.css"
import { Link } from 'react-router-dom'

const NelerYaptik = () => {
  return (
    <div className='neleryaptik'>
      <div className='neleryaptik-text'>
     <ul>
      
      <li><Link>İnsan Onuru Bülteni</Link></li>
      <li><Link>İnsan Onuru Bülteni</Link></li>
      <li><Link>İnsan Onuru Bülteni</Link></li>



     </ul>
      </div>
      <IletisimForm/>
    </div>
  )
}

export default NelerYaptik