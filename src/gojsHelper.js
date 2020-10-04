import * as go from 'gojs'
const $ = go.GraphObject.make
export var myPalette, diagram;

export const setupPaletteDiagram = () => {
  myPalette = $(go.Palette, "myPalette")
      myPalette.nodeTemplate = $(go.Node, "Auto", {
        locationSpot: go.Spot.Center,
        fromSpot: go.Spot.TopCenter,
        toSpot: go.Spot.AllSides
      }, $(go.Shape, {fill: "lightyellow"}),
      $(go.Panel, "Table", {defaultRowSeparatorStroke: "black"},
      // header
      $(go.TextBlock, {
        row: 0, columnSpan: 2, margin: 3, alignment: go.Spot.Center,
        font: "bold 12pt sans-serif",
        isMultiline: false, editable: true
      }, new go.Binding("text", "key").makeTwoWay()),
      // Metamodel
      $(go.Panel, "Horizontal", {name: "Metamodel"},
      new go.Binding("itemArray", "metamodel"),{
        row: 1, column: 1,
      }),
      // properties
      $(go.TextBlock, "Properties", {
        row: 2, font: "italic 10pt sans-serif",
      }, new go.Binding("visible", "visible", (v) => !v).ofObject("PROPERTIES")),
        $(go.Panel, "Vertical", {name: "PROPERTIES"},
          new go.Binding("itemArray", "data", (e) => e.properties.map(r => r.property)), {
            row: 2, margin: 3, stretch: go.GraphObject.Fill,
            defaultAlignment: go.Spot.Left,
          }),
          $("PanelExpanderButton", "PROPERTIES", {
            row: 2, column: 1, alignment: go.Spot.TopRight,
          }, new go.Binding("itemArray", "data.property", ))
    ))

}

export const setupPaletteNodeData = () => {
    myPalette.model.nodeDataArray = [
      {
        metamodel: "concept",
        key: "conceptName",
        relationship: {fromNode:"", toNode:""},
        properties: "// add property"
      },
      {
        metamodel: "asset",
        key: "assetName",
        relationship: {fromNode:"", toNode:""},
        properties: "// add property"
      },
      {
        metamodel: "transaction",
        key: "newTransaction",
        relationship: {fromNode:"", toNode:""},
        properties: "// add property"
      },
      {
        metamodel: "participant",
        key: "newParticipant",
        relationship: {fromNode:"", toNode:""},
        properties: "// add property"
      },
      {
        metamodel: "enum",
        key: "newEnum",
        relationship: {fromNode:"", toNode:""},
        properties: "// add property"
      }
    ]
}

export const setupUMLDiagram = (metamodel) => {
  console.log("setup UML diagram")
  diagram = $(go.Diagram, "myDiagramDiv",{
    "undoManager.isEnabled": true,
    layout: $(go.TreeLayout, {
    })
  })

  diagram.nodeTemplate = $(go.Node, "Auto", {
      locationSpot: go.Spot.Center,
      fromSpot: go.Spot.AllSides,
      toSpot: go.Spot.AllSides
    }, $(go.Shape, {fill: "lightyellow", cursor: "pointer", portId: "",
      fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
      toLinkable: true, toLinkableSelfNode: true, fromLinkableDuplicates: true
    }),
    $(go.Panel, "Table", {defaultRowSeparatorStroke: "black"},
    // header
    $(go.TextBlock, {
      row: 0, columnSpan: 2, margin: 3, alignment: go.Spot.Center,
      font: "bold 12pt sans-serif",
      isMultiline: false, editable: true
    }, new go.Binding("text", "key").makeTwoWay()),
    // Metamodel
    $(go.TextBlock, {editable: true, margin: 2},
    new go.Binding("text", "metamodel").makeTwoWay(),{
      row: 1, alignment: go.Spot.Center, margin: 2
    }),
    // properties
    $(go.TextBlock, "Properties", {
      row: 2, font: "italic 10pt sans-serif", margin: 3, editable: true
    }, new go.Binding("visible", "visible", (v) => !v).ofObject("PROPERTIES")),
      $(go.TextBlock, {name: "PROPERTIES"},
         {
           text: "property",
          row: 2, margin: 3,
          alignment: go.Spot.TopLeft, editable: true
        }, new go.Binding("text", "properties").makeTwoWay()),
        $("PanelExpanderButton", "PROPERTIES", {
          row: 2, column: 1, alignment: go.Spot.TopRight,
        }, new go.Binding("itemArray", "pproperties", ))
  ))

  diagram.linkTemplate =
  $(go.Link, {relinkableFrom: true, relinkableTo: true},
    $(go.Shape,
        new go.Binding("stroke", "black"),
        new go.Binding("strokeWidth", 2)),
        $(go.Shape,{
          toArrow: "OpenTriangle"
        },
        new go.Binding("stroke", "black"),
        new go.Binding("strokeWidth", 2)))

  diagram.model = $(go.GraphLinksModel, {
    copiesArrays: true,
    copiesArrayObjects: true,
    nodeDataArray: metamodel,
    linkDataArray: metamodel
  })
}



