import React, { useState, useEffect } from 'react';
import './App.css';
import CodeEditor from './Editor';
import Diagram from './Diagram';
import { Grid } from 'semantic-ui-react';
import Highlight from 'react-highlight.js';
import { codeCTO } from './Code';
import {
  diagram, setupFlowChartDiagram, setupFlowChartPalette, setupPaletteDiagram, setupPaletteNodeData,
  setupUMLDiagram
} from './gojsHelper';

const Cpp = props => {
  const [model, updateModel] = useState([]);
  const [code, updateCode] = useState('');
  const addModelListener = () => {
    diagram.addModelChangedListener(evt => {
      let newModel = evt.model.Cc;
      //console.log(newModel);
      generateCppCode(newModel);
    })
  }

  const generateCppCode = (model) => {
    let str = "";
    let tab = "  ";
    let header = "#include<bits/stdc++.h>";
    let namespace = "using namespace std;";
    str += (header + "\n" + namespace + "\n\n");
    str += ("int main() {\n");
    model.forEach(obj => {
      // Statement
      if (obj.category == 'Statement') {
        if (obj.text.length > 4) {
          str += (`  ${obj.text}\n`);
        }
      }
      // Input Output
      if (obj.category == 'Comment') {
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
              int: [],
              float: [],
              double: [],
              string: [],
              vector: [],
              set: [],
              map: [],
              list: [],
              queue: [],
              deque: [],
              pair: [],
              auto: []
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
                str += (tab + `auto `);
                r[1].forEach((autoVar, idx) => {
                  if(idx !== r[1].length - 1)
                    str += (`${autoVar}, `);
                  else str += (`${autoVar}`);
                })
              }
              defs.forEach(def => {
                if(def.type !== undefined && def.variable !== undefined)
                  str += (tab + `${def.type} ${def.variable};\n`);
              })
            })
            str += (';\n');
          }
        }
      }
    });
    str += ("  return 0;\n}\n\n");
    updateCode(str);
  }

  const setupPalette = () => {
    setupFlowChartPalette();
  }

  const setupDiagram = () => {
    setupFlowChartDiagram(model);
    addModelListener();
  }

  useEffect(() => {
    setupDiagram();
    setupPalette();
  }, [model])

  return (
    <React.Fragment>
      <Grid columns={2}>
        <Grid.Column width={7}>
          <Highlight language={'C++'}>
            {code}
          </Highlight>
        </Grid.Column>
        <Grid.Column width={8}>
          <Diagram
            model={model}
            paletteClass='myPalette'
            diagramClass='myDiagramDiv'
            setupPalette={setupPalette}
            setupDiagram={setupDiagram}
          />
        </Grid.Column>
      </Grid>
    </React.Fragment>
  )
}

export default Cpp;
