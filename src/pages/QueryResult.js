// src/pages/QueryResult.js
import React from 'react';
import { Table } from 'react-bootstrap';

function QueryResult({ result }) {
  if (!result) {
    return <div>No data</div>;
  }

  const rows = Array.isArray(result) ? result : [result];
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td key={colIndex}>{typeof row[header] === 'object' && row[header]['#text'] ? row[header]['#text'] : row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default QueryResult;
