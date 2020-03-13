import React from 'react';
import './App.css';
import MonacoEditor from 'react-monaco-editor';
import Element from './Element'
import { Provider } from "react-redux"
import store from './store'
import {codeCTO}  from './Code'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: codeCTO,
      model: [],
      hasError : false,
      relations: []
    }
  }
  //EDitor
  editorDidMount(editor, monaco) {
    editor.focus();
  }

  generateRelations(model){
    const relationArr = []
    const concepts = model.map(r => {
      if(r.superType != null){
        const to = r.name
        const from = r.superType
        const relation = {to, from}
        relationArr.push(relation)
      }
    })
    this.setState({
      relations: relationArr
    })
    // console.log(this.state.relations)
  }

  parseCode(code){
    const ModelManager = require('@accordproject/concerto-core').ModelManager
    const modelManager = new ModelManager()
    modelManager.addModelFile(code);
    const models = modelManager.getModels() //gets the model name
    const namespaces = modelManager.getNamespaces() //gets the namespace name
    const concept = modelManager.getConceptDeclarations() //gives a concepts class
    const assets = modelManager.getAssetDeclarations() //gives an asset class 
    this.generateRelations(concept)
    this.setState({
      model : concept,
    })  
    console.log(this.state.model)
    // console.log(concept.map(s => console.log( s,s.name, s.properties)))
  }
  onChange(newValue, e) {
    try{
      this.setState({
        code : newValue
      })
      this.parseCode(this.state.code)
    }catch(e){
      console.log("ERROR !")
    }
  }
  componentDidMount(){
    try{
      // console.log(this.state.code)
      this.parseCode(this.state.code)
    } catch(e) {
      console.log("ERROR!")
    }
  } 

  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    console.log(this.state.relations)
    return (
      <Provider store={store}>
        <div style={{display:"grid", grid:"0px / auto auto"}}>
          <MonacoEditor
            width="700"
            height="720"
            language="javascript"
            theme="vs-dark"
            value={code}
            options={options}
            onChange={this.onChange.bind(this)}
            editorDidMount={this.editorDidMount}
          />   
          <Element 
            classDataArray={this.state.model}
            linkDataArr={this.state.relations}
          />
        </div>
      </Provider>
    );
  }
}

export default App;

