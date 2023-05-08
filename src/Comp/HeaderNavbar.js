// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import SearchForm from '../search/SearchForm';

function HeaderNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Anasayfa</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/biz-kimiz" >Biz Kimiz?</Nav.Link>
            <Nav.Link as={Link} to="/neler-yaptik">neler yaptik</Nav.Link>
            <Nav.Link as={Link} to="/iletisim">Iletisim</Nav.Link>
            <Nav.Link as={Link} to="/control-panel/duyular-update">Control Panel</Nav.Link>
          </Nav>

          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-primary">Search</Button>
          </Form> */}
          <SearchForm/>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderNavbar;