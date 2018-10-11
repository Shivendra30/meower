import React, {Component} from 'react';
import './Mew.css';


class Mews extends Component {

	constructor(props){
		super(props);
		//console.log(props)
		this.state = {
			mews: []
		}
	}

	componentDidMount(){
    //Fetching Mews
    fetch('http://localhost:3000/mews', {
      method: 'get',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        mews: data
      });
      //console.log('Mews Fetched', this.state);
    })
    .catch(err => console.log('MEWS ERROR', err));
  }

	render(){
		const {mews} = this.state;
		console.log(mews);
		const mewList = mews.map(mew => {
			const currentDate = new Date();
			const mewDate = new Date(mew.date);
			const timePassed = Math.round((currentDate - mewDate) / (1000*60*60*24));
			const daysAgo = `${timePassed} days`;

			return(
				<div id="singleMew" key= {mew.id}>
					<li className="listItem">
					<div className="mewInfo">
						<p className='username'> {mew.username} </p>
						<p className='days'> {daysAgo} </p>
					</div>
					<p className='mew'> {mew.mew} </p>
					</li>
				</div>	
				);
		})
		return(
			<div className="mewDiv">
			<h1 className="mt4 tc"> Mews </h1>
			{mewList}
			</div>
			);
	}
}

export default Mews;