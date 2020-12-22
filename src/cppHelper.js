export const parseInputOutputDeclare = (obj, tab) => {
  let str = "";
  if (obj.category == 'Inputs-Outputs') {
    if (obj.text.length > 4) {
      let inputs = obj.text.split(':');
      if (inputs[0].startsWith('Input')) {
	str += (`  cin >> `);
	let input = inputs[1].split(',');
	input.forEach((ip, idx) => {
	  if (idx !== input.length - 1) {
	    str += (`${ip} >> `)
	  } else {
	    str += (`${ip};\n`)
	  }
	})
      } else if (inputs[0].startsWith('Output')) {
	str += "  cout << ";
	let output = inputs[1].split(',');
	output.forEach((op, idx) => {
	  if (idx !== output.length - 1)
	    str += (`${op} << `);
	  else
	    str += (`${op};\n`);
	})
	// take inputs using "Declare: a, b
      } else if (inputs[0].startsWith('Declare')) {
	let dataStructures = {
	  int: [], float: [], double: [], string: [], vector: [],
	  set: [], map: [], list: [], queue: [], deque: [],
	  pair: [], auto: []
	}
	let input = inputs[1].split(', ');
	// check the length of each input, if 1 then create it using auto, else add given data structure
	input.forEach((ip, idx) => {
	  ip = ip.trim();
	  // break by space, if still one element then push to auto
	  let [datatype, variable] = ip.split(" ");
	  if(variable == undefined)
	    dataStructures.auto.push(datatype);
	  if(datatype !== undefined && variable !== undefined){
	    // if data type is vector
	    let datatypes = ['int', 'float', 'double','string','vector', 'set', 'map', 'queue', 
	      'stack', 'list', 'pair', 'deque'];
	    datatypes.forEach(dt => {
	      if(datatype.startsWith(dt)) 
		dataStructures[dt].push({type: datatype, variable: variable})
	    })
	  }
	})
	// traverse each property of the dataStructure object and create given variables 
	//console.log(Object.entries(dataStructures));
	Object.entries(dataStructures).forEach(r => {
	  let defs = r[1];
	  if(r[0] == "auto"){
	    if(defs[0] != "") str += (tab + `auto `);
	    r[1].forEach((autoVar, idx) => {
	      if(idx !== r[1].length - 1)
		str += (`${autoVar}, `);
	      else str += (`${autoVar}`);
	    })
	  }
	if(defs[0]!=""){
	    defs.forEach(def => {
	      if(def.type !== undefined && def.variable !== undefined)
		str += (tab + `${def.type} ${def.variable};\n`);
	    })
	  }
	})
	str += (';\n');
      }
    }
  }
  return str;
}

export const parseConditionalStr = (obj, tab) => {
  let str = "";
  if(obj.category == 'Conditional'){
    let conditionStatement = obj.text;
    let ifStatement = `${tab}if(${conditionStatement}) {\n`;
    // search obj for node with from == condtion's key and text is YES, 
    // then note the TO key, and find that statement, and put it text inside the if scope
    // if there's a NO, then find that TO key and put it in the else scope
    ifStatement += `${tab}}\n`;
    str += ifStatement;
  }
  return str;
}




