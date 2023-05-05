import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import BizKimiz from "./pages/BizKimiz"
import NelerYaptik from "./pages/NelerYaptik"
import Iletisim from "./pages/Iletisim"
import MainHeader from './Comp/MainHeader'
import HeaderNavbar from './Comp/HeaderNavbar'
import Footer from './Comp/Footer'
import "./pages/Home.css"
import ControlPanel from './pages/controlpanel-pages/ControlPanel'
import Login from './pages/Login'
import AuthProvider from './context/ContextFirebase'
import RequireAuth from './context/RequiredAuth';
import SliderImages from './pages/controlpanel-pages/SliderImages';
import DuyularUpdate from './pages/controlpanel-pages/DuyularUpdate';
import NelerYaptikUpdate from './pages/controlpanel-pages/NelerYaptikUpdate';
import Messages from './pages/controlpanel-pages/Messages';
import NewsUpdate from './pages/controlpanel-pages/NewsUpdate';
import NelerSingleElement from './pages/NelerSingleElement'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from "./firebase"

const App = () => {
  const [neleryaptik, setNeleryaptik] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'neleryaptik'), (snapshot) => {
      setNeleryaptik(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className='home'>
      <Router>
        <AuthProvider>
          <MainHeader />
          <HeaderNavbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/biz-kimiz' element={<BizKimiz />} />
            <Route path='/neler-yaptik' element={<NelerYaptik />} />
            {neleryaptik.map((item) => (
              <Route key={item.id} path={`/neler-yaptik/${item.id}`} 
              element={<NelerSingleElement id={item.id} />} />
            ))
            }
            <Route path='/iletisim' element={<Iletisim />} />
            <Route path='/control-panel' element={<RequireAuth><ControlPanel /></RequireAuth>}>
              <Route path='slider-images-update' element={<SliderImages />} />
              <Route path='duyular-update' element={<DuyularUpdate />} />
              <Route path='neler-yaptik-update' element={<NelerYaptikUpdate />} />
              <Route path='messages' element={<Messages />} />
              <Route path='news-updates' element={<NewsUpdate />} />
            </Route>
            <Route path='/login' element={<Login />} />
          </Routes>
        </AuthProvider>
        <Footer />
      </Router>
    </div>
  )
}
export default App