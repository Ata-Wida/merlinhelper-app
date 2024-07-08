// src/components/XMLToCSVConverter.js
import React from 'react';
import { Button } from 'react-bootstrap';

function xmlToJson(xml) {
  let obj = {};
  if (xml.nodeType === 1) {
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (let j = 0; j < xml.attributes.length; j++) {
        const attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) {
    obj = xml.nodeValue;
  }
  if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      const item = xml.childNodes.item(i);
      const nodeName = item.nodeName;
      if (typeof obj[nodeName] === "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push === "undefined") {
          const old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}

function convertToCSV(objArray) {
  const array = Array.isArray(objArray) ? objArray : [objArray];
  const header = Object.keys(array[0]);
  const csv = [
    header.join(','), // header row first
    ...array.map(row => header.map(fieldName => JSON.stringify(row[fieldName] || '')).join(',')),
  ].join('\r\n');

  return csv;
}

function downloadCSV(csv) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'query_result.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const XMLToCSVConverter = ({ xmlText }) => {
  const handleDownloadCSV = () => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const jsonResult = xmlToJson(xmlDoc);
    const csv = convertToCSV(jsonResult.results.row);
    downloadCSV(csv);
  };

  return (
    <Button onClick={handleDownloadCSV} variant="primary" className="mt-2">
      Download CSV
    </Button>
  );
};

export default XMLToCSVConverter;
