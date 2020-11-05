export const parse = (code) => {
  let metadata = []
  let lines = code.split("\n")
  // add node data
  const addMetadata = (key, metamodel, properties) => {
    metadata.push({
      key: key,
      metamodel: metamodel,
      toNode: null,
      properties: properties,
    })
  }

  // add relationship data
  const addRelationship = (fromNode, toNode) => {
    metadata.push({
      from: fromNode,
      to: toNode
    })
  }

  let fromNode, toNode, key, metamodel;
  let properties = "";
  let bracketOpen = false;
  lines.forEach(ele => {
    let line = ele.trim(" ");
    line = line.split(" ");
    let pos = 0;
    if (!bracketOpen) {
      // get node data and relationship data
      if (line.includes('concept')) {
        pos = line.indexOf('concept');
        metamodel = line[pos];
        key = line[pos + 1];
      }
      if (line.includes('extends')) {
        let relationKeywordIdx = line.indexOf('extends');
        toNode = line[relationKeywordIdx + 1];
        fromNode = line[relationKeywordIdx - 1];
      }
      if (line.includes('{')) {
        bracketOpen = true;
      }
    } else {
      // get properties
      if (line.includes('o') || line.includes('-->')) {
        properties += "\t";
        line.forEach(token => properties += (token + " "));
        properties += "\n";
      }
      if (line.includes('}')) {
        bracketOpen = false;
      }
    }
  })
  if (fromNode != undefined && toNode != undefined) {
    addRelationship(fromNode, toNode);
  }
  if (key != undefined && metamodel != undefined) {
    addMetadata(key, metamodel, properties);
  }
  return metadata;
}
