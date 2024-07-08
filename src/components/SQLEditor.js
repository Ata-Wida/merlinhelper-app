import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { oneDark } from '@codemirror/theme-one-dark';

const SQLEditor = ({ value, onChange }) => {
  return (
    <CodeMirror
      value={value}
      height="300px"
      extensions={[sql()]}
      onChange={(editor, change) => {
        onChange(editor.getValue());
      }}
    />
  );
};

export default SQLEditor;
