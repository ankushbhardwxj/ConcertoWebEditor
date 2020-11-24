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
      console.log(newModel);
    })
  }

  const setupPalette = () => {
    setupFlowChartPalette();
  }

  const setupDiagram = () => {
    setupFlowChartDiagram(model);
    setupPalette();
  }

  useEffect(() => {
    setupDiagram();
    setupPalette();
    addModelListener();
  }, [model])

  return (
    <React.Fragment>
      <Grid columns={2}>
        <Grid.Column width={7}>
          <Highlight language={'json'}>
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