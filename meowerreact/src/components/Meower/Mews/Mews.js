import React, {Component} from 'react';
import './Mew.css';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');


class Mews extends Component {

	constructor(props){
		super(props);
		//console.log(props)
		this.state = {
			mews: [],
			mewsUpdated: this.props.mewsUpdated
		}
	}

	fetchMews = () => {
	fetch('http://localhost:3000/mews', {
      method: 'get',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        mews: data.reverse()
      });
      console.log('Mews Fetched', this.state.mews);
    })
    .catch(err => console.log('MEWS ERROR', err));
	}

	componentDidMount(){
    //Fetching Mews
    this.fetchMews();   

    // console.log(this.props.mewsUpdated);

    socket.on('newMew', (data) => {
    	console.log("From Socket!", "Got a new mew");
    	this.fetchMews();
	});

	socket.on('deletedMew', (data) => {
    	console.log("From Socket!", "Got a new mew");
    	this.fetchMews();
	});

  }

  deleteMew = (index) => {

	console.log(index);
	fetch('http://localhost:3000/delete', {
		method: 'delete', 
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			index: index
		})
	})
    .then(response => response.json())
    .then(data => {
    	console.log('Deleted Mew', data);
    	socket.emit('deletedMew', {
    		index: index
    	});
    })
    .catch(err => console.log('Post Error', err));

    


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
						<button id="deleteButton" onClick={() => this.deleteMew(mew.id)}> Delete </button>
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