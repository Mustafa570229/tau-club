import React, { useState, useEffect } from 'react';
import './MainHeader.css';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { FaMoon, FaRegMoon } from 'react-icons/fa';

const MainHeader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'duyular'), (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % data.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentIndex, data]);

  // dark mode
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'light');

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.style.setProperty('--blue', '#222');
      root.style.setProperty('--sky', '#333');
      root.style.setProperty('--sky-light', '#999');
      root.style.setProperty('--white', '#222');
      root.style.setProperty('--dark', '#fff');
      root.style.setProperty('--gray', '#999');
      root.style.setProperty('--green', '#888');
      root.style.setProperty('--btn-hover', '#333');
      root.style.setProperty('--silber-dark', '#222');
      root.style.setProperty('--btn-color', '#222');
      root.style.setProperty('--form-color', '#222');





    } else {
      root.style.setProperty('--blue', '#147e8e');
      root.style.setProperty('--sky', '#199db2');
      root.style.setProperty('--sky-light', '#d4f0f5');
      root.style.setProperty('--white', '#fff');
      root.style.setProperty('--dark', '#222');
      root.style.setProperty('--gray', 'gray');
      root.style.setProperty('--green', 'green');
      root.style.setProperty('--silber-dark', '#c5d3d5');
      root.style.setProperty('--btn-color', '#0b5ed7');
      root.style.setProperty('--btn-hover', '#0d6efd');
      root.style.setProperty('--form-color', '#d4f0f5');


    }
    localStorage.setItem('mode', mode);
  }, [mode]);

  function toggleMode() {
    setMode(mode === 'light' ? 'dark' : 'light');
  }
  return (
    <div className='MainHeader'>
      <div className='MainHeader-head'>
        <div className='duyurular'>Duyurular</div>
        <div className='duyurular-text'>{data[currentIndex]?.text}</div>
        <span onClick={toggleMode}>
          {mode === 'dark' ? <FaMoon  /> : <FaRegMoon  />}
        </span>
      </div>
      <div className='MainHeader-bottom'></div>
    </div>
  );
};

export default MainHeader;
