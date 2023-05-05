import React, { useEffect, useState } from 'react';
import { collection, doc, deleteDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';
import './ControlPanel.css';
import { FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/ContextFirebase';

const DuyularUpdate = () => {
  const [newDuyular, setNewDuyular] = useState('');
  const { data, setData } = useAuth()
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false)


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'duyular'), (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [setData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(false);

    if (newDuyular !== '') {
      try {
        const date = new Date();
        await setDoc(doc(collection(db, 'duyular'), date.getTime().toString()), { text: newDuyular });
        setNewDuyular('');
        setLoading(true)
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 3000);
      } catch (error) {
        console.log('Adding failed');
      }
    }

  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'duyular', id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  return (
    <div className='main-div'>

      <div className='adding'>

        <Form onSubmit={handleSubmit}>
          {!loading && !newDuyular && <Alert variant='danger'>enter a duyular</Alert>}
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label className='adding-head'>Enter a new duyular</Form.Label>
            <Form.Control
              type='text'
              placeholder='Write here'
              value={newDuyular}
              onChange={(event) => setNewDuyular(event.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit' className='mb-3'>
            Add
          </Button>
        </Form>
        <div>{success && <Alert variant='success'>Added successfully!</Alert>}</div>

      </div>
      <div className='showing'>
        <h4>Duyular List</h4>
        <div className='items'>
          {data.map((item, index) => (
            <div className='item' key={index}>
              <span>{item.text}</span>
              <span><FaTrash onClick={() => handleDelete(item.id)} /></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DuyularUpdate;
