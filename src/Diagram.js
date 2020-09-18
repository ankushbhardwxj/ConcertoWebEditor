import React, { useEffect } from "react"
import * as go from 'gojs';
import { ReactDiagram, ReactPalette } from 'gojs-react';
import './App.css'

const Diagram = (props) => {
  const initPalette = () => {
    const $ = go.GraphObject.make
    const palette = $(go.Palette)
    palette.nodeTemplate =
    $(go.Node, "Horizontal",
    $(go.Shape,
      {width: 14, height: 14, fill: "white"},
        new go.Binding("fill", "color")),
        $(go.TextBlock, 
         new go.Binding("text", "key")))

    palette.model.nodeDataArray = [
      {key: "asset", color: "yellow"},
      {key: "concept", color: "yellow"},
      {key: "relationship", color: "yellow"}
    ]
    return palette
  }

  const initDiagram = () => {
    const $ = go.GraphObject.make
    const diagram = $(go.Diagram)

    diagram.nodeTemplate =
    $(go.Node, "Auto",  // the Shape automatically fits around the TextBlock
      $(go.Shape, "RoundedRectangle",  // use this kind of figure for the Shape
        // bind Shape.fill to Node.data.color
        new go.Binding("fill", "color")),
      $(go.TextBlock,
        { margin: 3 },  // some room around the text
        // bind TextBlock.text to Node.data.key
        new go.Binding("text", "key"))
    );

      // the Model holds only the essential information describing the diagram
      diagram.model = new go.GraphLinksModel(
      [ // a JavaScript Array of JavaScript objects, one per node;
        // the "color" property is added specifically for this app
        { key: "Alpha", color: "lightblue" },
        { key: "Beta", color: "orange" },
        { key: "Gamma", color: "lightgreen" },
        { key: "Delta", color: "pink" }
      ],
      [ // a JavaScript Array of JavaScript objects, one per link
        { from: "Alpha", to: "Beta" },
        { from: "Alpha", to: "Gamma" },
        { from: "Gamma", to: "Delta" },
        { from: "Delta", to: "Alpha" }
      ]);

      // enable Ctrl-Z to undo and Ctrl-Y to redo
      diagram.undoManager.isEnabled = true;
    return diagram
  }

  useEffect(()=>{
    if (!props.refer.current) return;
    const diagram = props.refer.current.getDiagram();
    if (diagram instanceof go.Diagram) {
      diagram.removeDiagramListener('ChangedSelection', props.handleDiagramEvent);
    }
  })

  return (
    <div>
    <ReactDiagram
      ref={props.refer}
      divClassName="diagram-component"
      initDiagram={initDiagram}
      nodeDataArray={props.nodeData}
      linkDataArray={props.linkData}
      modelData={props.modelData}
      skipsDiagramUpdate={props.skipsDiagramUpdate}
      onModelChange={props.handleModelChange} 
      onDiagramEvent={props.handleDiagramEvent}
    ></ReactDiagram>
    <ReactPalette
      initPalette={initPalette}
      ></ReactPalette>
    </div>
  )
}

export default Diagram
/*
class Diagram extends React.Component {
  initDiagram() {
    const $ = go.GraphObject.make
    const diagram = $(go.Diagram)
    diagram.nodeTemplate =
    $(go.Node, "Auto",  // the Shape automatically fits around the TextBlock
      $(go.Shape, "RoundedRectangle",  // use this kind of figure for the Shape
        // bind Shape.fill to Node.data.color
        new go.Binding("fill", "color")),
      $(go.TextBlock,
        { margin: 3 },  // some room around the text
        // bind TextBlock.text to Node.data.key
        new go.Binding("text", "key"))
    );

      // the Model holds only the essential information describing the diagram
      diagram.model = new go.GraphLinksModel(
      [ // a JavaScript Array of JavaScript objects, one per node;
        // the "color" property is added specifically for this app
        { key: "Alpha", color: "lightblue" },
        { key: "Beta", color: "orange" },
        { key: "Gamma", color: "lightgreen" },
        { key: "Delta", color: "pink" }
      ],
      [ // a JavaScript Array of JavaScript objects, one per link
        { from: "Alpha", to: "Beta" },
        { from: "Alpha", to: "Gamma" },
        { from: "Beta", to: "Beta" },
        { from: "Gamma", to: "Delta" },
        { from: "Delta", to: "Alpha" }
      ]);

      // enable Ctrl-Z to undo and Ctrl-Y to redo
      diagram.undoManager.isEnabled = true;
    return diagram;
  }
  componentDidMount() {
    if (!this.props.refer.current) return;
    const diagram = this.props.refer.current.getDiagram();
    if (diagram instanceof go.Diagram) {
      diagram.addDiagramListener('ChangedSelection', this.props.handleDiagramEvent);
    }
  }
  componentWillUnmount() {
    if (!this.props.refer.current) return;
    const diagram = this.props.refer.current.getDiagram();
    if (diagram instanceof go.Diagram) {
      diagram.removeDiagramListener('ChangedSelection', this.props.handleDiagramEvent);
    }
  }
  render() {
    return(
      <ReactDiagram
        ref={this.props.refer}
        divClassName="diagram-component"
        initDiagram={this.initDiagram}
        nodeDataArray={this.props.nodeData}
        linkDataArray={this.props.linkData}
        modelData={this.props.modelData}
        skipsDiagramUpdate={this.props.skipsDiagramUpdate}
        onModelChange={this.props.handleModelChange} 
        onDiagramEvent={this.props.handleDiagramEvent}
      />
    )
  }
}
*/

