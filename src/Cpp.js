import React, { useState, useEffect } from 'react';
import './App.css';
import CodeEditor from './Editor';
import Diagram from './Diagram';
import { Button, Grid, TextArea, Form, Segment } from 'semantic-ui-react';
import Highlight from 'react-highlight.js';
import { codeCTO } from './Code';
import {
  diagram, setupFlowChartDiagram, setupFlowChartPalette, setupPaletteDiagram, setupPaletteNodeData,
  setupUMLDiagram
} from './gojsHelper';
import {parseInputOutputDeclare, parseConditionalStr} from './cppHelper';

const Cpp = props => {
  const [model, updateModel] = useState([]);
  const [code, updateCode] = useState('');
  const addModelListener = () => {
    diagram.addModelChangedListener(evt => {
      let newModel = evt.model.Cc;
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
          str += (`  ${obj.text};\n`);
        }
      }
      // Input Output
      let parsedIOStr = parseInputOutputDeclare(obj, tab);
      if(parsedIOStr != undefined)
        str += parsedIOStr;
      // if else statements
      let conditionalStr = parseConditionalStr(obj, tab);
      if(conditionalStr != undefined)
        str += conditionalStr;
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
        <Grid.Column width={7} style={{paddingLeft: '30px'}}>
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
      <InputOutputBox />
    </React.Fragment>
  )
}

const InputOutputBox = props => {
  return (
    <React.Fragment>
      <Form>
        <Grid columns={2}>
            <Grid.Column>
              <h4>Input</h4> 
            </Grid.Column>
            <Grid.Column>
              <Button secondary>Compile</Button> 
            </Grid.Column>
          </Grid>
        <TextArea placeholder='Enter inputs'/>
          <h4>Output</h4>
        <Segment>Outputs from program</Segment>
      </Form>
    </React.Fragment>
  )
}

export default Cpp;
