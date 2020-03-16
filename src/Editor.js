import React from 'react'
import MonacoEditor from 'react-monaco-editor';
import {generateModelFromCode} from "./model"
import { codeCTO } from './Code'


class CodeEditor extends React.Component {
  editorDidMount(editor, monaco) {
    editor.focus();
  }
  render(){
    const options = {
      selectOnLineNumbers: true
    };
    return(
      <MonacoEditor
        width="700"
        height="752"
        language="javascript"
        theme="vs-dark"
        value={this.props.code}
        options={options}
        onChange={this.props.onChange}
        editorDidMount={this.editorDidMount}
      />
    )
  }
}

export default CodeEditor