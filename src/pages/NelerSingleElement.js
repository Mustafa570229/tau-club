import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import "./NelerSingleElement.css"

const NelerSingleElement = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getNelerYaptikById = async (id) => {
      const docRef = doc(db, 'neleryaptik', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };
    getNelerYaptikById(id);
  }, [id]);

  return (
    <div className='nerler-single-element'>

      {data ?
        <>
          <div className='neler-title'>{data.title}</div>
          <div className='neler-content'>{data.content}</div>
          <div className='neler-images'>
            {data.url.map((url,index) => (
              <img key={index} src={url} alt='...'  />
            ))}
          </div>
        </>
        :
        <div>Loading...</div>}

    </div>
  );
};

export default NelerSingleElement;
