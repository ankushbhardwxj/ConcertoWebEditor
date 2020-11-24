import React, { useState } from 'react';
import './App.css';
import CodeEditor from './Editor';
import Diagram from './Diagram';
import { Grid } from 'semantic-ui-react';
import Highlight from 'react-highlight.js';
import { codeCTO } from './Code';

const Cpp = props => {
  const [model, updateModel] = useState([]);
  const [code, updateCode] = useState('');
  const setupPalette = () => {

  }

  const setupDiagram = () => {

  }

  useState(() => {
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
            setupPalette={setupPalette}
            setupDiagram={setupDiagram}
          />
        </Grid.Column>
      </Grid>
    </React.Fragment>
  )
}

export default Cpp;