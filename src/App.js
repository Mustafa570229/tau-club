import React from 'react'
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom'
import Home from "./pages/Home"
import BizKimiz from "./pages/BizKimiz"
import NelerYaptik from "./pages/NelerYaptik"
import Iletisim from "./pages/Iletisim"


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/biz-kimiz' element={<BizKimiz/>}/>
          <Route path='/neler-yaptik' element={<NelerYaptik/>}/>
          <Route path='/iletisim' element={<Iletisim/>}/>

        </Routes>
      </Router>
    </div>
  )
}

export default App