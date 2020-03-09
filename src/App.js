import React from 'react';
import './App.css';
import MonacoEditor from 'react-monaco-editor';
import Element from './Element'
var mappedElements = new Map();
var classNameProperties = new Map();
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: `namespace org.accordproject.calendar

      import org.accordproject.time.Duration from https://models.accordproject.org/time@0.2.0.cto
      import org.accordproject.geo.GeoCoordinates from https://models.accordproject.org/geo.cto
      
       abstract asset CalendarComponent identified by uid {
          o String uid
       }
      
      abstract asset UniqueComponent extends CalendarComponent {
          o String[] attendee optional
          o String[] comment optional
          o DateTime dtstamp optional
          o String organizer optional
          o String[] requestStatuses optional
          o String url optional
      }
      
      abstract asset RecurringComponent extends UniqueComponent {
          o String[] attachements optional
          o String[] categories optional
          o String classType optional
          o String[] contacts optional
          o DateTime created optional
          o String description optional
          o DateTime lastModified optional
          o Integer priority optional
          o String[] related optional
          o Integer sequence optional
          o String summary optional
      }
      
      asset VAlarm extends CalendarComponent {
          o String alarmAction optional
          o String attachment optional
          o String[] attendees optional
          o String description optional
          o Duration duration optional
          o Integer repeat optional
          o String summary optional
      }
      
      asset VEvent extends RecurringComponent {
          o DateTime dtend optional
          o Duration duration optional
          o DateTime end optional
      
          o Boolean isAllDay optional
          o GeoCoordinates geo optional
          o String location optional
          o String[] resources optional
          o String transparency optional
          o Boolean isActive optional
      }
      
      asset VFreebusy extends UniqueComponent {
          o DateTime dtstart optional
          o DateTime dtend optional
          o DateTime start optional
          o DateTime end optional
      }
      
      asset VJournal extends RecurringComponent {
      }
      
      asset VTodo extends RecurringComponent {
          o DateTime completed optional
          o DateTime due optional
          o Duration duration optional
          o GeoCoordinates geo optional
          o String location optional
          o Integer percentComplete optional
          o String[] resources optional
          o String todo optional
      }`,
    }
  }
  //EDitor
  editorDidMount(editor, monaco) {
    editor.focus();
  }
  findClassNameAndProp(code){
    console.log("PROPERTIES")
    classNameProperties.clear()
    var codeline = code.split('\n')
    for(let idx in codeline) {
      const lineOfCode = codeline[idx]
      if(lineOfCode.includes("asset") && lineOfCode.includes("{")) {
        const wordOfLine = lineOfCode.trim().split(" ");
        const classNames = wordOfLine[wordOfLine.indexOf("asset") + 1];
        var propArr = [];
        while(!codeline[idx].includes("}")){
          if (!codeline[idx].includes("{")){
            const prop = codeline[idx].trim();
            propArr.push(prop);
            idx++;
          } else {
            idx++;
          }
          classNameProperties.set(classNames,propArr)
        }
      }
    }
    console.log(classNameProperties)
  }
  parseCode(code){
    this.findClassNameAndProp(code);
    console.log("Relations")
    var codeline = code.split('\n')
    mappedElements.clear()
    for(let idx in codeline) {
      const lineOfCode = codeline[idx];
      if (lineOfCode.includes("asset")){
        const wordOfLine = lineOfCode.trim().split(" ")
        //find relations & map namewise
        const extendsIdx = wordOfLine.indexOf("extends");
        if (extendsIdx >= 0) {
          const fromClass = wordOfLine[extendsIdx + 1]
          const toClass = wordOfLine[extendsIdx - 1]
          mappedElements.set(mappedElements.size + 1, {fromClass, toClass})
        }
      } 
    }
    console.log(mappedElements)
    
  }
  onChange(newValue, e) {
    //  console.log('onChange', newValue, e);
    //  console.log(newValue);
    this.setState({
      code: newValue
    })
    this.parseCode(this.state.code)
  }
  componentDidMount(){
    this.parseCode(this.state.code)
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <div style={{display:"grid", grid:"0px / auto auto"}}>
        <MonacoEditor
          width="700"
          height="720"
          language="javascript"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={this.onChange.bind(this)}
          editorDidMount={this.editorDidMount}
        />   
        <Element 
          classDataArray={classNameProperties}
        />
      </div>
    );
  }
}

export default App;

