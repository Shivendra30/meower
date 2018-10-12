import React, {Component} from 'react';
import './Signin.css';

class Signin extends Component {

	constructor(props){
		super(props);
		this.state={
			email: '',
			password : ''
		}
	}

	onEmailChange = (event) => {
		this.setState({
			email: event.target.value
		});
	}

	onPasswordChange = (event) => {
		this.setState({
			password: event.target.value
		});
	}

	signinUser =() => {
		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		}).then(response => response.json())
		.then(user => {
			console.log(user);
			if(user){
				console.log('Checking credentials',user);
				this.props.onRouteChange('home');
			}
		})
	}


	render(){
		return(
			<div className="signinForm">
			  <div className="form-group">
			    <label htmlFor="exampleInputEmail1">Email address</label>
			    <input onChange={this.onEmailChange} 
			    type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
			    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
			  </div>
			  <div className="form-group">
			    <label htmlFor="exampleInputPassword1">Password</label>
			    <input onChange={this.onPasswordChange}
			    type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
			  </div>
			  <p className="createAccount" onClick={() => this.props.onRouteChange('register')}> Create an account </p>
			  <button 
			  onClick={this.signinUser}
			  type="submit" 
			  className="btn btn-primary">Sign In</button>
			</div>

		);
	}
}

export default Signin;