import React, { useEffect, useState } from 'react';
import './App.css';
import Diagram from './Diagram';
import {
  setupPaletteDiagram,
  setupPaletteNodeData,
  setupUMLDiagram,
  diagram,
} from './gojsHelper';
import { Grid } from 'semantic-ui-react';
import Highlight from 'react-highlight.js';

const Json = () => {
  const [model, updateModel] = useState([]);
  const [code, updateCode] = useState('');
  const addModelListener = () => {
    diagram.addModelChangedListener(evt => {
      let newModel = evt.model.Cc;
      generateJSONCode(newModel);
    })
  }

  const generateJSONCode = model => {
    // optimize this json code
    let newModel = model.map(obj => {
      let newObj = new Object();
      if (obj.key !== undefined) {
        newObj.className = obj.key;
        newObj.classType = obj.metamodel;
        let props = obj.properties;
        props = props.split('\n');
        newObj.classProps = props;
      } else {
        newObj.nodeType = "relationship";
        newObj.to = obj.to;
        newObj.from = obj.from;
      }
      return newObj;
    })
    let jsonCode = JSON.stringify(newModel, null, 2);
    updateCode(jsonCode);
  }

  const setupPalette = () => {
    setupPaletteDiagram()
    setupPaletteNodeData()
  }

  const setupDiagram = () => {
    setupUMLDiagram(model)
    addModelListener()
  }

  useEffect(() => {
    setupDiagram();
    setupPalette();
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

export default Json;
