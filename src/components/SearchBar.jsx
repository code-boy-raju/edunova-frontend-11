import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

function SearchBar({ onSearch, placeholder = "Search..." }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text>
        <i className="bi bi-search"></i> 🔍
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
      />
    </InputGroup>
  );
}

export default SearchBar;
