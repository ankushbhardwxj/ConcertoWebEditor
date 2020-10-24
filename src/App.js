import React, {useEffect, useState} from 'react';
import './App.css';
import CodeEditor from './Editor'
import { Container, Navbar, Row, Col } from 'react-bootstrap'
import Diagram from './Diagram'
import {codeCTO} from './Code'
import NavBar from './NavBar'
import {
  setupPaletteDiagram,
  setupPaletteNodeData,
  setupUMLDiagram,
  diagram, addModelListener
} from './gojsHelper'
import { jsonToCode } from './codegen';
let jsonMode = false;
let jsonActive = false, concertoActive = false;

const App = () => {
  const [model, updateModel] = useState([]);
  const [json, updateJson] = useState(false);

  const setupPalette = () => {
    setupPaletteDiagram()
    setupPaletteNodeData()
  }

  const addModelListener = () => {
    diagram.addModelChangedListener((evt) => {
      generateCode(evt.model.Cc)
    })
  }

  const generateCode = (json) => {
    let code;
    if(jsonMode)
      code = JSON.stringify(json, null, '\t');
    else code = jsonToCode(json);

    if(code !== "" && code !== undefined)
      document.getElementById('coder').innerText = code
  }

  const setupDiagram = () => {
    setupUMLDiagram(model)
    addModelListener()
  }

  const handleClick = (e) => {
    let styleJSON = document.getElementById('button-json').style;
    let styleConcerto = document.getElementById('button-concerto').style;

    if(e == "json") {
      if(!jsonActive){
        styleJSON.backgroundColor = "blue";
        styleJSON.color = "white";
        jsonActive = true;
        jsonMode = true;
      }
      else {
        styleJSON.backgroundColor = "white";
        styleJSON.color = "black";
        jsonActive = false;
        jsonMode = false;
      }
    }
    else {
      if(!concertoActive) {
        styleConcerto.backgroundColor = "blue";
        styleConcerto.color = "white";
        concertoActive = true;
        jsonMode = false;
      } else {
        styleConcerto.backgroundColor = "white";
        styleConcerto.color = "black";
        concertoActive = false;
        jsonMode = true;
      }
    }
  }

  useEffect(()=>{
    console.clear()
    setupPalette()
    setupDiagram()
  })


  return (
    <Container fluid>
      <NavBar />
      <button id="button-json" onClick={() => handleClick("json")}>Show JSON</button>
      <button id="button-concerto" onClick={() => handleClick("concerto")}>Show Concerto</button>
      <Row>
        <Col>
          <div style={{background: '#262624', height: '750px'}}>
            <article style={{padding: '18px'}}>
              <code
                style={{
                  color: 'white', fontFamily: 'Consolas', fontSize: '15px'
                }}
                id="coder">
                  How to use the editor ? <br/> <br/>
                  Simply drag and drop the classes of the provided type from the Tool Palette
                  to the UML diagram area. <br/>
                  The class diagrams are editable and the names, types and properties can be edited
                  once they're on the UML diagram area. <br/>
                  The classes can also be linked to each other to depict relationships. <br/>
                  The code would be simultaneously generated and updated here, however, it is not editable.
              </code>
            </article>
          </div>
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