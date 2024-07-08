// src/pages/SQLQueryEditor.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function SQLQueryEditor({ onExecuteQuery }) {
  const [query, setQuery] = useState('');

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleExecute(e) {
    e.preventDefault();
    onExecuteQuery(query);
  }

  return (
    <Form onSubmit={handleExecute}>
      <Form.Group controlId="sqlQuery">
        <Form.Label>SQL Query</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Write your SQL query here..."
          value={query}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">
        Execute Query
      </Button>
    </Form>
  );
}

export default SQLQueryEditor;
