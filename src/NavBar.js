import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react';

const NavBar = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
      <h3 style={{ color: "white" }}>Concerto Schema Language to UML converter</h3>
      <Button style={{ marginLeft: '25px', marginBottom: '8px' }}
        size='sm'
        onClick={props.click}
        variant="light">
        Update Diagram
      </Button>
      <Dropdown
        style={{ marginLeft: '24px', marginBottom: '4px' }}
        placeholder='Select Code Generator'
        selection
        onChange={props.dropDown}
        options={[
          { key: 'JSON', text: 'JSON', value: 'JSON' },
          { key: 'Concerto', text: 'Concerto', value: 'Concerto' }]}
      />
    </Navbar>
  )
}

export default NavBar;