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
    this.diagramRef = React.createRef()
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

    this.handleDiagramEvent = this.handleDiagramEvent.bind(this)
    this.handleModelChange = this.handleModelChange.bind(this)
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
    // console.clear()
    console.log("Handle this model")
    updateDiagram()
  }
  handleDiagramEvent(e) {
    const name = e.name;
    switch (name) {
      case "ChangedSelection": {
        const sel = e.subject.first();
        console.log(sel)
        // this.setState(
        //   produce((draft: AppState) => {
        //     if (sel) {
        //       if (sel instanceof go.Node) {
        //         const idx = this.mapNodeKeyIdx.get(sel.key);
        //         if (idx !== undefined && idx >= 0) {
        //           const nd = draft.nodeDataArray[idx];
        //           draft.selectedData = nd;
        //         }
        //       } else if (sel instanceof go.Link) {
        //         const idx = this.mapLinkKeyIdx.get(sel.key);
        //         if (idx !== undefined && idx >= 0) {
        //           const ld = draft.linkDataArray[idx];
        //           draft.selectedData = ld;
        //         }
        //       }
        //     } else {
        //       draft.selectedData = null;
        //     }
        //   })
        // );
        break;
      }
      default:
        break;
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
            refer={this.diagramRef}
            nodeData={this.state.nodeData}
            linkData={this.state.linkData}
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

