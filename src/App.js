import React from 'react';
import './App.css';
import MonacoEditor from 'react-monaco-editor';
import Element from './Element'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ``,
    }
  }
  //EDitor
  editorDidMount(editor, monaco) {
    editor.focus();
  }
  onChange(newValue, e) {
    //  console.log('onChange', newValue, e);
     console.log(newValue);
  }
  
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <div style={{display:"grid", grid:"0px / auto auto"}}>
        <MonacoEditor
          width="700"
          height="720"
          language="javascript"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />   
        <Element />
      </div>
    );
  }
}

export default App;

