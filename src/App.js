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
let c = ""

const App = () => {
  const [model, updateModel] = useState([])

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
    let str = ''
    console.log("Nodes")
    let n = json.length
    if(n > 0) {
      if(json[n-1].from !== undefined || json[n-1].to !== undefined) {
        console.log("Link node")
        let to = json[n-1].to
        let from = json[n-1].from
        // search for to node, and place value of from in its relationship.from
        // fix bug here
        for(let i=0;i<n;i++){
          if(json[i].key === to) {
            json[i].relationship.fromNode = from;
            break;
          }
        }
      }
    }
    console.log(json)
      json.map(r => {
        if(r.metamodel !== undefined && r.key !== undefined){
          str += r.metamodel + " " + r.key;
          if(r.relationship.fromNode !== r.key && r.relationship.fromNode !== ""){
            str += " extends " + r.relationship.fromNode
          }
          str += " { \n"
          str += r.properties + "\n"
          str += "}\n\n"
        }
      })
      //console.clear()
      //console.log(json)
      //console.log(str)
      if(str !== "")
      document.getElementById('coder').innerText = str

  }

  const setupDiagram = () => {
    setupUMLDiagram(model)
    addModelListener()
  }

  useEffect(()=>{
    console.clear()
    console.log("setup diagrams")
    setupPalette()
    setupDiagram()
  })

  return (
    <Container fluid>
      <NavBar />
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