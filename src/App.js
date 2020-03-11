import React from 'react';
import './App.css';
import MonacoEditor from 'react-monaco-editor';
import Element from './Element'
import {codeCTO}  from './Code'
var mappedElements = new Map();
var classNameProperties = new Map();
var classNamePropertiesArr = []
var nameSpaceName = ""
var importSection = []
// var nodeData = []  //this will be passed as prop to form as state

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: codeCTO,
      nodeData: [],
      nodeDataObj : {},
      hasError : false
    }
  }
  //EDitor
  editorDidMount(editor, monaco) {
    editor.focus();
  }
  findClassNameAndProp(code){
    // console.log("PROPERTIES")
    classNameProperties.clear()
    var codeline = code.split('\n')
    for(let idx in codeline) {
      const lineOfCode = codeline[idx]
      if(lineOfCode.includes("concept") || 
        lineOfCode.includes("asset") 
        && 
        lineOfCode.includes("{")) {
        const wordOfLine = lineOfCode.trim().split(" ");
        let index = 0;
        if (wordOfLine.includes("asset")) {
          index = wordOfLine.indexOf("asset")
        } else if (wordOfLine.includes("concept")) {
          index = wordOfLine.indexOf("concept")
        }
        const classNames = wordOfLine[index + 1];
        var propArr = [];
        while(!codeline[idx].includes("}")){
          if (!codeline[idx].includes("{")){
            const prop = codeline[idx].trim();
            propArr.push(prop);
            idx++;
          } else {
            idx++;
          }
          classNameProperties.set(classNames,propArr)
        }
      }
    }
    // console.log(classNameProperties)
  }

  findRelationships(code){
    // console.log("Relations")
    var codeline = code.split('\n')
    mappedElements.clear()
    for(let idx in codeline) {
      const lineOfCode = codeline[idx];
      if (lineOfCode.includes("asset") || lineOfCode.includes("concept")){
        const wordOfLine = lineOfCode.trim().split(" ")
        //find relations & map namewise
        const extendsIdx = wordOfLine.indexOf("extends");
        if (extendsIdx >= 0) {
          const fromClass = wordOfLine[extendsIdx + 1]
          const toClass = wordOfLine[extendsIdx - 1]
          mappedElements.set(mappedElements.size + 1, {fromClass, toClass})
        }
      } 
    }
    // console.log(mappedElements)
  }

  findNamespace(code) {
    // console.log("Namespace")
    var codeline = code.split('\n')
    for(let idx in codeline) {
      const lineOfCode = codeline[idx]
      if (lineOfCode.includes("namespace") && 
        idx < 100) {
        const wordOfLine = lineOfCode.trim().split(" ")
        const index = wordOfLine.indexOf("namespace")
        nameSpaceName = wordOfLine[index + 1]
        // console.log(nameSpaceName)
      }
    }
  }
  findImports(code){
    // console.log("Imports")
    var codeline = code.split('\n')
    for(let idx in codeline) {
      const lineOfCode = codeline[idx]
      if (lineOfCode.includes("import")) {
        const wordOfLine = lineOfCode.trim().split(" ")
        const index = wordOfLine.indexOf("import")
        importSection.push(wordOfLine[index + 1])
      }
    }
    // console.log(importSection)
  }
  createNodeArrJSON(){
    let someArr = []
    let obj = {key: null, text: null, properties: []}
    let idx = 0;
    classNameProperties.forEach(function(val,asd){
      idx++;
      let someObj = {key: idx, text: asd, properties: val}
      Object.assign(obj,someObj)
      someArr.push(someObj)
    })
    let longJSON = ''
    // console.log((JSON.stringify(classNamePropertiesArr).replace(/"([^"]+)":/g, '$1:')))
    longJSON = JSON.stringify(someArr).replace(/"([^"]+)":/g, '$1:') // .substring(1, longJSON.length-1)
    // this.state.nodeData = longJSON
    this.state.nodeData.push(longJSON)
    var JSONobj = eval(this.state.nodeData[0])
    // console.log(JSONobj)
    this.state.nodeDataObj = JSONobj
    // console.log(this.state.nodeDataObj, typeof(this.state.nodeDataObj))
  }
  parseCode(code){
    try {
      this.state.nodeData.pop()
      this.findImports(code);
      this.findNamespace(code);
      this.findClassNameAndProp(code);
      this.findRelationships(code);
      this.createNodeArrJSON();
    } catch(e) {
      // alert(e);
      console.log("ERROR !")
    }
    

  }
  onChange(newValue, e) {
    //  console.log('onChange', newValue, e);
    //  console.log(newValue);
    try {
      this.setState({
        code: newValue
      })
      console.log(this.state.code)
      this.parseCode(this.state.code)
    } catch(e) {
      alert(e)
    }
    
  }
  componentDidMount(){
    try{
      this.parseCode(this.state.code)
    } catch(e) {
      alert(e);
    }
  } 
  componentDidCatch(error, info) {
    this.setState({ hasError : true });
    alert(error, info)
  }

  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    // console.log(this.state.nodeData)
    return (
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
          classDataArray={this.state.nodeDataObj}
        />
      </div>
    );
  }
}

export default App;

