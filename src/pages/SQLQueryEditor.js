import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import SQLEditor from '../components/SQLEditor';

const SQLQueryEditor = ({ onExecuteQuery, initialQuery, initialDescription, queryInputRef }) => {
  const [query, setQuery] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
    if (initialDescription) {
      setDescription(initialDescription);
    }
  }, [initialQuery, initialDescription]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onExecuteQuery(query, description);
  };

  const clearQueryAndDescription = () => {
    setQuery('');
    setDescription('');
    if (queryInputRef && queryInputRef.current) {
      queryInputRef.current.focus();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="query">
        <Form.Label style={{ fontSize: 'small' }}>
          <Button variant="link" onClick={clearQueryAndDescription} style={{ padding: 0, fontSize: 'small' }}>
            SQL Query
          </Button>
        </Form.Label>
        <SQLEditor value={query} onChange={setQuery} />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label style={{ fontSize: 'small' }}>Description</Form.Label>
        <Form.Control
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ fontSize: 'small' }}
        />
      </Form.Group>
      <Button variant="primary" type="submit" size="sm">
        Execute Query
      </Button>
    </Form>
  );
};

export default SQLQueryEditor;
