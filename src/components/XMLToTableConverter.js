// src/components/XMLToTableConverter.js
import React from 'react';
import { Table } from 'react-bootstrap';
import xmlToJson from './xmlToJson';  // Make sure to import the xmlToJson function

const XMLToTableConverter = ({ xmlText }) => {
  const parser = new DOMParser();
  let jsonResult;

  try {
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    jsonResult = xmlToJson(xmlDoc);
  } catch (error) {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Error parsing XML</td>
          </tr>
        </tbody>
      </Table>
    );
  }

  const rows = jsonResult.results && jsonResult.results.row
    ? (Array.isArray(jsonResult.results.row) ? jsonResult.results.row : [jsonResult.results.row])
    : [];

  if (rows.length === 0) {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>No valid data found</td>
          </tr>
        </tbody>
      </Table>
    );
  }

  const headers = Object.keys(rows[0]).filter(key => key !== '#text');

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td>{rowIndex + 1}</td>
            {headers.map((header, colIndex) => (
              <td key={colIndex}>
                {typeof row[header] === 'object' && row[header] !== null && row[header]['#text'] ? 
                  row[header]['#text'] : 
                  (row[header] || '')
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default XMLToTableConverter;
