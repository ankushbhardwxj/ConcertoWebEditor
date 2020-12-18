import React from 'react';
import { Button, Navbar } from 'react-bootstrap';

const NavBar = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
      <h3 style={{ color: "white" }}>Concerto Schema Language to UML converter</h3>
      <Button style={{ marginLeft: '25px' }}
        primary
        onClick={props.click}
      >
        <b>Test</b>
      </Button>
    </Navbar>
  )
}

export default NavBar;