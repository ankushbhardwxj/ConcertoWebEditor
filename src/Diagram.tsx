import React from "react"
// import * as go from "gojs"
// import {produce} from "immer"
// import {ReactDiagram} from "gojs-react"
// import  GuidedDraggingTool  from "./GuidedDraggingTool"
// interface AppState {
//   nodeDataArray: Array<go.ObjectData>;
//   linkDataArray: Array<go.ObjectData>;
//   modelData: go.ObjectData;
//   selectedData: go.ObjectData | null;
//   skipsDiagramUpdate: boolean;
// }

class Diagram extends React.Component {
// 	private mapNodeKeyIdx: Map<go.Key, number>;
//   private mapLinkKeyIdx: Map<go.Key, number>;
// 	private diagramRef: React.RefObject<ReactDiagram>
// 	constructor(props: AppState){
// 		super(props);
// 		this.diagramRef = React.createRef();
// 		this.state = {
// 			nodeDataArray : [
// 				{
// 					key: 1,
// 					name: "lol",
// 					properties: [
// 						{ name: "owner", type: "String", visibility: "public" },
// 						{ name: "balance", type: "Currency", visibility: "public", default: "0" }
// 					],
// 					methods: [
// 						{ name: "deposit", parameters: [{ name: "amount", type: "Currency" }], visibility: "public" },
// 						{ name: "withdraw", parameters: [{ name: "amount", type: "Currency" }], visibility: "public" }
// 					]
// 				},
// 				{
// 					key: 11,
// 					name: "Person",
// 					properties: [
// 						{ name: "name", type: "String", visibility: "public" },
// 						{ name: "birth", type: "Date", visibility: "protected" }
// 					],
// 					methods: [
// 						{ name: "getCurrentAge", type: "int", visibility: "public" }
// 					]
// 				},
// 				{
// 					key: 12,
// 					name: "Student",
// 					properties: [
// 						{ name: "classes", type: "List", visibility: "public" }
// 					],
// 					methods: [
// 						{ name: "attend", parameters: [{ name: "class", type: "Course" }], visibility: "private" },
// 						{ name: "sleep", visibility: "private" }
// 					]
// 				},
// 				{
// 					key: 13,
// 					name: "Professor",
// 					properties: [
// 						{ name: "classes", type: "List", visibility: "public" }
// 					],
// 					methods: [
// 						{ name: "teach", parameters: [{ name: "class", type: "Course" }], visibility: "private" }
// 					]
// 				},
// 				{
// 					key: 14,
// 					name: "Course",
// 					properties: [
// 						{ name: "name", type: "String", visibility: "public" },
// 						{ name: "description", type: "String", visibility: "public" },
// 						{ name: "professor", type: "Professor", visibility: "public" },
// 						{ name: "location", type: "String", visibility: "public" },
// 						{ name: "times", type: "List", visibility: "public" },
// 						{ name: "prerequisites", type: "List", visibility: "public" },
// 						{ name: "students", type: "List", visibility: "public" }
// 					]
// 				}
// 			],
// 			linkDataArray : [
// 				{ key: -1, from: 12, to: 11, relationship: "generalization" },
// 				{ key: -2, from: 13, to: 11, relationship: "generalization" },
// 				{ key: -3, from: 14, to: 13, relationship: "aggregation" }
// 			],
// 			modelData : { canRelink: true }
// 		}
// 		//init maps
// 	  this.mapNodeKeyIdx = new Map<go.Key, number>();
//     this.mapLinkKeyIdx = new Map<go.Key, number>();
//     this.refreshNodeIndex(this.state.nodeDataArray);
//     this.refreshLinkIndex(this.state.linkDataArray);
//     // bind handler methods
//     this.handleDiagramEvent = this.handleDiagramEvent.bind(this);
//     this.handleModelChanges = this.handleModelChanges.bind(this);
//     this.handleRelinkChange = this.handleRelinkChange.bind(this);
// 	}

// 	private refreshNodeIndex(nodeArr: Array<go.ObjectData>) {
//     this.mapNodeKeyIdx.clear();
//     nodeArr.forEach((n: go.ObjectData, idx: number) => {
// 			console.log(n.key)
// 			this.mapNodeKeyIdx.set(n.key, idx);
//     });
//   }
	
// 	private refreshLinkIndex(linkArr: Array<go.ObjectData>) {
//     this.mapLinkKeyIdx.clear();
//     linkArr.forEach((l: go.ObjectData, idx: number) => {
// 			console.log(l.key)
//       this.mapLinkKeyIdx.set(l.key, idx);
//     });
// 	}
// 	public handleDiagramEvent(e: go.DiagramEvent) {
//     const name = e.name;
//     switch (name) {
//       case 'ChangedSelection': {
//         const sel = e.subject.first();
//         this.setState(
//           produce((draft: AppState) => {
//             if (sel) {
//               if (sel instanceof go.Node) {
//                 const idx = this.mapNodeKeyIdx.get(sel.key);
//                 if (idx !== undefined && idx >= 0) {
//                   const nd = draft.nodeDataArray[idx];
//                   draft.selectedData = nd;
//                 }
//               } else if (sel instanceof go.Link) {
//                 const idx = this.mapLinkKeyIdx.get(sel.key);
//                 if (idx !== undefined && idx >= 0) {
//                   const ld = draft.linkDataArray[idx];
//                   draft.selectedData = ld;
//                 }
//               }
//             } else {
//               draft.selectedData = null;
//             }
//           })
//         );
//         break;
//       }
//       default: break;
//     }
//   }
// 	public componentDidMount() {
// 		console.log(JSON.stringify(this.state.nodeDataArray))
// 		if (!this.diagramRef.current) return;
// 		const diagram = this.diagramRef.current.getDiagram();
// 		if(diagram instanceof go.Diagram) {
// 			diagram.addDiagramListener('ChangedSelection', this.handleDiagramEvent);
// 		}
// 	}

// 	public componentWillUnmount() {
// 		if (!this.diagramRef.current) return;
// 		const diagram = this.diagramRef.current.getDiagram();
// 		if(diagram instanceof go.Diagram) {
// 			diagram.addDiagramListener('ChangedSelection', this.handleDiagramEvent);
// 		}
// 	}
// 	public handleModelChanges(obj: go.IncrementalData) {
// 		const insertedNodeKeys = obj.insertedNodeKeys
// 		const modifiedNodeData = obj.modifiedNodeData;
//     const removedNodeKeys = obj.removedNodeKeys;
//     const insertedLinkKeys = obj.insertedLinkKeys;
//     const modifiedLinkData = obj.modifiedLinkData;
//     const removedLinkKeys = obj.removedLinkKeys;
//     const modifiedModelData = obj.modelData;
// 		const modifiedNodeMap = new Map<go.Key, go.ObjectData>();
// 		const modifiedLinkMap = new Map<go.Key, go.ObjectData>();
// 		this.setState(
// 			produce((draft: AppState) => {
//         let narr = draft.nodeDataArray;
//         if (modifiedNodeData) {
//           modifiedNodeData.forEach((nd: go.ObjectData) => {
//             modifiedNodeMap.set(nd.key, nd);
//             const idx = this.mapNodeKeyIdx.get(nd.key);
//             if (idx !== undefined && idx >= 0) {
//               narr[idx] = nd;
//               if (draft.selectedData && draft.selectedData.key === nd.key) {
//                 draft.selectedData = nd;
//               }
//             }
//           });
//         }
//         if (insertedNodeKeys) {
//           insertedNodeKeys.forEach((key: go.Key) => {
//             const nd = modifiedNodeMap.get(key);
//             const idx = this.mapNodeKeyIdx.get(key);
//             if (nd && idx === undefined) {
//               this.mapNodeKeyIdx.set(nd.key, narr.length);
//               narr.push(nd);
//             }
//           });
//         }
//         if (removedNodeKeys) {
//           narr = narr.filter((nd: go.ObjectData) => {
//             if (removedNodeKeys.includes(nd.key)) {
//               return false;
//             }
//             return true;
//           });
//           draft.nodeDataArray = narr;
//           this.refreshNodeIndex(narr);
//         }

//         let larr = draft.linkDataArray;
//         if (modifiedLinkData) {
//           modifiedLinkData.forEach((ld: go.ObjectData) => {
//             modifiedLinkMap.set(ld.key, ld);
//             const idx = this.mapLinkKeyIdx.get(ld.key);
//             if (idx !== undefined && idx >= 0) {
//               larr[idx] = ld;
//               if (draft.selectedData && draft.selectedData.key === ld.key) {
//                 draft.selectedData = ld;
//               }
//             }
//           });
//         }
//         if (insertedLinkKeys) {
//           insertedLinkKeys.forEach((key: go.Key) => {
//             const ld = modifiedLinkMap.get(key);
//             const idx = this.mapLinkKeyIdx.get(key);
//             if (ld && idx === undefined) {
//               this.mapLinkKeyIdx.set(ld.key, larr.length);
//               larr.push(ld);
//             }
//           });
//         }
//         if (removedLinkKeys) {
//           larr = larr.filter((ld: go.ObjectData) => {
//             if (removedLinkKeys.includes(ld.key)) {
//               return false;
//             }
//             return true;
//           });
//           draft.linkDataArray = larr;
//           this.refreshLinkIndex(larr);
//         }
//         // handle model data changes, for now just replacing with the supplied object
//         if (modifiedModelData) {
//           draft.modelData = modifiedModelData;
//         }
//         draft.skipsDiagramUpdate = true;  // the GoJS model already knows about these updates
//       })
//     );
//   }
// 	handleRelinkChange(e) {
// 		const target = e.target
// 		const value = target.checked
// 		this.setState({modelData: {canRelink: value}})
// 	}
// 	initDiagram(){
//     const $ = go.GraphObject.make;
//     const diagram =
//     $(go.Diagram,
//     {
// 			"undoManager.isEnabled": true, 'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
// 			draggingTool: new GuidedDraggingTool(), 
// 			'draggingTool.horizontalGuidelineColor': 'blue',
// 			'draggingTool.verticalGuidelineColor': 'blue',
// 			'draggingTool.centerGuidelineColor': 'green',
// 			'draggingTool.guidelineWidth': 1,
// 			model: $(go.GraphLinksModel,
// 				{
// 					linkKeyProperty: 'key',  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
// 					// positive keys for nodes
// 					makeUniqueKeyFunction: (m: go.Model, data: any) => {
// 						let k = data.key || 1;
// 						while (m.findNodeDataForKey(k)) k++;
// 						data.key = k;
// 						return k;
// 					},
// 					// negative keys for links
// 					makeUniqueLinkKeyFunction: (m: go.GraphLinksModel, data: any) => {
// 						let k = data.key || -1;
// 						while (m.findLinkDataForKey(k)) k--;
// 						data.key = k;
// 						return k;
// 					}
// 				})
// 		,
//       layout: $(go.TreeLayout,
//         { // this only lays out in trees nodes connected by "generalization" links
//           angle: 90,
//           path: go.TreeLayout.PathSource,  // links go from child to parent
//           setsPortSpot: false,  // keep Spot.AllSides for link connection spot
//           setsChildPortSpot: false,  // keep Spot.AllSides
//           // nodes not connected by "generalization" links are laid out horizontally
//           arrangement: go.TreeLayout.ArrangementHorizontal
//         })
//     });
//     function convertVisibility(v) {
//       switch (v) {
//         case "public": return "+";
//         case "private": return "-";
//         case "protected": return "#";
//         case "package": return "~";
//         default: return v;
//       }
//     }
//     // define a simple Node template
//     diagram.nodeTemplate =
//     $(go.Node, "Auto",
//     {
//       locationSpot: go.Spot.Center,
//       fromSpot: go.Spot.AllSides,
//       toSpot: go.Spot.AllSides
//     },
//     $(go.Shape, { fill: "lightyellow", fromLinkable:true, toLinkable:true,cursor:'pointer' }),
//     $(go.Panel, "Table",
//       { defaultRowSeparatorStroke: "black" },
//       // header
//       $(go.TextBlock,
//         {
//           row: 0, columnSpan: 2, margin: 3, alignment: go.Spot.Center,
//           font: "bold 12pt sans-serif",
//           isMultiline: false, editable: true
//         },
//         new go.Binding("text", "name").makeTwoWay()),
//       // properties
//       $(go.TextBlock, "Properties",
//         { row: 1, font: "italic 10pt sans-serif" },
//         new go.Binding("visible", "visible", function (v) { return !v; }).ofObject("PROPERTIES")),
//       $(go.Panel, "Vertical", { name: "PROPERTIES" },
//         new go.Binding("itemArray", "properties"),
//         {
//           row: 1, margin: 3, stretch: go.GraphObject.Fill,
//           defaultAlignment: go.Spot.Left, background: "lightyellow",
//           itemTemplate: null
//         }
//       ),
//       $("PanelExpanderButton", "PROPERTIES",
//         { row: 1, column: 1, alignment: go.Spot.TopRight, visible: false },
//         new go.Binding("visible", "properties", function (arr) { return arr.length > 0; })),
//       // methods
//       $(go.TextBlock, "Methods",
//         { row: 2, font: "italic 10pt sans-serif" },
//         new go.Binding("visible", "visible", function (v) { return !v; }).ofObject("METHODS")),
//       $(go.Panel, "Vertical", { name: "METHODS" },
//         new go.Binding("itemArray", "methods"),
//         {
//           row: 2, margin: 3, stretch: go.GraphObject.Fill,
//           defaultAlignment: go.Spot.Left, background: "lightyellow",
//           itemTemplate: null
//         }
//       ),
//       $("PanelExpanderButton", "METHODS",
//         { row: 2, column: 1, alignment: go.Spot.TopRight, visible: false },
//         new go.Binding("visible", "methods", function (arr) { return arr.length > 0; }))
//     )
//   );
// 	function convertIsTreeLink(r) {
// 		return r === "generalization";
// 	}

// 	function convertFromArrow(r) {
// 		switch (r) {
// 			case "generalization": return "";
// 			default: return "";
// 		}
// 	}

// 	function convertToArrow(r) {
// 		switch (r) {
// 			case "generalization": return "Triangle";
// 			case "aggregation": return "StretchedDiamond";
// 			default: return "";
// 		}
// 	}
// 	diagram.linkTemplate = 
// 	$(go.Link,
// 		{ routing: go.Link.Orthogonal },
// 		new go.Binding('relinkableForm','canReLink').ofModel(),
// 		new go.Binding('relinkableTo','canRelink').ofModel(),
// 		new go.Binding("isLayoutPositioned", "relationship", convertIsTreeLink),
// 		$(go.Shape),
// 		$(go.Shape, { scale: 1.3, fill: "white" },
// 			new go.Binding("fromArrow", "relationship", convertFromArrow)),
// 		$(go.Shape, { scale: 1.3, fill: "white" },
// 			new go.Binding("toArrow", "relationship", convertToArrow))
// 	)

// 	diagram.model = 
// 	$(go.GraphLinksModel,
// 	{
// 		linkKeyProperty: 'key',
// 		copiesArrays: true,
// 		copiesArrayObjects: true,
// 		makeUniqueKeyFunction: (m: go.Model, data: any) => {
// 			let k = data.key || 1;
// 			while (m.findNodeDataForKey(k)) k++;
// 			data.key = k;
// 			return k;
// 		},
// 		// negative keys for links
// 		makeUniqueLinkKeyFunction: (m: go.GraphLinksModel, data: any) => {
// 			let k = data.key || -1;
// 			while (m.findLinkDataForKey(k)) k--;
// 			data.key = k;
// 			return k;
// 		}
// 	});

// 	return diagram;
//   }
//   handleModelChange(changes) {
//     alert('Go JS model changed !')
//   }
// 	render() {
// 		return(
// 			<div>
// 			 <ReactDiagram
//             ref={this.diagramRef}
//             initDiagram={this.initDiagram}
//             divClassName='diagram-component'
//             nodeDataArray={this.state.nodeDataArray}
//             linkDataArray={this.state.linkDataArray}
// 						onModelChange={this.handleModelChange}
// 						modelData={this.state.modelData}
// 						onModelChange={this.handleModelChanges}
//             />
// 			</div>
// 		)
// 	}
}

export default Diagram