import React, { useEffect, useState } from "react"
import { codeCTO } from './Code'
import { parse } from './model'
import * as go from 'gojs';
import { diagram } from './gojsHelper'
import './App.css'

const Diagram = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <div
              id="myPalette" style={{
                border: 'solid 1px black',
                width: '200px', height: '750px'
              }}>
            </div>
          </td>
          <td >
            <div
              id="myDiagramDiv"
              onChange={props.onChange}
              style={{
                border: 'solid 1px black',
                width: '550px', height: '750px'
              }}></div>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "center" }}><b>Tool Palette</b></td>
          <td style={{ textAlign: "center" }}><b>UML Diagram</b></td>
        </tr>
      </tbody>
    </table>
  )
}

export default Diagram