import React from 'react';
import './App.css';
import Diagram from './Diagram'
import CodeEditor from './Editor'
import { 
  modelManager, 
  nodeDataArray, 
  linkDataArray,
  generateModelFromCode,
  updateDiagram
} from './model'
import { codeCTO } from './Code';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code : codeCTO,
      nodeData : [],
      linkData : [],
      modelData: {
        canRelink: true
      },
      selectedData: null,
      skipsDiagramUpdate: false
    }
  }
  parseCode(code){
    const ModelManager = require('@accordproject/concerto-core').ModelManager
    const modelManager = new ModelManager()
    modelManager.addModelFile(code);
    const modelFile = modelManager.getModelFiles()
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
  handleModelChange() {
    console.log("Handle this model")
    updateDiagram()
  }
  handleDiagramEvent() {
    console.log(("handle diagram event"))
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
            modelData={this.state.modelData}
            skipsDiagramUpdate={this.state.skipsDiagramUpdate}
            handleModelChange={this.handleModelChange}
            handleDiagramEvent={this.handleDiagramEvent}
          />
        </div>
    );
  }
}

export default App;

