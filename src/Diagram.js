import React, { useEffect, useState } from "react"
import * as go from 'gojs';
import './App.css'

const Diagram = (props) => {
  return(
    <table>
      <tbody>
        <tr>
          <td>
            <div
            id="myPalette" style={{border: 'solid 1px blue',
            width:'200px', height:'750px'}}>
            </div>
          </td>
          <td>
            <div
            id="myDiagramDiv"
            style={{border: 'solid 1px blue',
            width:'600px', height:'750px'}}></div>
          </td>
        </tr>
        <tr>
          <td style={{textAlign:"center"}}><b>Tool Palette</b></td>
          <td style={{textAlign:"center"}}><b>UML Diagram</b></td>
        </tr>
      </tbody>
    </table>
  )
}

export default Diagram