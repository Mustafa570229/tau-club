import "./Footer.css"
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import SearchForm from '../search/SearchForm';
const Footer = () => {
  const scroll = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className='footer-div-main'>
      <div className='footer'>
        <div className='footer-list'>
          <Link onClick={scroll} to="/">Home</Link>
          <Link onClick={scroll} to="/biz-kimiz">Biz Kimiz</Link>
          <Link onClick={scroll} to="/neler-yaptik">Neler Yaptik</Link>
          <Link onClick={scroll} to="/iletisim">Iletisim</Link>
        </div>
        <div className='footer-mid'>
          <div className='social'>
            <a href='https://www.facebook.com' target="_blank" rel="noreferrer"><FaFacebook color='blue' /></a>
            <a href='https://www.instagram.com' target="_blank" rel="noreferrer"><FaInstagram color='#f25' /></a>
            <a href='https://www.youtube.com' target="_blank" rel="noreferrer"><FaYoutube color='red' /></a>
            <a href='https://twitter.com' target="_blank" rel="noreferrer"><FaTwitter color='skyblue' /></a>
          </div>
          <div className='footer-search'>
            <SearchForm />
          </div>
        </div>




      </div>
      <div className='copyright'>
        <div className='programmed'>Designed and Developed by Mustafa</div>
        <div className='copyright-copyright'>copyright@2023</div>

      </div>
    </div>
  )
}

export default Footer