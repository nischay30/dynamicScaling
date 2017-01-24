
import io from 'socket.io-client';
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


const style = {
  height: 310,
  width: '100%',
  color: 'white',
  background: '#1A237E',
  
 
 
  display: 'inline-block',
};

const styles = {
  
  height: 310,
  width: '100%',
  colour: '#006064',
  
 
  
  display: 'inline-block',
};

const circle = {
  height: 140,
  width: 140,
  margin: 20,
  textAlign: 'center',
  fontSize: 36,
  display: 'inline-block',
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      replicas: '',
      workers:'-',
      open: false,
      frequency:'',
      delay:'',
      max: '',
      min:'',
      instances:'',
      workload: '-',
      socket: ''
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
      frequency:this.state.frequency,
      delay:this.state.delay,
      max: this.state.max,
      min:this.state.min,
      instances: this.state.instances
    });
    
  
    this.state.socket.emit('sending',{passFrequency:this.state.frequency,processingDelay:this.state.delay, Max_Threshold:this.state.max, Min_Threshold: this.state.min, Min_Instances: this.state.instances} );
    console.log("Setted"+this.state.frequency);
  };

handleChangeFrequency = (event, value) => {
  this.setState({
    frequency: value
  });
  console.log("frequency: "+this.state.frequency);
}

handleChangeDelay = (event, value1) => {
  this.setState({
    delay: value1
  });
  console.log("delay: "+this.state.delay);
}

handleChangeMax = (event, value2) => {
  this.setState({
    max: value2
  });
  console.log("Max_Threshold"+this.state.max);
}

handleChangeMax = (event, value3) => {
  this.setState({
    min: value3
  });
  console.log("Min_Threshold"+this.state.min);
}

handleChangeInstances = (event, value4) => {
  this.setState({
    instances: value4
  });
  console.log("Min_Instances:"+this.state.instances);
}

handleReplicaNumber = (event) => {
  this.setState({replicas: event.target.value});
}

componentDidMount() {
    // TODO: All socket.on's should appear here.
    // Remember, not to write any functions here.
    // var socket = io();
    let socket = io();
    socket.on('workload', this.handleWorkload.bind(this));
    socket.on('workers', this.handleWorkers.bind(this));
    this.setState({socket});
 }
 handleWorkers(workers) {
  this.setState({workers});
 }

 handleWorkload(workload) {
  this.setState({workload});
 }

 submitReplicaNumber(replicaNumber) {
  console.log('Replicas Required:', replicaNumber);
  this.state.socket.emit('replicas', replicaNumber);
 }


  render() {
    return (
      <div>
    <Paper style={style} zDepth={1} >
     <div style={{textAlign: 'center',color: 'white', marginLeft: '1%',float:'left', paddingTop: 5, width: '48%'}}> 
     <h2> Workload </h2>
      <Paper style={circle} zDepth={1} circle={true} >
      <h6> {this.state.workload} </h6>
      </Paper>
     </div>

     <div style={{textAlign: 'center',color: 'white', marginRignt:'1%',float:'left', paddingTop: 5, width: '48%'}}> 
     <h2> Workers </h2>
      <Paper style={circle} zDepth={1} circle={true} >
      <h6> {this.state.workers} </h6>
      </Paper>
     </div>

     </Paper>
    

    <Divider />
    <Paper style={styles} zDepth={1}>
    <div style={{color: '#006064', float:'left', paddingTop: 40, width: '33%'}} >
   <TextField
      floatingLabelText ="Frequency"
      value={this.state.frequency}
      onChange={this.handleChangeFrequency}/>msgs/s
    </div>
  

    <div style={{color: '#006064', float:'right', paddingTop:40, width: '33%'}} >

    <TextField
    floatingLabelText="No. of Replicas"
    value1={this.state.replicas}
    onChange={this.handleReplicaNumber}/>

    <RaisedButton
    primary = {true}
    label='Go'
    onTouchTap = {this.submitReplicaNumber.bind(this, this.state.replicas)}
    />
    <br />
    </div>
    
    <div style={{color: '#006064', float:'right', paddingTop:40, width: '33%'}} >

    <TextField
    floatingLabelText="Processing Delay"
    value1={this.state.delay}
    onChange={this.handleChangeDelay}/>ms

    <br />
    </div>


    <div style={{color: '#006064', float:'right', paddingTop:40, width: '33%'}} >
    <TextField
    floatingLabelText="Min_Threshold"
    value3={this.state.min}
    onChange={this.handleChangeMin}/>ms

    <br />
    </div>

    <div style={{color: '#006064', float:'right', paddingTop:40, width: '33%'}} >

    <TextField
    floatingLabelText="Max_Threshold"
    value2={this.state.max}
    onChange={this.handleChangeMax}/>ms

    <br />
    </div>

    <div style={{color: '#006064', float:'right', paddingTop:40, width: '33%'}} >

    <TextField
    floatingLabelText="Min_Instances"
    value4={this.state.instances}
    onChange={this.handleChangeInstances}/>ms

    <br />
    </div>
    
     <RaisedButton  onTouchTap={this.handleTouchTap} style={{margin:120, marginLeft:570}} label="Submit" primary={true}  />
     
    
    </Paper>

    </div>
    );
  }
}

export default App;
