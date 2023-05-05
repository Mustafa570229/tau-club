import React from 'react'
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom'
import Home from "./pages/Home"
import BizKimiz from "./pages/BizKimiz"
import NelerYaptik from "./pages/NelerYaptik"
import Iletisim from "./pages/Iletisim"
import MainHeader from './Comp/MainHeader'
import HeaderNavbar from './Comp/HeaderNavbar'
import Footer from './Comp/Footer'
import "./pages/Home.css"



const App = () => {
  return (
    <div className='home'>
 
      <Router>
      <MainHeader/>
      <HeaderNavbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/biz-kimiz' element={<BizKimiz/>}/>
          <Route path='/neler-yaptik' element={<NelerYaptik/>}/>
          <Route path='/iletisim' element={<Iletisim/>}/>

        </Routes>
      <Footer/>
      </Router>
    </div>
  )
}

export default App