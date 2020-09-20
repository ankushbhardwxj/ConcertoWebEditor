import React, {useEffect, useState} from 'react';
import './App.css';
import CodeEditor from './Editor'
import { parse } from './model'
import { codeCTO } from './Code';
import { Container, Navbar, Row, Col } from 'react-bootstrap'
import * as go from 'gojs'
var metamodel = []
var links = []
var diagram;
const $ = go.GraphObject.make

const App = () => {
  const [code, setCode] = useState(codeCTO)

  const parseCode = (newCode) => {
    metamodel = parse(newCode)
    links = []
    metamodel.map(r => {
      if(r.relationship !== undefined)
      links.push(r.relationship)
    })
    console.log(links)
  }

  const showNewCode = (metadata) => {
    metadata.map(data => {
      console.log(data.line)
      if(data.data !== undefined){
        if(data.metamodel !== "comment")
          data.data.properties.map(x => console.log("  " + x.property))
        console.log("}")
      }
    })
  }

  const setupDiagram = () => {
    diagram = $(go.Diagram, "myDiagramDiv",{
      "undoManager.isEnabled": true,
      layout: $(go.TreeLayout, {
        angle: 90,
        path: go.TreeLayout.PathSource,
        setsPortSpot: false,
        setsChildPortSpot: false,
        arrangement: go.TreeLayout.ArrangementHorizontal
      })
    })

    diagram.nodeTemplate = $(go.Node, "Auto", {
        locationSpot: go.Spot.Center,
        fromSpot: go.Spot.AllSides,
        toSpot: go.Spot.AllSides
      }, $(go.Shape, {fill: "lightyellow"}),
      $(go.Panel, "Table", {defaultRowSeparatorStroke: "black"},
      // header
      $(go.TextBlock, {
        row: 0, columnSpan: 2, margin: 3, alignment: go.Spot.Center,
        font: "bold 12pt sans-serif",
        isMultiline: false, editable: true
      }, new go.Binding("text", "metamodelName").makeTwoWay()),
      // properties
      $(go.TextBlock, "Properties", {
        row: 1, font: "italic 10pt sans-serif",
      }, new go.Binding("visible", "visible", (v) => !v).ofObject("PROPERTIES")),
        $(go.Panel, "Vertical", {name: "PROPERTIES"},
          new go.Binding("itemArray", "data", (e) => e.properties.map(r => r.property)), {
            row: 1, margin: 3, stretch: go.GraphObject.Fill,
            defaultAlignment: go.Spot.Left,
          }),
          $("PanelExpanderButton", "PROPERTIES", {
            row: 1, column: 1, alignment: go.Spot.TopRight,
          }, new go.Binding("itemArray", "data.property", ))
    ))

    diagram.linkTemplate =
    $(go.Link,
      $(go.Shape,
          new go.Binding("stroke", "black"),
          new go.Binding("strokeWidth", 2)),
          $(go.Shape,{
            toArrow: "OpenTriangle"
          },
          new go.Binding("stroke", "black"),
          new go.Binding("strokeWidth", 2)))

    diagram.addModelChangedListener((evt) => {
      if(evt.modelChange == "nodeDataArray"){
        console.log(diagram.model.nodeDataArray)
      }
    })

    diagram.model = $(go.GraphLinksModel, {
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: metamodel,
      linkDataArray: links
    })
  }

  const setupPalette = () => {
    var myPalette = $(go.Palette, "myPalette")
    myPalette.nodeTemplate = $(go.Node, "Horizontal",
    $(go.Shape, {width: 14, height: 14, fill: "white"},
      new go.Binding("fill", "color")),
    $(go.TextBlock, {editable: true, background: "lightblue"},
      new go.Binding("text", "color")))

    myPalette.model.nodeDataArray = [
      {key: "Tool", color: "turquoise"},
      {key: "Cyan", color: "cyan"},
      {key: "Cyan", color: "cyan"},
    ]
  }

  const handleChange = (newCode) => {
    console.clear()
    parseCode(newCode)
    console.log(newCode)
    diagram.model = $(go.GraphLinksModel, {
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: metamodel,
      linkDataArray: links
    })
  }

  // on first load of the component
  useEffect(() => {
    console.clear()
    parseCode(code)
    setupDiagram(metamodel)
    setupPalette()
  })

  return (
    <Container fluid>
      <Navbar bg="dark" variant="dark">
        <p style={{color: "white"}}>Concerto Schema Language to UML converter</p>
      </Navbar>
      <Row>
        <Col>
          <CodeEditor
            code = {code}
            onChange = {handleChange}
          />
        </Col>
        <Col>
        <table>
          <tbody>
            <tr>
              <td>
                <div
                id="myPalette" style={{border: 'solid 1px blue',
                width:'200px', height:'750px'}}>
                </div>
              </td>
              <td>
                <div
                id="myDiagramDiv"
                style={{border: 'solid 1px blue',
                width:'600px', height:'750px'}}></div>
              </td>
            </tr>
            <tr>
              <td style={{textAlign:"center"}}><b>Tool Palette</b></td>
              <td style={{textAlign:"center"}}><b>UML Diagram</b></td>
            </tr>
          </tbody>
        </table>
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