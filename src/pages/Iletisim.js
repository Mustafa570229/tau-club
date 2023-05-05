import React from 'react'
import IletisimForm from './../Comp/IletisimForm';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

import "./Iletisim.css"

const Iletisim = () => {
  return (
    <div className='iletisim'>
      <div className='iletisim-text'>
        <p>
        Soru veya görüşlerinizi Facebook , Twitter , Youtube , Telegram, Instagram adreslerimizden ,
        e-posta yoluyla ya da aşağıdaki form aracılığı ile bize ulaştırabilirsiniz.
        E-Posta Adresimiz: bisak@boun.edu.tr
        </p>
    
        <div className='social'>

          <a href='#'> <FaFacebook color='blue' /></a>
          <a href='#'> <FaInstagram color='#f25' /></a>
          <a href='#'> <FaYoutube color='red' /></a>
          <a href='#'> <FaTwitter color='skyblue' /></a>

        </div>
      </div>


      <IletisimForm />


    </div>
  )
}

export default Iletisim