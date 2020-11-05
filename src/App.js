import React, { useEffect, useState } from 'react';
import './App.css';
import CodeEditor from './Editor';
import { Container, Navbar, Row, Col } from 'react-bootstrap';
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

const App = () => {
  const [model, updateModel] = useState([]);
  const [code, updateCode] = useState('');
  const [codeChange, flipCodeChange] = useState(false);
  const [firstRender] = useState(null);

  // on model change
  const addModelListener = () => {
    diagram.addModelChangedListener((evt) => {
      // this runs every time a diagram updates
      if (!codeChange) {
        let newModel = evt.model.Cc;
        if (newModel != model) {
          updateModel(newModel);
          generateCode(newModel);
          flipCodeChange(!codeChange);
        } else {
          generateCode(newModel);
        }
      }
    })
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
    //updateGoJS(newModel);
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

  useEffect(() => {
    console.log("Change in model");
    console.log(model)
    console.log(codeChange);
  }, [model])

  useEffect(() => {
    console.clear()
    setupPalette()
    setupDiagram()
  }, [firstRender])

  return (
    <Container fluid>
      <NavBar />
      {/* <button id="button-json" onClick={() => handleClick("json")}>Show JSON</button>
      <button id="button-concerto" onClick={() => handleClick("concerto")}>Show Concerto</button> */}
      <Row>
        <Col>
          <CodeEditor
            code={code}
            onChange={onCodeChange}
          />
          <button onClick={handleUpdate} id="update">Update</button>
        </Col>
        <Col>
          <Diagram
            model={model}
            setupPalette={setupPalette}
            setupDiagram={setupDiagram}
          />
        </Col>
      </Row>
    </Container>
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