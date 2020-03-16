import React from 'react';
import './App.css';
import Diagram from './Diagram'
import CodeEditor from './Editor'
import { modelManager, nodeDataArray, linkDataArray,generateModelFromCode } from './model'
import { codeCTO } from './Code';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code : codeCTO,
      nodeData : [],
      linkData : []
    }
  }
  parseCode(code){
    const ModelManager = require('@accordproject/concerto-core').ModelManager
    const modelManager = new ModelManager()
    modelManager.addModelFile(code);
    const modelFile = modelManager.getModelFiles()
    // console.log(modelManager.modelFiles['concerto.metamodel'].declarations)
    generateModelFromCode(modelFile)
    this.setState({
      nodeData : nodeDataArray, 
      linkData : linkDataArray
    })
  }
  onChange(newValue) {
    console.clear()
    try {
      this.parseCode(newValue)
      this.setState({
        code: newValue
      })
    } catch(e) {
      console.log(e);
    }
  }
  componentDidMount(){
    try {
      this.parseCode(this.state.code)
    }catch(e) {
      console.log(e)
    }
  }
  render() {
    return (
        <div style={{display:"grid", grid:"0px / auto auto"}}>
          <CodeEditor 
            code = {this.state.code}
            onChange = {this.onChange.bind(this)}
          />   
          <Diagram 
            nodeData = {this.state.nodeData}
            linkData = {this.state.linkData}
          />
        </div>
    );
  }
}

export default App;

