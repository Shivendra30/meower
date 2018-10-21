import React, {Component} from 'react';
import './Input.css';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

class Input extends Component {

	constructor(props){
		super(props);

		this.state ={
			username: this.props.user.name,
			userMew: ''
		}
	}

	setMewState = (event) => {
    //console.log(event.target.value);
    this.setState({
      userMew: event.target.value
    });
    console.log('setMewState',event.target.value);
  }
  
  	setUserName = (event) => {
  	  this.setState({
		username: event.target.value
   	 });
  	  console.log('setUserName',event.target.value);
  	}

  	postMews = () => {
    console.log('postMews',this.state);

    fetch('http://localhost:3000/post', {
		method: 'post', 
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			username: this.state.username,
			userMew: this.state.userMew
		})
	})
    .then(response => response.json())
    .then(mew => {
    	console.log(mew);
    	socket.emit('newMew', {
    	username: this.state.username,
    	userMew: this.state.userMew
    	});
    })
    .catch(err => console.log('Post Error', err));

    document.getElementById('inputMew').value = '';
 	
    

  }

	render(){
		console.log(this.state.username);
		return(
			<div>
				<div className='form'>
				  
				  <div className="form-group">
				  `	<label htmlFor="inputMew">Enter your Mew </label>
				    <input type="text" 
				    onChange={this.setMewState}
				    className="form-control" 
				    id="inputMew"/>
				  </div>
				  <div className='form-group'>
				  	<button onClick={this.postMews} 
				  	type="submit" id="submitButton" className="btn btn-primary">Submit</button>
				  </div>
				</div>
			</div>
			);
	}
}

export default Input;