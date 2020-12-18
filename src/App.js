import React, { useEffect, useState } from 'react';
import './App.css';
import CodeEditor from './Editor';
import Diagram from './Diagram';
import NavBar from './NavBar';
import {
  setupPaletteDiagram,
  setupPaletteNodeData,
  setupUMLDiagram,
  diagram, updateGoJS
} from './gojsHelper';
import { jsonToCode } from './codegen';
import { parse } from './model';
import { Container, Grid, Message } from 'semantic-ui-react';
import { ModelManager } from '@accordproject/concerto-core';

const App = () => {
  const [model, updateModel] = useState([]);
  const [code, updateCode] = useState('');
  const [codeChange, flipCodeChange] = useState(false);
  const [codegen, changeCodeGen] = useState('Concerto');
  const [firstRender] = useState(null);
  const [testResult, toggleTestResults] = useState(null);
  const [testValidation, toggleTestValidation] = useState(null);

  // on model change
  const addModelListener = () => {
    diagram.addModelChangedListener(evt => {
      // this runs every time a diagram updates
      if (!codeChange) {
        let newModel = evt.model.Cc;
        console.log(newModel);
        if (newModel != model) {
          if (codegen != 'JSON') {
            updateModel(newModel);
            generateCode(newModel);
            flipCodeChange(!codeChange);
          } else {
            updateModel(newModel);
            generateJSONCode(newModel);
            flipCodeChange(!codeChange);
          }
        } else {
          if (codegen != 'JSON') {
            generateCode(newModel);
          } else {
            generateJSONCode(newModel);
          }
        }
      }
    })
  }

  const generateJSONCode = model => {
    let jsonCode = JSON.stringify(model, null, 2);
    updateCode(jsonCode);
  }

  const generateCode = (json) => {
    let newCode;
    newCode = jsonToCode(json);
    updateCode(newCode);
  }
  // on code changes
  const onCodeChange = code => {
    flipCodeChange(true);
    updateCode(code);
    generateModel(code);
  }

  const generateModel = code => {
    const newModel = parse(code);
    updateModel(newModel);
  }

  // diagram render
  const setupPalette = () => {
    setupPaletteDiagram()
    setupPaletteNodeData()
  }

  const setupDiagram = () => {
    setupUMLDiagram(model)
    addModelListener()
  }

  const handleUpdate = () => {
    let dupModel = model;
    let nodeData = [];
    let linkData = [];
    // break model into linkData & nodeData
    dupModel.forEach(r => {
      if (Object.keys(r).includes('from')) linkData.push(r);
      else nodeData.push(r);
    })
    // remove keys from linkData
    linkData.forEach(r => { r.key = ""; })
    updateGoJS(nodeData, linkData);
  }

  // handle dropdown changes
  const handleDropDown = (e, evt) => {
    changeCodeGen(String(evt.value));
  }

  // handle test button click
  const handleTestClick = () => {
    try {
      console.log(code)
      let m = new ModelManager().addModelFile(code);
      console.log(m)
      toggleTestValidation(true);
      toggleTestResults(`${Object(m)}`);
    } catch (e) {
      console.clear();
      console.log(e.message);
      toggleTestValidation(false);
      toggleTestResults(`${e.message}`);
    }
  }

  useEffect(() => {
    console.clear()
    setupPalette()
    setupDiagram()
  }, [firstRender])

  useEffect(() => {
    if (codegen == 'JSON') generateJSONCode(model);
    else generateCode(model);
    addModelListener()
  }, [codegen])

  return (
    <React.Fragment>
      <NavBar dropDown={handleDropDown} click={handleTestClick} />
      <Grid columns={2}>
        <Grid.Column width={7}>
          <CodeEditor
            code={code}
            onChange={onCodeChange}
          />
          {/* <button onClick={handleUpdate} id="update">Update</button> */}
        </Grid.Column>
        <Grid.Column width={8}>
          <Diagram
            model={model}
            paletteClass='myPalette'
            diagramClass='myDiagramDiv'
            setupPalette={setupPalette}
            setupDiagram={setupDiagram}
          />
        </Grid.Column>
      </Grid>
      {testValidation != null &&
        <>
          {testValidation &&
            <TestResult
              header="Valid Concerto Code (as per Accord Project Specs) !"
              message="Check Model Object in console."
              testResult={testResult}
              color="green"
            />
          }
          {!testValidation &&
            <TestResult
              header="Invalid Concerto Code (as per Accord Project Specs) ! "
              color="red"
              testResult={testResult}
            />
          }
        </>
      }
    </React.Fragment>
  );
}

const TestResult = props => {
  const { header, message, color, testResult } = props;
  return (
    <Message
      style={{
        backgroundColor: color, color: 'white',
        fontWeight: 'bold', paddingLeft: '20px'
      }}>
      <h3>{header}</h3>
      <p>{message || testResult}</p>
    </Message>
  )
}

export default App;

/*
- Make the diagram look like UML
  - Yellow box, with concept name
  - Dropdown collapse for properties
- Feed metadata to the GOJS model
- On diagram event, update the model with changes
  to nodeData and LinkData
*/