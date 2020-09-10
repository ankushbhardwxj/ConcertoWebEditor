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

  const addMetadata = (lineNumber, line, metamodel, data) => {
    metadata.push({
      lineNumber: lineNumber,
      line: line,
      metamodel: metamodel,
      data: data
    })
  }

  lines.forEach((element, idx) => {
    var lineNumber = idx + 1;
    var line = element;
    var metamodel, data;
    if (line.search("//") != -1) {
      metamodel = "comment"
      data = line;
      addMetadata(lineNumber, line, metamodel, data)
    } else if (line.split(" ")[0] == "namespace") {
      metamodel = "namespace"
      data = line.split(" ")[1];
      addMetadata(lineNumber, line, metamodel, data)
    }
  });
  console.log(metadata)
}
