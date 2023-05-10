import React from 'react'
import Slider from '../Comp/Slider'
import "./Home.css"

import HomeContent from '../Comp/HomeContent'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div >

      <Slider />


      <div className='under-slider'> 


      <div className='under-slider-text'>
        <span>  Bizimle irtibata geçmek ister misiniz?</span><br/>
        Soru veya görüşlerinizi bizlere iletmek için iletişim sayfamızı ziyaret edebilirsiniz.
      </div>

      <Link to='/iletisim'>Ilestim</Link>
      </div>
    
      <HomeContent />
    </div>
  )
}

export default Home