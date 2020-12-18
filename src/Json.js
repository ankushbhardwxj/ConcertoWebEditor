import React, { useEffect, useState } from 'react';
import './App.css';
import Diagram from './Diagram';
import {
  setupPaletteDiagram,
  setupPaletteNodeData,
  setupUMLDiagram,
  diagram,
} from './gojsHelper';
import { Grid, Input, Button, Message } from 'semantic-ui-react';
import Highlight from 'react-highlight.js';
import { ModelManager } from '@accordproject/concerto-core';
import CodeEditor from './Editor';

const Json = () => {
  const [model, updateModel] = useState([]);
  const [code, updateCode] = useState('');
  const [modelName, updateModelName] = useState('model');
  const [testResult, toggleTestResult] = useState('');
  const [editMode, toggleEditMode] = useState(false);
  const [visibleMessage, toggleVisibleMessage] = useState(true);

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
    let finalModel = {};
    finalModel[modelName] = [];
    finalModel[modelName] = newModel;
    let jsonCode = JSON.stringify(finalModel, null, 2)
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

  const handleClick = () => {
    if (!visibleMessage) toggleVisibleMessage(true);
    try {
      if (JSON.stringify(JSON.parse(code), null, 2) == code)
        toggleTestResult('Valid JSON (RFC 8259)');
      else toggleTestResult('Invalid JSON (RFC 8259)');
    } catch (err) {
      toggleTestResult('Invalid JSON (RFC 8259). Error parsing JSON.')
    }
  }

  const handleEditCodeClick = () => {
    toggleEditMode(!editMode);
  }

  const onCodeModify = code => {
    updateCode(code);
  }

  const handleDismiss = () => {
    toggleVisibleMessage(false);
  }

  useEffect(() => {
    setupDiagram();
    setupPalette();
  }, [model]);

  return (
    <React.Fragment>
      <Grid columns={2}>
        <Grid.Column width={7}>
          <Button primary onClick={handleEditCodeClick}>
            Edit Code
          </Button>
          {!editMode && <Highlight language={'json'}>
            {code}
          </Highlight>}
          {editMode && <CodeEditor code={code} onChange={onCodeModify} />}
        </Grid.Column>
        <Grid.Column width={8}>
          <div className="Json-tester">
            <Button primary onClick={handleClick}>
              Test JSON Code
            </Button>
            {(testResult.length > 0 && visibleMessage) &&
              <Message onDismiss={handleDismiss}>
                {testResult}
              </Message>}
          </div>
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
