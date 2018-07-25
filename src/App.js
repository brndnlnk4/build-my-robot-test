import React, { Component } from 'react';
import { Button, Container, Row, Col, Input, Label, Form, Table } from 'reactstrap';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  constructor(){
    super()
    
    this.state = {
      robotType: '',
      robotColor: '',
      robotsBuilt: []
    }
    
    this.robotTypes = [
      'Flying Robot', 'Wheeled Robot', 'Walking Robot'
    ]
    this.robotColors = [
      'Gold', 'Silver', 'Bronze'
    ]
    this.styles = {
      table: {borderRadius:3,minHeight:'30vh',background:'#e0e0e0',marginTop:30,padding:7},
      container: {width:'50%',marginTop:20},
      leftHalfRow: {marginTop:20},
      buildRobotBtn: {marginTop:10},
      dropdown: {borderColor: '#333'}
    }
  }
  
  leftSideSelectOptions($typeOrColor){
    let $rows = this[`${$typeOrColor}s`].map((v,i) => (
        <option key={i}>{v}</option>
      ))
    
    $rows.unshift((<option key={this.robotTypes.length} value=''>Select...</option>))
                  
    return $rows
  }
  
  onChangeOfSelection(event){
    const {name,value} = event.currentTarget
    
    this.setState({
      [name]:value
    }, () => console.log('name: %s, value: %s',name,value))
  }
  
  buildRobot(){
    
    let {robotsBuilt, robotColor, robotType} = this.state,
        updatedTable = robotsBuilt;
    
    if(!robotColor.trim() || !robotType.trim()) return alert('Please reselect Type and Color');
    
    updatedTable.push({
      color:robotColor,
      type:robotType
    })
    
    this.setState({
      robotsBuilt: updatedTable
    })
  }
  
  removeRobot(index){
    const robotsBuilt = this.state.robotsBuilt
    
    robotsBuilt.splice(index,1)
    
    this.setState({robotsBuilt})
  }
  
  builtRobotsTable($robotTypeColorRowContent){
    const {robotsBuilt} = this.state,
          $rows = robotsBuilt.length ? robotsBuilt.map((v,i) => (
            <tr key={i} rowSpan>
              <td colSpan="5" className="p-1">
                <span className="bg-white border p-2 card">
                  {v.type}
                </span>
              </td>
              <td colSpan="5" className="p-1">
                <span className="bg-white border p-2 card">
                  {v.color}
                </span>
              </td>
              <td colSpan="2" className="p-1">
                   <Button color="link" onClick={() => this.removeRobot(i)} className="bg-white border p-2 card" block>Remove</Button>
               </td>
            </tr>
          )) : <tr><td align='center' style={{verticalAlign:'middle'}}><h3>Add some Robots</h3></td></tr>
    
    return(
      <Row>

        <Col md='5'>
         
          {$robotTypeColorRowContent}
          
          <Row>
            <Button size='lg' block color='success' onClick={this.buildRobot.bind(this)} style={this.styles.buildRobotBtn}>Build Robot</Button>
          </Row>
        </Col>

        <Col md='7'>
          <Table responsive style={this.styles.table}><tbody>{$rows}</tbody></Table>
        </Col>

      </Row>
    )
  }
  
  robotTypeColorRowContent($colorOrTypeKeys){
    
    return $colorOrTypeKeys.map(($colorOrTypeKey,i) => {
      const $data = this.state[$colorOrTypeKey] || false
      
      return(
        <Row key={i} style={this.styles.leftHalfRow}>
         
          <Label>Robot {$colorOrTypeKey.substring(5)}</Label>

          <Input type='select' size='lg' defaultValue={$data} name={$colorOrTypeKey} onChange={e => this.onChangeOfSelection(e)} style={this.styles.dropdown}>
            {this.leftSideSelectOptions($colorOrTypeKey)}
          </Input>
          
        </Row>
      )
    })
  }
  
  render() {
    
    return (
      <Container style={this.styles.container}>
          {this.builtRobotsTable(this.robotTypeColorRowContent(['robotType','robotColor']))}
      </Container>
    );
  }
}

export default App;
