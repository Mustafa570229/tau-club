import Carousel from 'react-bootstrap/Carousel';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { db } from "../firebase"

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
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;
