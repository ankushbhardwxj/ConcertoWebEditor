import React from "react"
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import GuidedDraggingTool  from './GuidedDraggingTool';
import {generateModelFromCode} from './model'
import './App.css'

class Diagram extends React.Component {
  initDiagram() {
    const $ = go.GraphObject.make
    const diagram = $(go.Diagram, {
      'undoManager.isEnabled': true,
      'clickCreatingTool.archetypeNodeData' : {
        text: 'new node', color: 'lightyellow'
      },
      layout: $(go.TreeLayout,{
        angle: 90,
        path: go.TreeLayout.PathSource,  // links go from child to parent
        setsPortSpot: false,  // keep Spot.AllSides for link connection spot
        setsChildPortSpot: false,  // keep Spot.AllSides
        // nodes not connected by "generalization" links are laid out horizontally
        arrangement: go.TreeLayout.ArrangementHorizontal
      }),
      model: $(go.GraphLinksModel,{
        linkKeyProperty: 'key'
      })
    })
    
    diagram.nodeTemplate =
      $(go.Node, 'Auto',  // the Shape will go around the TextBlock
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'RoundedRectangle',
          {
            name: 'SHAPE', fill: 'lightyellow', strokeWidth: 0,
            // set the port properties:
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer'
          },
          // Shape.fill is bound to Node.data.color
          new go.Binding('fill', 'lightyellow')),
        $(go.Panel, 'Table', {defaultRowSeparatorStroke:'black'},
         //header
         $(go.TextBlock, 
          { margin: 8, editable: true, font: '400 .875rem Roboto, sans-serif' },  // some room around the text
            new go.Binding('text','key').makeTwoWay()
          ),
          //props
          $(go.TextBlock, "Properties",
                  { row: 1, font: "italic 10pt sans-serif" },
                  new go.Binding("visible", "visible", function (v) { return !v; }).ofObject("PROPERTIES")),
                $(go.Panel, "Vertical", { name: "PROPERTIES" },
                  new go.Binding("itemArray", "properties").makeTwoWay(),
                  {
                    row: 1, margin: 3, defaultAlignment: go.Spot.TopRight, visible: false
                  }
                ),
                $("PanelExpanderButton", "PROPERTIES",
                  { row: 1, margin: 3,column: 1, defaultAlignment: go.Spot.TopRight, visible: false},
                  new go.Binding("visible", "properties", function (arr) {
                    return arr.length > 0; })),
             ))

    // relinking depends on modelData
    diagram.linkTemplate =
      $(go.Link,
        new go.Binding('relinkableFrom', 'canRelink').ofModel(),
        new go.Binding('relinkableTo', 'canRelink').ofModel(),
        $(go.Shape),
        $(go.Shape, { toArrow: 'Standard' })
      );

    return diagram;
  }
  handleModelChange() {
    console.log("Handle this model")
  }
  render() {
    return(
      <ReactDiagram
        divClassName="diagram-component"
        initDiagram={this.initDiagram}
        nodeDataArray={this.props.nodeData}
        linkDataArray={this.props.linkData}
        onModelChange={this.handleModelChange} 
      />
    )
  }
}

export default Diagram
