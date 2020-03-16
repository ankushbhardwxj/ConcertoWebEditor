var modelManager
export var nodeDataArray = []
export var linkDataArray = []

//updates model after being parsed from Editor
export function generateModelFromCode(model) {
  modelManager = model
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
  // console.log(nodeDataArray)
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
  // console.log(linkDataArray)
  return linkDataArray
}

export function updateDiagram() {
}