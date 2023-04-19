import React from 'react'
import Slider from '../Comp/Slider'
import HeaderNavbar from '../Comp/HeaderNavbar'
import  "./Home.css"
import MainHeader from '../Comp/MainHeader'
import HomeContent from '../Comp/HomeContent'
import Footer from '../Comp/Footer'

const Home = () => {
  return (
    <div className='home'>
      <MainHeader/>
      <HeaderNavbar/>
      <Slider/>
      <HomeContent/>
      <Footer/>
    </div>
  )
}

export default Home