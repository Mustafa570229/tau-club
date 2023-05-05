import React, { useState, useEffect } from 'react';
import './MainHeader.css';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const MainHeader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([]);


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'duyular'), (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [data]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % data.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentIndex, data]);

  return (
    <div className='MainHeader'>
      <div className='MainHeader-head'>
        <div className='duyurular'>Duyurular</div>
        <div className='duyurular-text'>{data[currentIndex]?.text}</div>
      </div>
      <div className='MainHeader-bottom'></div>
    </div>
  );
};

export default MainHeader;
