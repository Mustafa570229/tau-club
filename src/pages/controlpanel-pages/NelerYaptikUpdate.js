import { useEffect, useState } from "react";
import { ref, getDownloadURL, deleteObject, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { db } from '../../firebase';
import { collection, deleteDoc, doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { Alert, Button, Form, ProgressBar } from "react-bootstrap";
import { useAuth } from "../../context/ContextFirebase";
import { FaCheckCircle } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaFileAlt } from 'react-icons/fa';
import { FaCloudUploadAlt } from 'react-icons/fa';
function NelerYaptikUpdate() {
  const [imageUpload, setImageUpload] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(true)
  const [imageUploadVar, setImageUploadVar] = useState(true)
  const [progress, setProgress] = useState(0)
  const [progressVar, setProgressVar] = useState(true)


  const { neleryaptik, setNeleryaptik } = useAuth()

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setImageUpload((prev) => [...prev, file])

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (file) {
            setImagePreviewUrl((prevUrls) => [...prevUrls, reader.result]);

          }
        };
        uploadFile(file);
      }
    }
  };
  const uploadFile = async () => {
    if (imageUpload.length === 0) return;
  
    const promises = imageUpload.map((file) => {
      return new Promise((resolve, reject) => {
        const imageRef = ref(storage, `imagesNeleryaptik/${file.name}_${uuidv4()}`);
        const uploadTask = uploadBytesResumable(imageRef, file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
            setProgressVar(false);
            if (progress === 100) {
              setProgressVar(true);
            }
          },
          (error) => {
            console.error(error);
            reject(error);
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          }
        );
      });
    });
  
    try {
      const urls = await Promise.all(promises);
      setImageUrl(urls);
      setImagePreviewUrl([]);
      setImageUploadVar(false);
      setProgress(0);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(false)
    if (newTitle !== "" && newContent !== "" && imageUrl.length !== 0) {
      try {
        const date = new Date();
        await setDoc(doc(collection(db, 'neleryaptik'), date.getTime().toString()),
          {
            title: newTitle,
            content: newContent,
            url: imageUrl,
            createdAt: serverTimestamp()
          });
        setNewTitle('');
        setNewContent('');
        setImageUrl([]);
        setLoading(true)
        setSuccess(false)
        setImageUploadVar(true)
        setImageUpload([])
        setTimeout(() => setSuccess(true), 3000)
      } catch (error) {
        console.log('Adding failed');
      }
    }
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'neleryaptik'), (snapshot) => {
      setNeleryaptik(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [setNeleryaptik]);
  const handleDelete = async (id, url) => {
    try {
      await deleteDoc(doc(db, 'neleryaptik', id));
      url?.map((urlSingle) => {
        return deleteObject(ref(storage, `imagesNeleryaptik/${urlSingle.slice(87, -53)}`));
      });
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };


  return (
    <div className="news-panel">

      <div className="news-upload-panel">

        <div className="img-before-upload">{imagePreviewUrl?.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`SelectedImage ${index}`} />
        ))}</div>
        <div className="image-uploaded">
          {!imageUpload && !loading && <Alert variant="danger">enter a Content</Alert>}
          {!loading && imageUrl.length === 0 && <Alert variant="danger">upload a image</Alert>}
          {!progressVar && <ProgressBar now={progress} label={`${progress}%`} />}
          {!imageUploadVar && <span>images uploaded <FaCheckCircle /></span>}</div>
        <label htmlFor="imgfile" className="choose-file">choose image <FaFileAlt /></label>
        <input type="file" multiple onChange={handleFileInputChange} id="imgfile" style={{ display: "none" }} />

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
            <Button variant='primary' type='submit' className='mb-3'>
              Add to my web page
            </Button>
          </div>
        </Form>
        {!success && <Alert variant="success">successed upload</Alert>}
      </div>
      <div className="panel-showing-neler">
        {neleryaptik.map((item, index) => (
          <div key={index} className='content-panel'>
            <div className='content-img-panel-neler'>
              {item.url.map((url, i) => (
                <div key={i}>
                  <img  src={url} alt="..." />
                </div>
              ))}
              <div>
              </div>
            </div>
            <div className='content-content-panel'>
              <div className='content-title-panel'>{item.title}</div>
              <div className='content-desc-panel'>{item.content}</div>
              <div className='content-date-panel-neler'>
                <span>{item.createdAt?.toDate().toLocaleString()}</span>
                <span><FaTrash color="red" onClick={() => handleDelete(item.id, item.url)} /></span>
              </div>
            </div>
          </div>))}
      </div>
    </div>
  );
}
export default NelerYaptikUpdate;