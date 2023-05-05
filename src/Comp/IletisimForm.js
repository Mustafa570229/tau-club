import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const IletisimForm = () => {
  return (
    
        <div className='details'>
        <div className='form-div'>
          <div className='form-div-head'>
          Etkinliklerimizden haberdar olmak için E-Posta adresinizi bizimle paylaşabilirsiniz.
          </div>
        <Form>
      <Form.Group className="mb-3">
        <Form.Control type="text" placeholder="Enter your Name" />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Control type="email" placeholder="Enter Email" />
      </Form.Group>

      <Form.Group className="mb-3 muted" >
        <Form.Label>Enter yout message</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>

    </Form>
        </div>
        <div></div>
        <div></div>

      </div>
   
  )
}

export default IletisimForm