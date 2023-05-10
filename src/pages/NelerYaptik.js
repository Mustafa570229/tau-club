import React, { useState, useEffect } from 'react';
import IletisimForm from '../Comp/IletisimForm';
import './NelerYaptik.css';
import { Link } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from "../firebase"
import { IoIosHeartEmpty } from 'react-icons/io';


const NelerYaptik = () => {
  const [neleryaptik, setNeleryaptik] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'neleryaptik'), (snapshot) => {
      setNeleryaptik(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className='neleryaptik'>
      <div className='neleryaptik-text'>
        {neleryaptik.map((item) => (
          <Link key={item.id} to={item.id}>
            <span><IoIosHeartEmpty style={{ color: "red", marginRight: "15px" }} /></span>
            <span>  {item.title}</span>
            <span>  {item.createdAt?.toDate().toLocaleString()}</span>
          </Link>
        ))}
      </div>
      <IletisimForm />
    </div>
  );
};

export default NelerYaptik;