import React, { useState } from 'react'
import "./HomeContent.css"
import { useEffect } from "react";
import { db } from "../firebase"
import "firebase/firestore";
import { collection, onSnapshot } from 'firebase/firestore';


const HomeContent = () => {
  const [news, setNews] = useState([])
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'news'), (snapshot) => {
      setNews(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [setNews]);
  return (
    <>
      {news.map((item, index) => (
        <div key={index} className='content'>
          <div className='content-img'><img src={item.url} alt="..." /></div>
          <div className='content-content'>
            <div className='content-title'>{item.title}</div>
            <div className='content-desc'>{item.content}</div>
            <div className='content-date'> {item.createdAt.toDate().toLocaleString()}</div>
          </div>
        </div>
      ))}
    </>
  )
}
export default HomeContent