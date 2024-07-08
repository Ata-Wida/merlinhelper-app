// src/pages/SQLCallComponent.js
import React, { useState } from 'react';
import ServerSettings from './ServerSettings';
import SQLQueryEditor from './SQLQueryEditor';
import XMLToCSVConverter from '../components/XMLToCSVConverter';
import XMLToTableConverter from '../components/XMLToTableConverter';

function SQLCallComponent() {
  const [server, setServer] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [errorText, setErrorText] = useState('');

  function handleSelectServer(server) {
    setServer(server);
  }

  async function handleExecuteQuery(query) {
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
    } catch (error) {
      console.error('Error executing query:', error);
      setErrorText(`Error executing query: ${error.message}`);
      alert('Error executing query. Check console for details.');
    }
  }

  return (
    <div className="container">
      <h1>SQL Query App</h1>
      <ServerSettings onSelectServer={handleSelectServer} />
      <SQLQueryEditor onExecuteQuery={handleExecuteQuery} />
      {/* <div>
        <h2>Response:</h2>
        <pre>{responseText}</pre>
      </div> */}
      {errorText && (
        <div>
          <h2>Error:</h2>
          <pre>{errorText}</pre>
        </div>
      )}
      {responseText && (
        <div>
          <XMLToCSVConverter xmlText={responseText} />
          <XMLToTableConverter xmlText={responseText} />
        </div>
      )}
    </div>
  );
}

export default SQLCallComponent;
