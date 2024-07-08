// src/pages/SQLCallComponent.js
import React, { useState } from 'react';
import ServerSettings from './ServerSettings';
import SQLQueryEditor from './SQLQueryEditor';
import XMLToTableConverter from '../components/XMLToTableConverter';
import QueryHistory from '../components/QueryHistory';
import 'bootstrap/dist/css/bootstrap.min.css';

function SQLCallComponent() {
  const [server, setServer] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [errorText, setErrorText] = useState('');
  const [query, setQuery] = useState('');
  const [description, setDescription] = useState('');
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('queryHistory')) || []);

  function handleSelectServer(server) {
    setServer(server);
  }

  async function handleExecuteQuery(query, description) {
    if (!server) {
      alert('Please select a server.');
      return;
    }

    try {
      const response = await fetch(`${server.url}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const responseText = await response.text();

      if (!response.ok) {
        setErrorText(responseText);
        throw new Error(`Server error: ${response.statusText} - ${responseText}`);
      }

      setResponseText(responseText);
      setErrorText('');
      setQuery(query);
      setDescription(description);
      saveQueryToHistory(query, description);
    } catch (error) {
      console.error('Error executing query:', error);
      setErrorText(`Error executing query: ${error.message}`);
      alert('Error executing query. Check console for details.');
    }
  }

  function saveQueryToHistory(query, description) {
    const newHistory = [{ query, description, timestamp: new Date().toLocaleString() }, ...history];
    setHistory(newHistory);
    localStorage.setItem('queryHistory', JSON.stringify(newHistory));
  }

  function handleHistoryClick(query, description) {
    setQuery(query);
    setDescription(description);
  }

  function clearHistory() {
    localStorage.removeItem('queryHistory');
    setHistory([]);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <ServerSettings onSelectServer={handleSelectServer} />
          <SQLQueryEditor onExecuteQuery={handleExecuteQuery} initialQuery={query} initialDescription={description} />
          {errorText && (
            <div>
              <h6 className="mt-3">Error:</h6>
              <pre>{errorText}</pre>
            </div>
          )}
          {responseText && (
            <div>
              <XMLToTableConverter xmlText={responseText} />
            </div>
          )}
        </div>
        <div className="col-md-3">
          <QueryHistory history={history} onClick={handleHistoryClick} clearHistory={clearHistory} setHistory={setHistory} />
        </div>
      </div>
    </div>
  );
}

export default SQLCallComponent;
