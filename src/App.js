import React from 'react';
import './App.css';
import Diagram from './Diagram'
import CodeEditor from './Editor'
import { modelManager, nodeDataArray, linkDataArray } from './model'

class App extends React.Component {
  render() {
    return (
        <div style={{display:"grid", grid:"0px / auto auto"}}>
          <CodeEditor />   
          <Diagram />
        </div>
    );
  }
}

export default App;

