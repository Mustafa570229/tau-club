import React from 'react'
import "./Footer.css"
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
const Footer = () => {
  return (
    <div className='footer-div-main'>
      <div className='footer'>
        <div className='footer-list'>
          <Link to="/">Home</Link>
          <Link to="/biz-kimiz">Biz Kimiz</Link>
          <Link to="/neler-yaptik">Neler Yaptik</Link>
          <Link to="/iletisim">Iletisim</Link>
        </div>
        <div className='footer-mid'>
          <div className='social'>

            <Link to='youtube.com'> <FaFacebook color='blue'/></Link>
            <Link href='#'> <FaInstagram color='#f25' /></Link>
            <Link href='#'> <FaYoutube color='red'/></Link>
            <Link href='#'> <FaTwitter color='skyblue'/></Link>
          </div>
          <div className='footer-search'>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
          </div>
        </div>




      </div>
      <div className='copyright'>
        <div className='programmed'>Programmed by Mustafa</div>
        <div className='copyright-copyright'>copyright</div>

      </div>
    </div>
  )
}

export default Footer