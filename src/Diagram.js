import React, { useEffect, useState } from "react"
import {codeCTO} from './Code'
import {parse} from './model'
import * as go from 'gojs';
import {diagram} from './gojsHelper'
import './App.css'

const Diagram = (props) => {
  const [code, setCode] = useState(codeCTO);

  const cleanDiv = () => {
    const div = document.getElementById('myDiagramDiv')
    while(div.firstChild){
      div.removeChild(div.firstChild)
    }
    div.removeAttribute('style')
    div.style = "border: 1px solid blue; width: 600px; height: 750px;"
    console.log(div)
  }

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
          <td >
            <div
            id="myDiagramDiv"
            onChange={props.onChange}
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