import React from "react"
import ReactDOM from "react-dom"
import graph from "nomnoml"

const canvasStyle = {
	height: "600px",
	width: "1400px",
	border: "solid",
}
class Nomnoml extends React.Component {
	componentDidMount(){
		var source = this.props.source || '';
		console.log(source)
		source = source.toString().replace(/(\r|\n)(\t|\s|\r|\n)*/g, '\n');
		graph.draw(ReactDOM.findDOMNode(this), source);
	}
	render(){
		return <canvas style={canvasStyle}></canvas>
	}
}

export default Nomnoml;