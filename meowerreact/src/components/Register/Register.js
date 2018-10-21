import React, {Component} from 'react';
import './Register.css';

class Register extends Component {

	constructor(props){
		super(props);
		this.state={
			name: '',
			email: '',
			password : ''
		}
	}

	onNameChange = (event) => {
		
		this.setState({
			name: event.target.value
		});
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

	redirectUrl = (path) => {
		this.props.history.push(path);
	}

	registerUser = () => {

		if(!this.state.name || !this.state.email || !this.state.password){

			alert('Please filll in all details to register');

		}

		fetch('http://localhost:3000/register', {
			method: 'post',
			headers : {'Content-Type': 'application/json'},
			body : JSON.stringify({
				name: this.state.name,
				email: this.state.email, 
				password: this.state.password
			})
		}).then(response => response.json())
		.then(user => {
			console.log(user);
			if(user) {
				this.props.setUser(user);
				this.props.isAuthenticated(true);
				this.redirectUrl('/meower');
			}
		})
	}



	render(){
		return(
			<div className="registerForm"> 

			  <h1> Register </h1>
				
			  <div className="form-group">
			    <label htmlFor="exampleInputName">Name</label>
			    <input onChange={this.onNameChange}
			    type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Enter name"/>
			  </div>
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
			  <p className="signin" onClick={() => this.redirectUrl('/')}> I already have an account </p>
			  <button
			  onClick={this.registerUser}
			  type="submit" 
			  className="btn btn-primary">Register</button>
			
			</div>
		);
	}
}

export default Register;