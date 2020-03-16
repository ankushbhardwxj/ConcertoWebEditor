import React from 'react'
import MonacoEditor from 'react-monaco-editor';
import {generateModelFromCode} from "./model"
import { codeCTO } from './Code'


class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: codeCTO
    }
  }

  editorDidMount(editor, monaco) {
    editor.focus();
  }
    //EDitor
  parseCode(code){
    const ModelManager = require('@accordproject/concerto-core').ModelManager
    const modelManager = new ModelManager()
    modelManager.addModelFile(code);
    const modelFile = modelManager.getModelFiles()
    // console.log(modelManager.modelFiles['concerto.metamodel'].declarations)
    generateModelFromCode(modelFile)
  }
  
  onChange(newValue, e) {
    console.clear()
    try {
      this.parseCode(newValue)
      this.setState({
        code: newValue
      })
    } catch(e) {
      console.log("ERROR!");
    }
  }
  
  componentDidMount() {
    try {
      this.parseCode(this.state.code)
    }catch(e) {
      console.log("ERROR!");
    }
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
        value={this.state.code}
        options={options}
        onChange={this.onChange.bind(this)}
        editorDidMount={this.editorDidMount}
      />
    )
  }
}

export default CodeEditor