import React, {useEffect, useState} from 'react';
import './App.css';
import Diagram from './Diagram'
import CodeEditor from './Editor'
import {
  parse
} from './model'
import { codeCTO } from './Code';
import { Container, Navbar, Row, Col } from 'react-bootstrap'

const App = () => {
  const [code, setCode] = useState(codeCTO)

  const parseCode = () => {
    console.log("parsing")
    parse(code)
  }

  const handleChange = (newCode) => {
    console.clear()
    parse(newCode)
  }

  useEffect(() => {
    console.clear()
    parseCode()
  })

  return (
    <Container fluid>
      <Navbar bg="dark" variant="dark">
        <p style={{color: "white"}}>Concerto Schema Language to UML converter</p>
      </Navbar>
      <Row>
        <Col>
          <CodeEditor
            code = {codeCTO}
            onChange = {handleChange}
          />
        </Col>
        <Col>
          <Diagram 
            refer={React.createRef()}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

