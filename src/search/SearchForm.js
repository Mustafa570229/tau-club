import React from 'react'
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search-result/${searchTerm}`);
      setSearchTerm('')
    }
  };
  return (
    <Form className="d-flex" onSubmit={handleSearch}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="outline-primary" type="submit">
        Search
      </Button>
    </Form>
  )
}

export default SearchForm