export const jsonToCode = (json) => {
  let code;
  let n = json.length
  let nodeData = [];
  let linkData = [];
  console.clear()
  console.log(json)

  if(n > 0) {
    json.map(obj => {
      if(obj.metamodel !== undefined)
        nodeData.push(obj);
      else
        linkData.push(obj)
    })
    console.log(nodeData)
    console.log(linkData)
    /*
      iterate through nodeData objects, if relationship exists
      at linkData, then update nodeData else keep it empty
    */
  }

  // generate JSON to string
  json.map(r => {
    if(r.metamodel !== undefined && r.key !== undefined){
      code += r.metamodel + " " + r.key;
      if(r.relationship.fromNode !== r.key && r.relationship.fromNode !== ""){
        code += " extends " + r.relationship.fromNode
      }
      code += " { \n"
      code += "  " + r.properties + "\n"
      code += "}\n\n"
    }
  })

  return code;
}