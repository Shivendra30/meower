import React, { Component } from 'react';
import Input from './components/Input/Input';
import Mews from './components/Mews/Mews';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';


// import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      userMew: '',
      route: 'signin',
      mewsUpdate: false
    }
  }

  onRouteChange = (route) => {
    this.setState({
      route: route
    })
  }  

  onMewsUpdated = () =>{
    console.log('MewsUpdated : ', this.state.mewsUpdate);
    this.setState({
      mewsUpdate: !this.state.mewsUpdate
    });
  }

  render() {

    switch(this.state.route){

      case 'home':
        return (
          <div className="App">
            <Input onMewsUpdated={this.onMewsUpdated.bind(this)}/>
            <Mews mewsUpdated = {this.state.mewsUpdate}/>
          </div>
        );

      case 'signin': 
        return (
          <div className="App">
            <Signin onRouteChange={this.onRouteChange.bind(this)}/>
          </div>
        );

      case 'register' :
        return (
          <div className="App">
            <Register onRouteChange={this.onRouteChange.bind(this)}/>
          </div>
        );

      default:
        return;
    }
   
  }
}

export default App;
