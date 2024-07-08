// src/pages/ServerSettings.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';

function ServerSettings({ onSelectServer }) {
  const [servers, setServers] = useState([]);
  const [newServer, setNewServer] = useState({ name: '', url: '', dbName: '' });
  const [selectedServer, setSelectedServer] = useState('');

  useEffect(function() {
    console.log("Fetching server configurations...");
    fetch('/serverConfig.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Server configurations fetched: ", data);
        setServers(data);
      })
      .catch(error => {
        console.error('Error fetching server configurations: ', error);
      });
  }, []);

  function handleAddServer() {
    setServers([...servers, newServer]);
    setNewServer({ name: '', url: '', dbName: '' });
  }

  function handleSelectServer(name) {
    const server = servers.find(s => s.name === name);
    if (server) {
      setSelectedServer(server.name);
      setNewServer(server);
      onSelectServer(server);
    }
  }

  function handleChange(e, field) {
    setNewServer({ ...newServer, [field]: e.target.value });
  }

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <Form.Select value={selectedServer} onChange={(e) => handleSelectServer(e.target.value)}>
            <option value="">Select Server</option>
            {servers.map((server, index) => (
              <option key={index} value={server.name}>{server.name}</option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Server Name"
              value={newServer.name}
              onChange={(e) => handleChange(e, 'name')}
            />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Server URL"
              value={newServer.url}
              onChange={(e) => handleChange(e, 'url')}
            />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Database Name"
              value={newServer.dbName}
              onChange={(e) => handleChange(e, 'dbName')}
            />
          </InputGroup>
        </Col>
        <Col>
          <Button variant="primary" onClick={handleAddServer}>Add Server</Button>
        </Col>
      </Row>
    </div>
  );
}

export default ServerSettings;
