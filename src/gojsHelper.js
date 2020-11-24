import * as go from 'gojs'
const $ = go.GraphObject.make
export var myPalette, diagram;

export const setupPaletteDiagram = () => {
  myPalette = $(go.Palette, "myPalette")
  myPalette.nodeTemplate = $(go.Node, "Auto", {
  }, $(go.Shape, { fill: "lightyellow" }),
    $(go.Panel, "Table", { defaultRowSeparatorStroke: "black" },
      // header
      $(go.TextBlock, {
        row: 0, columnSpan: 2, margin: 3, alignment: go.Spot.Center,
        font: "bold 12pt sans-serif",
        isMultiline: false, editable: true
      }, new go.Binding("text", "key").makeTwoWay()),
      // Metamodel
      $(go.Panel, "Horizontal", { name: "Metamodel" },
        new go.Binding("itemArray", "metamodel"), {
        row: 1, column: 1,
      }),
      // properties
      $(go.TextBlock, "Properties", {
        row: 2, font: "italic 10pt sans-serif",
      }, new go.Binding("visible", "visible", (v) => !v).ofObject("PROPERTIES")),
      $(go.Panel, "Vertical", { name: "PROPERTIES" },
        new go.Binding("itemArray", "data", (e) => e.properties.map(r => r.property)), {
        row: 2, margin: 3, stretch: go.GraphObject.Fill,
        defaultAlignment: go.Spot.Left,
      }),
      $("PanelExpanderButton", "PROPERTIES", {
        row: 2, column: 1, alignment: go.Spot.TopRight,
      }, new go.Binding("itemArray", "data.property",))
    ))

}

export const setupPaletteNodeData = () => {
  myPalette.model.nodeDataArray = [
    {
      metamodel: "concept",
      key: "conceptName",
      toNode: null,
      properties: "// add property"
    },
    {
      metamodel: "asset",
      key: "assetName",
      toNode: null,
      properties: "// add property"
    },
    {
      metamodel: "transaction",
      key: "newTransaction",
      toNode: null,
      properties: "// add property"
    },
    {
      metamodel: "participant",
      key: "newParticipant",
      toNode: null,
      properties: "// add property"
    },
    {
      metamodel: "enum",
      key: "newEnum",
      toNode: null,
      properties: "// add property"
    }
  ]
}

