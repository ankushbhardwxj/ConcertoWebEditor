import React from "react";
import { Grid } from "semantic-ui-react";

const Diagram = (props) => {
  return (
    <Grid columns={2}>
      <Grid.Column width={4}>
        <div
          id={props.paletteClass} style={{
            border: 'solid 1px black',
            width: '200px', height: '652px',
            background: '#a1a1a1'
          }}>
        </div>
      </Grid.Column>
      <Grid.Column width={4}>
        <div
          id={props.diagramClass}
          onChange={props.onChange}
          style={{
            border: 'solid 1px black',
            width: '550px', height: '652px',
            background: '#9e9e9e'
          }}></div>
      </Grid.Column>
    </Grid>
  )
}

export default Diagram