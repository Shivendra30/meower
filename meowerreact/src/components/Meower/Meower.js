import React, {Component} from 'react';
import Input from './Input/Input';
import Mews from './Mews/Mews';
import './Meower.css';
//this.props.history.push(path);
class Meower extends Component {

	signOut = (isAuthenticated) => {

		this.props.isAuthenticated(isAuthenticated);
		this.props.history.push('/');

	}


	render(){
		console.log(this.props);
		
		return(
			<div>
			<p className='signout' onClick={() => this.signOut(false)}> <u> Sign Out </u> </p>
			<Input user={this.props.user}/>
			<Mews user={this.props.user}/>
			</div>

		);
	}
}

export default Meower;