export const setupUMLDiagram = (metamodel) => {
  console.log("setup UML diagram")
  diagram = $(go.Diagram, "myDiagramDiv", {
    "undoManager.isEnabled": true,
    layout: $(go.TreeLayout, {
    })
  })

  diagram.nodeTemplate = $(go.Node, "Auto", {
    locationSpot: go.Spot.Center,
    fromSpot: go.Spot.AllSides,
    toSpot: go.Spot.AllSides
  }, $(go.Shape, {
    fill: "lightyellow", cursor: "pointer", portId: "",
    fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
    toLinkable: true, toLinkableSelfNode: true, fromLinkableDuplicates: true
  }),
    $(go.Panel, "Table", { defaultRowSeparatorStroke: "black" },
      // header
      $(go.TextBlock, {
        row: 0, columnSpan: 2, margin: 3, alignment: go.Spot.Center,
        font: "bold 12pt sans-serif",
        isMultiline: false, editable: true
      }, new go.Binding("text", "key").makeTwoWay()),
      // Metamodel
      $(go.TextBlock, { editable: true, margin: 2 },
        new go.Binding("text", "metamodel").makeTwoWay(), {
        row: 1, alignment: go.Spot.Center, margin: 2
      }),
      // properties
      $(go.TextBlock, "Properties", {
        row: 2, font: "italic 10pt sans-serif", margin: 3, editable: true
      }, new go.Binding("visible", "visible", (v) => !v).ofObject("PROPERTIES")),
      $(go.TextBlock, { name: "PROPERTIES" },
        {
          text: "property",
          row: 2, margin: 3,
          alignment: go.Spot.TopLeft, editable: true
        }, new go.Binding("text", "properties").makeTwoWay()),
      $("PanelExpanderButton", "PROPERTIES", {
        row: 2, column: 1, alignment: go.Spot.TopRight,
      }, new go.Binding("itemArray", "pproperties",))
    ))

  diagram.linkTemplate =
    $(go.Link, { relinkableFrom: true, relinkableTo: true },
      $(go.Shape,
        new go.Binding("stroke", "black"),
        new go.Binding("strokeWidth", 2)),
      $(go.Shape, {
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

export const updateGoJS = (nodeData, linkData) => {
  diagram.model = $(go.GraphLinksModel, {
    copiesArrays: true,
    copiesArrayObjects: true,
    nodeDataArray: nodeData,
    linkDataArray: linkData
  })
}

export const setupFlowChartDiagram = (model) => {
  function showLinkLabel(e) {
    var label = e.subject.findObject("LABEL");
    if (label !== null) label.visible = (e.subject.fromNode.data.category === "Conditional");
  }

  diagram = $(go.Diagram, "myDiagramDiv", {
    "LinkDrawn": showLinkLabel,
    "LinkRelinked": showLinkLabel,
    "undoManager.isEnabled": true
  })

  function nodeStyle() {
    return [
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      { locationSpot: go.Spot.Center }
    ]
  }

  function makePort(name, align, spot, output, input) {
    var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
    return $(go.Shape,
      {
        fill: "transparent",
        strokeWidth: 0,
        width: horizontal ? NaN : 8,
        height: !horizontal ? NaN : 8,
        alignment: align,
        stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
        portId: name,
        fromSpot: spot,
        fromLinkable: output,
        toSpot: spot,
        toLinkable: input,
        cursor: "pointer",
        mouseEnter: function (e, port) {
          if (!e.diagram.isReadOnly) port.fill = "rgba(255,0,255,0.5)";
        },
        mouseLeave: function (e, port) {
          port.fill = "transparent";
        }
      });
  }

  function textStyle() {
    return {
      font: "bold 11pt Lato, Helvetica, Arial, sans-serif",
      stroke: "#F8F8F8"
    }
  }

  diagram.nodeTemplateMap.add("",
    $(go.Node, "Table", nodeStyle(),
      $(go.Panel, "Auto",
        $(go.Shape, "Rectangle",
          { fill: "#282c34", stroke: "#00A9C9", strokeWidth: 3.5 },
          new go.Binding("figure", "figure")),
        $(go.TextBlock, textStyle(), {
          margin: 8,
          maxSize: new go.Size(160, NaN),
          wrap: go.TextBlock.WrapFit,
          editable: true
        },
          new go.Binding("text").makeTwoWay())
      ),
      makePort("T", go.Spot.Top, go.Spot.TopSide, false, true),
      makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
      makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
      makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, false)
    ))

  diagram.nodeTemplateMap.add("Conditional",
    $(go.Node, "Table", nodeStyle(),
      // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
      $(go.Panel, "Auto",
        $(go.Shape, "Diamond",
          { fill: "#282c34", stroke: "#00A9C9", strokeWidth: 3.5 },
          new go.Binding("figure", "figure")),
        $(go.TextBlock, textStyle(),
          {
            margin: 8,
            maxSize: new go.Size(160, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: true
          },
          new go.Binding("text").makeTwoWay())
      ),
      // four named ports, one on each side:
      makePort("T", go.Spot.Top, go.Spot.Top, false, true),
      makePort("L", go.Spot.Left, go.Spot.Left, true, true),
      makePort("R", go.Spot.Right, go.Spot.Right, true, true),
      makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
    ));

  diagram.nodeTemplateMap.add("Start",
    $(go.Node, "Table", nodeStyle(),
      $(go.Panel, "Spot",
        $(go.Shape, "Circle",
          { desiredSize: new go.Size(70, 70), fill: "#282c34", stroke: "#09d3ac", strokeWidth: 3.5 }),
        $(go.TextBlock, "Start", textStyle(),
          new go.Binding("text"))
      ),
      makePort("L", go.Spot.Left, go.Spot.Left, true, false),
      makePort("R", go.Spot.Right, go.Spot.Right, true, false),
      makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
    ));

  diagram.nodeTemplateMap.add("End",
    $(go.Node, "Table", nodeStyle(),
      $(go.Panel, "Spot",
        $(go.Shape, "Circle",
          { desiredSize: new go.Size(60, 60), fill: "#282c34", stroke: "#DC3C00", strokeWidth: 3.5 }),
        $(go.TextBlock, "End", textStyle(),
          new go.Binding("text"))
      ),
      makePort("T", go.Spot.Top, go.Spot.Top, false, true),
      makePort("L", go.Spot.Left, go.Spot.Left, false, true),
      makePort("R", go.Spot.Right, go.Spot.Right, false, true)
    ));

  go.Shape.defineFigureGenerator("File", function (shape, w, h) {
    var geo = new go.Geometry();
    var fig = new go.PathFigure(0, 0, true); // starting point
    geo.add(fig);
    fig.add(new go.PathSegment(go.PathSegment.Line, .75 * w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, .25 * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
    var fig2 = new go.PathFigure(.75 * w, 0, false);
    geo.add(fig2);
    fig2.add(new go.PathSegment(go.PathSegment.Line, .75 * w, .25 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, w, .25 * h));
    geo.spot1 = new go.Spot(0, .25);
    geo.spot2 = go.Spot.BottomRight;
    return geo;
  });

  diagram.nodeTemplateMap.add("Comment",
    $(go.Node, "Auto", nodeStyle(),
      $(go.Shape, "File",
        { fill: "#282c34", stroke: "#DEE0A3", strokeWidth: 3 }),
      $(go.TextBlock, textStyle(),
        {
          margin: 8,
          maxSize: new go.Size(200, NaN),
          wrap: go.TextBlock.WrapFit,
          textAlign: "center",
          editable: true
        },
        new go.Binding("text").makeTwoWay())
    ));

  diagram.linkTemplate =
    $(go.Link,  // the whole link panel
      {
        routing: go.Link.AvoidsNodes,
        curve: go.Link.JumpOver,
        corner: 5, toShortLength: 4,
        relinkableFrom: true,
        relinkableTo: true,
        reshapable: true,
        resegmentable: true,
        // mouse-overs subtly highlight links:
        mouseEnter: function (e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; },
        mouseLeave: function (e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; },
        selectionAdorned: false
      },
      new go.Binding("points").makeTwoWay(),
      $(go.Shape,  // the highlight shape, normally transparent
        { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" }),
      $(go.Shape,  // the link path shape
        { isPanelMain: true, stroke: "gray", strokeWidth: 2 },
        new go.Binding("stroke", "isSelected", function (sel) { return sel ? "dodgerblue" : "gray"; }).ofObject()),
      $(go.Shape,  // the arrowhead
        { toArrow: "standard", strokeWidth: 0, fill: "gray" }),
      $(go.Panel, "Auto",  // the link label, normally not visible
        { visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5 },
        new go.Binding("visible", "visible").makeTwoWay(),
        $(go.Shape, "RoundedRectangle",  // the label shape
          { fill: "#F8F8F8", strokeWidth: 0 }),
        $(go.TextBlock, "Yes",  // the label
          {
            textAlign: "center",
            font: "10pt helvetica, arial, sans-serif",
            stroke: "#333333",
            editable: true
          },
          new go.Binding("text").makeTwoWay())
      )
    );

  diagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
  diagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

  diagram.model = $(go.GraphLinksModel, {
    linkFromPortIdProperty: "fromPort",
    linkToPortIdProperty: "toPort",
    nodeDataArray: [
      { "category": "Comment", "loc": "360 -10", "text": "Kookie Brittle", "key": -13 },
      { "key": -1, "category": "Start", "loc": "175 0", "text": "Start" },
      { "key": 0, "loc": "-5 75", "text": "Preheat oven to 375 F" },
      { "key": 1, "loc": "175 100", "text": "In a bowl, blend: 1 cup margarine, 1.5 teaspoon vanilla, 1 teaspoon salt" },
      { "key": 2, "category": "Conditional", "text": "max > sum" }
    ],
    linkDataArray: [
      { "from": 1, "to": 2, "fromPort": "B", "toPort": "T" },
      { "from": 2, "to": 3, "fromPort": "B", "toPort": "T" },
      { "from": -1, "to": 0, "fromPort": "B", "toPort": "T" },
      { "from": -1, "to": 1, "fromPort": "B", "toPort": "T" },
    ],
  })
}

export const setupFlowChartPalette = () => {
  console.log("palette")
}