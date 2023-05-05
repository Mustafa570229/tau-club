import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { collection,  doc,  setDoc, serverTimestamp } from 'firebase/firestore';
import {db} from "../firebase"
import { Alert } from 'react-bootstrap';


const IletisimForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(true)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(false)
    if (name !== "" && email !== "" && message !== "") {
      try {
        const date = new Date();
        await setDoc(doc(collection(db, 'messages'), date.getTime().toString()),
          { name: name, email: email, message: message, createdAt: serverTimestamp() });
          setName('');
          setEmail('');
          setMessage('');
        setLoading(true)
        setSuccess(false)
      } catch (error) {
        console.log('Adding failed');
      }
      setTimeout(() => setSuccess(true), 3000)
    }
  };

  return (
    <div className='details'>
      <div className='form-div'>
        <div className='form-div-head'>
          Etkinliklerimizden haberdar olmak için E-Posta adresinizi bizimle paylaşabilirsiniz.
        </div>
        <Form onSubmit={handleSubmit}>
        {!name && !loading && <Alert variant="danger">enter your name</Alert>}

          <Form.Group className="mb-3">
            <Form.Control type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>
          {!email && !loading && <Alert variant="danger">enter your email</Alert>}

          <Form.Group className="mb-3" >
            <Form.Control type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>
          {!message && !loading && <Alert variant="danger">enter a message</Alert>}
          <Form.Group className="mb-3 muted" >
            <Form.Label>Enter your message</Form.Label>
            <Form.Control as="textarea" rows={3}
              value={message}
              onChange={(event) => setMessage(event.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        {!success && <Alert variant="success">successed sending</Alert>}

        </Form>
      </div>
    </div>
  )
}

export default IletisimForm;
