import Carousel from 'react-bootstrap/Carousel';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { db } from "../firebase"
import "./Slider.css"

function Slider() {
  const [imageSlider, setImageSlider] = useState([])
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'image-slider'), (snapshot) => {
      setImageSlider(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [setImageSlider]);
  return (
    <Carousel fade>
      {imageSlider.map((item, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={item.url}
            alt={item.title}
          />
          <Carousel.Caption>
            <h6 className='slider-title'>{item.title}</h6>
            <p className='slider-p'>{item.content}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;
