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
import { Grid } from 'semantic-ui-react';

const App = () => {
  const [model, updateModel] = useState([]);
  const [code, updateCode] = useState('');
  const [codeChange, flipCodeChange] = useState(false);
  const [codegen, changeCodeGen] = useState('Concerto');
  const [firstRender] = useState(null);

  // on model change
  const addModelListener = () => {
    diagram.addModelChangedListener(evt => {
      // this runs every time a diagram updates
      if (!codeChange) {
        let newModel = evt.model.Cc;
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
    updateGoJS(dupModel);
  }

  // handle dropdown changes
  const handleDropDown = (e, evt) => {
    changeCodeGen(String(evt.value));
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
      <NavBar dropDown={handleDropDown} click={handleUpdate} />
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
            setupPalette={setupPalette}
            setupDiagram={setupDiagram}
          />
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
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