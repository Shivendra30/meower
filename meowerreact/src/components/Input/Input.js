import React, {Component} from 'react';
import './Input.css';

class Input extends Component {

	constructor(props){
		super(props);
		this.state ={
			username: '',
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
    .then(mew => console.log(mew))
    .catch(err => console.log('Post Error', err));

    this.props.onMewsUpdated();

  }

	render(){
		return(
			<div>
				<div className='form'>
				  <div className="form-group">
				    <input type="text" 
				    onChange={this.setUserName}
				    className="form-control" 
				    id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username"/>
				  </div>
				  <div className="form-group">
				  `	<label htmlFor="exampleInputPassword1">Enter your Mew </label>
				    <input type="text" 
				    onChange={this.setMewState}
				    className="form-control" 
				    id="exampleInputPassword1"/>
				  </div>
				  <div className='form-group'>
				  	<button onClick={this.postMews} 
				  	type="submit" className="btn btn-primary">Submit</button>
				  </div>
				</div>
			</div>
			);
	}
}

export default Input;