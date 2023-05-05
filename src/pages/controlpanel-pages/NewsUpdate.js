import { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { db } from '../../firebase';
import { collection, deleteDoc, doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { Alert, Button, Form } from "react-bootstrap";
import { useAuth } from "../../context/ContextFirebase";
import { FaCheckCircle } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaFileAlt } from 'react-icons/fa';
import { FaCloudUploadAlt } from 'react-icons/fa';

function ImageCommentForm() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(true)
  const [imageUploadVar, setImageUploadVar] = useState(true)
  const { news, setNews } = useAuth()

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}_${uuidv4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        setImagePreviewUrl(null);
        setImageUploadVar(false)
      });
    });
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setImageUpload(file);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(false)
    if (newTitle !== "" && newContent !== "" && imageUrl !== "") {
      try {
        const date = new Date();
        await setDoc(doc(collection(db, 'news'), date.getTime().toString()),
          { title: newTitle, content: newContent, url: imageUrl, createdAt: serverTimestamp() });
        setNewTitle('');
        setNewContent('');
        setImageUrl('');
        setLoading(true)
        setSuccess(false)
        setImageUploadVar(true)
      } catch (error) {
        console.log('Adding failed');
      }
      setTimeout(() => setSuccess(true), 3000)
    }
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'news'), (snapshot) => {
      setNews(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [setNews]);

  const handleDelete = async (id, url) => {
    try {
      await deleteDoc(doc(db, 'news', id));
      deleteObject(ref(storage, `images/${url.slice(76, -53)}`));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };
  return (
    <div className="news-panel">

      <div className="news-upload-panel">

        <div className="img-before-upload"> {imagePreviewUrl && <img
          src={imagePreviewUrl} alt="SelectedImage" />}</div>
        <div className="image-uploaded">
          {!loading && !imageUrl && <Alert variant="danger">upload a image</Alert>}
          {!imageUploadVar && <span>image uploaded <FaCheckCircle /></span>}</div>
        <label htmlFor="imgfile" className="choose-file">choose image <FaFileAlt /></label>
        <input type="file" onChange={handleFileInputChange} id="imgfile" style={{ display: "none" }} />

        <button className="upload-file-btn" onClick={uploadFile}>Upload image <FaCloudUploadAlt size={24} /></button>

        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label className='adding-head-panel'>Enter a new Title</Form.Label>
            {!newTitle && !loading && <Alert variant="danger">enter a title</Alert>}
            <Form.Control
              type='text'
              className="mb-5"
              placeholder='Title'
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
            />
            <Form.Label className='adding-head-panel'>Enter a new Content</Form.Label>
            {!newContent && !loading && <Alert variant="danger">enter a Content</Alert>}
            <Form.Control
              as="textarea"
              rows={3}
              placeholder='Content'
              value={newContent}
              onChange={(event) => setNewContent(event.target.value)}
            />
          </Form.Group>
          <div >
            <Button variant="primary" type='submit' className='mb-3 '>
              Add to my web page
            </Button>
          </div>
        </Form>
        {!success && <Alert variant="success">successed upload</Alert>}
      </div>
      <div className="panel-showing">
        {news.map((item, index) => (

          <div key={index} className='content-panel'>
            <div className='content-img-panel'>
              <img src={item.url} alt="..." />
              <div>
                <div className='content-title-panel'>{item.title}</div>

              </div>
              <span><FaTrash color="red" onClick={() => handleDelete(item.id, item.url)} /></span>
            </div>
            <div className='content-content-panel'>
              <div className='content-desc-panel'>{item.content}</div>
              <div className='content-date-panel'>
                {item.createdAt?.toDate().toLocaleString()}
              </div>
            </div>
          </div>

        ))}
      </div>
    </div>

  );
}

export default ImageCommentForm;
