import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot} from 'firebase/firestore';
import { db } from '../../firebase';
import "./ControlPanel.css"
import { FaTrash } from 'react-icons/fa';


const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [setMessages]);
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };
  return (
    <div className='message-container'>
      {messages.map((item, index) => {
        return (
          <div key={index} className='message'>
            <div className='name-email'>
            <div className='name'><span>Name : </span>{item.name}</div>
            <div className='email'><span>Email : </span>{item.email}</div>
            <span><FaTrash color="red" onClick={() => handleDelete(item.id)} /></span>
            </div>
          
            <div className='message-text'>{item.message}</div>
            <div className='content-date-panel'>
                {item.createdAt?.toDate().toLocaleString()}
              </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
