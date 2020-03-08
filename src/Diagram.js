import React from "react"
import * as go from "gojs"
import {ReactDiagram, DiagramWrapper} from "gojs-react"

class Diagram extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			nodeDataArray : [
				{
					key: 1,
					name: "lol",
					properties: [
						{ name: "owner", type: "String", visibility: "public" },
						{ name: "balance", type: "Currency", visibility: "public", default: "0" }
					],
					methods: [
						{ name: "deposit", parameters: [{ name: "amount", type: "Currency" }], visibility: "public" },
						{ name: "withdraw", parameters: [{ name: "amount", type: "Currency" }], visibility: "public" }
					]
				},
				{
					key: 11,
					name: "Person",
					properties: [
						{ name: "name", type: "String", visibility: "public" },
						{ name: "birth", type: "Date", visibility: "protected" }
					],
					methods: [
						{ name: "getCurrentAge", type: "int", visibility: "public" }
					]
				},
				{
					key: 12,
					name: "Student",
					properties: [
						{ name: "classes", type: "List", visibility: "public" }
					],
					methods: [
						{ name: "attend", parameters: [{ name: "class", type: "Course" }], visibility: "private" },
						{ name: "sleep", visibility: "private" }
					]
				},
				{
					key: 13,
					name: "Professor",
					properties: [
						{ name: "classes", type: "List", visibility: "public" }
					],
					methods: [
						{ name: "teach", parameters: [{ name: "class", type: "Course" }], visibility: "private" }
					]
				},
				{
					key: 14,
					name: "Course",
					properties: [
						{ name: "name", type: "String", visibility: "public" },
						{ name: "description", type: "String", visibility: "public" },
						{ name: "professor", type: "Professor", visibility: "public" },
						{ name: "location", type: "String", visibility: "public" },
						{ name: "times", type: "List", visibility: "public" },
						{ name: "prerequisites", type: "List", visibility: "public" },
						{ name: "students", type: "List", visibility: "public" }
					]
				}
			],
			linkDataArray : [
				{ from: 12, to: 11, relationship: "generalization" },
				{ from: 13, to: 11, relationship: "generalization" },
				{ from: 14, to: 13, relationship: "aggregation" }
			],
			modelData : { canRelink: true }
		}
	}
	initDiagram(){
    const $ = go.GraphObject.make;
    const diagram =
    $(go.Diagram,
    {
      "undoManager.isEnabled": true,
      layout: $(go.TreeLayout,
        { // this only lays out in trees nodes connected by "generalization" links
          angle: 90,
          path: go.TreeLayout.PathSource,  // links go from child to parent
          setsPortSpot: false,  // keep Spot.AllSides for link connection spot
          setsChildPortSpot: false,  // keep Spot.AllSides
          // nodes not connected by "generalization" links are laid out horizontally
          arrangement: go.TreeLayout.ArrangementHorizontal
        })
    });
    function convertVisibility(v) {
      switch (v) {
        case "public": return "+";
        case "private": return "-";
        case "protected": return "#";
        case "package": return "~";
        default: return v;
      }
    }
    // define a simple Node template
    diagram.nodeTemplate =
    $(go.Node, "Auto",
    {
      locationSpot: go.Spot.Center,
      fromSpot: go.Spot.AllSides,
      toSpot: go.Spot.AllSides
    },
    $(go.Shape, { fill: "lightyellow", fromLinkable:true, toLinkable:true,cursor:'pointer' }),
    $(go.Panel, "Table",
      { defaultRowSeparatorStroke: "black" },
      // header
      $(go.TextBlock,
        {
          row: 0, columnSpan: 2, margin: 3, alignment: go.Spot.Center,
          font: "bold 12pt sans-serif",
          isMultiline: false, editable: true
        },
        new go.Binding("text", "name").makeTwoWay()),
      // properties
      $(go.TextBlock, "Properties",
        { row: 1, font: "italic 10pt sans-serif" },
        new go.Binding("visible", "visible", function (v) { return !v; }).ofObject("PROPERTIES")),
      $(go.Panel, "Vertical", { name: "PROPERTIES" },
        new go.Binding("itemArray", "properties"),
        {
          row: 1, margin: 3, stretch: go.GraphObject.Fill,
          defaultAlignment: go.Spot.Left, background: "lightyellow",
          itemTemplate: null
        }
      ),
      $("PanelExpanderButton", "PROPERTIES",
        { row: 1, column: 1, alignment: go.Spot.TopRight, visible: false },
        new go.Binding("visible", "properties", function (arr) { return arr.length > 0; })),
      // methods
      $(go.TextBlock, "Methods",
        { row: 2, font: "italic 10pt sans-serif" },
        new go.Binding("visible", "visible", function (v) { return !v; }).ofObject("METHODS")),
      $(go.Panel, "Vertical", { name: "METHODS" },
        new go.Binding("itemArray", "methods"),
        {
          row: 2, margin: 3, stretch: go.GraphObject.Fill,
          defaultAlignment: go.Spot.Left, background: "lightyellow",
          itemTemplate: null
        }
      ),
      $("PanelExpanderButton", "METHODS",
        { row: 2, column: 1, alignment: go.Spot.TopRight, visible: false },
        new go.Binding("visible", "methods", function (arr) { return arr.length > 0; }))
    )
  );
	function convertIsTreeLink(r) {
		return r === "generalization";
	}

	function convertFromArrow(r) {
		switch (r) {
			case "generalization": return "";
			default: return "";
		}
	}

	function convertToArrow(r) {
		switch (r) {
			case "generalization": return "Triangle";
			case "aggregation": return "StretchedDiamond";
			default: return "";
		}
	}
	diagram.linkTemplate = 
	$(go.Link,
		{ routing: go.Link.Orthogonal },
		new go.Binding('relinkableForm','canReLink').ofModel(),
		new go.Binding('relinkableTo','canRelink').ofModel(),
		new go.Binding("isLayoutPositioned", "relationship", convertIsTreeLink),
		$(go.Shape),
		$(go.Shape, { scale: 1.3, fill: "white" },
			new go.Binding("fromArrow", "relationship", convertFromArrow)),
		$(go.Shape, { scale: 1.3, fill: "white" },
			new go.Binding("toArrow", "relationship", convertToArrow))
	)

	diagram.model = 
	$(go.GraphLinksModel,
	{
		linkKeyProperty: 'key',
		copiesArrays: true,
		copiesArrayObjects: true,
		makeUniqueKeyFunction: (m: go.Model, data: any) => {
			let k = data.key || 1;
			while (m.findNodeDataForKey(k)) k++;
			data.key = k;
			return k;
		},
		// negative keys for links
		makeUniqueLinkKeyFunction: (m: go.GraphLinksModel, data: any) => {
			let k = data.key || -1;
			while (m.findLinkDataForKey(k)) k--;
			data.key = k;
			return k;
		}
	});

	return diagram;
  }
  handleModelChange(changes) {
    alert('Go JS model changed !')
  }
	render() {
		return(
			<div>
			 <ReactDiagram
            id='diagram-component'
            ref={this.diagramRef}
            initDiagram={this.initDiagram}
            divClassName='diagram-component'
            nodeDataArray={this.state.nodeDataArray}
            linkDataArray={this.state.linkDataArray}
						onModelChange={this.handleModelChange}
						modelData={this.state.modelData}
            />
			</div>
		)
	}
}

export default Diagram