export const jsonToCode = (json) => {
  let code = "";
  let nodeData = [];
  let linkData = [];
  console.clear();

  if (json.length > 0) {
    json.forEach(obj => {
      if (obj.metamodel !== undefined)
        nodeData.push(obj);
      else
        linkData.push(obj)
    })
    // clear all existing links
    for (let node of nodeData)
      node.toNode = null;
    // set links in actual model
    for (let link of linkData) {
      let toNode = link.to;
      let fromNode = link.from;
      for (let i = 0; i < nodeData.length; i++) {
        if (nodeData[i].key === fromNode)
          nodeData[i].toNode = toNode;
      }
    }
  }

  // generate JSON to string
  nodeData.map(r => {
    if (r.metamodel !== undefined && r.key !== undefined) {
      code += r.metamodel + " " + r.key;
      if (r.toNode !== null) {
        code += " extends " + r.toNode;
      }
      code += " { \n"
      if (r.properties !== undefined) {
        let props = r.properties.split("\n");
        props.map(r => code += "  " + r + "\n")
      }
      code += "}\n\n"
    }
  })

  return code;
}