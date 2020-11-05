import React, { useEffect, useState } from 'react';
import './App.css';
import CodeEditor from './Editor'
import { Container, Navbar, Row, Col } from 'react-bootstrap'
import Diagram from './Diagram'
import NavBar from './NavBar'
import {
  setupPaletteDiagram,
  setupPaletteNodeData,
  setupUMLDiagram,
  diagram, addModelListener, updateGoJS
} from './gojsHelper'
import { jsonToCode } from './codegen';
import { parse } from './model'

const App = () => {
  const [model, updateModel] = useState([{ key: "A", metamodel: "concept", properties: "nothing", toNode: null }]);
  const [code, updateCode] = useState('');

  const setupPalette = () => {
    setupPaletteDiagram()
    setupPaletteNodeData()
  }

  const addModelListener = () => {
    diagram.addModelChangedListener((evt) => {
      updateModel(evt.model.Cc);
      generateCode(evt.model.Cc)
    })
  }

  const generateCode = (json) => {
    let newCode;
    console.log(json)
    newCode = jsonToCode(json);
    updateCode(newCode);
  }

  const setupDiagram = () => {
    setupUMLDiagram(model)
    addModelListener()
  }

  const handleClick = (e) => {
  }

  const generateModel = code => {
    const newModel = parse(code);
    updateModel(newModel);
    console.log(model)
    //updateGoJS(newModel);
  }

  const onCodeChange = code => {
    updateCode(code);
    generateModel(code);
  }

  useEffect(() => {
    console.clear()
    setupPalette()
    setupDiagram()
  }, [])

  return (
    <Container fluid>
      <NavBar />
      <button id="button-json" onClick={() => handleClick("json")}>Show JSON</button>
      <button id="button-concerto" onClick={() => handleClick("concerto")}>Show Concerto</button>
      <Row>
        <Col>
          <CodeEditor
            code={code}
            onChange={onCodeChange}
          />
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