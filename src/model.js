var modelManager
export var nodeDataArray = []
export var linkDataArray = []

//updates model after being parsed from Editor
export function generateModelFromCode(model) {
  modelManager = model
  console.log(modelManager)
  nodeDataArray = []
  linkDataArray = []
  generateNodeDataArray()
  generateLinkDataArray()
  console.log(nodeDataArray)
  console.log(linkDataArray)
}
  // key - name of class
  // type - type of declaration
  // properties - name and type of properties

export function generateNodeDataArray() {
  const model = modelManager[0].declarations
  const nodeObj = {key: '', type: '', properties: []}
  model.map((res,idx) => {
    nodeObj[idx] = {key: res.name, type: res.ast.type, properties: res.properties}
    nodeDataArray.push(nodeObj[idx])
  })
  return nodeDataArray
}

// generates relationship array

export function generateLinkDataArray() {
  const model = modelManager[0].declarations
  const linkObj = {to: '', from: ''}
  var key = 0
  model.map((res,idx) => {
    if(res.superType) {
      linkObj[key] = {to: res.name, from: res.superType}
      linkDataArray.push(linkObj[key])
      key++
    }
  })
  linkDataArray.push(linkObj)
  return linkDataArray
}

export function updateDiagram() {
  //make changes to model declarations using node data and link data
  const model = modelManager[0].declarations
  console.log(model)
}
/*
[{
  id, lineNumber, line, metamodel, data
}]

*/
export const parse = (code) => {
  let metadata = []
  let lines = code.split("\n")

  const addMetadata = (id, lineNumber, line, metamodel, data) => {
    metadata.push({
      id: id,
      lineNumber: lineNumber,
      line: line,
      metamodel: metamodel,
      data: data
    })
  }

  var properties = []
  var lineNumber = 0;
  var line, metamodel, data;
  var bracketOpen = false;
  var isAbstract = false;
  var skipLine = false;
  var openingLine, openingLineNumber;
  var id = 0;
  lines.forEach((element, idx) => {
    lineNumber = idx + 1;
    line = element;
      /****** comments ******/
    if (line.search("//") !== -1) {
      metamodel = "comment"
      data = line;
      addMetadata(id++, lineNumber, line, metamodel, data)
    } else if (line.split(" ")[0] === "namespace") {
      /****** namespace ******/
      metamodel = "namespace"
      data = line.split(" ")[1];
      addMetadata(id++, lineNumber, line, metamodel, data)
    } else if (line.search("import") !== -1 &&
      /****** import ******/
      line.split(" ")[0] === "import"){
        metamodel = "import"
        if(line.search("from")!==-1){
          let tempLine = line.split(" ")
          data = {
            "importedModule": tempLine[1],
            "dependency": tempLine[3]
          }
        } else {
          data = line.split(" ")[1]
        }
        addMetadata(id++, lineNumber, line, metamodel, data)
    } else if (line.search("@") !== -1) {
      /****** decorators ******/
      metamodel="decorators"
      addMetadata(id++, lineNumber, line, metamodel, line)
    } else if (line.search("{") !== -1) {
      /****** classes and relationships ******/
      let tempLine = line.split(" ")
      openingLine = line
      openingLineNumber = lineNumber
      // check for abstract
      if(tempLine.includes("abstract")){
        isAbstract = true;
        var pos = tempLine.indexOf("abstract")
        metamodel = tempLine[pos] + " " + tempLine[pos+1] 
        if(tempLine.includes("{")) bracketOpen = true;
        skipLine = true;
      }
      // check for concept and relationships
    
    }
    // adding properties of abstract concept to the model
      if(bracketOpen && isAbstract && line.search("}") !== -1){
        data = {
          "properties": properties
        }
        properties = []
        isAbstract = false;
        bracketOpen = false;
        addMetadata(id++, openingLineNumber, openingLine, metamodel, data)
      } else if(bracketOpen && isAbstract && line.search("o") !== -1) {
        if(!skipLine) properties.push({"property": line, "lineNumber": lineNumber})
        skipLine = false
      }
  });
  console.log(metadata)
}
/*
{[{
  id: 1,
  lineNumber: 1,
  line: abstract concept Ankush,
  properties: [
    {
      lineNumber: 2,
      property: o String Name
    }
  ],
  metamodel : "abstract concept"
},
{
  id: 2,
  lineNumber: 4,
  line: concept Sushmita extends Ankush,
  nodeName: Sushmita,
  relatedNodeName: Ankush,
  properties: [
    {
      lineNumber: 5,
      property: o String Name
    }
  ],
  metamodel : "concept"
}
]}
======================================
{
  nodeDataArray: [
    {id: 1, }
  ]
}

*/