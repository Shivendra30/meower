import React, { Component } from 'react';
import Input from './components/Input/Input';
import Mews from './components/Mews/Mews';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';


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
          <Router>
            <div className="App">
              <Input onMewsUpdated={this.onMewsUpdated.bind(this)}/>
              <Mews mewsUpdated = {this.state.mewsUpdate}/>
            </div>
          </Router>  
        );

      case 'signin': 
        return (
          <Router>
            <div className="App">
              <Signin onRouteChange={this.onRouteChange.bind(this)}/>
            </div>
          </Router>  
        );

      case 'register' :
        return (
          <Router>
            <div className="App">
              <Register onRouteChange={this.onRouteChange.bind(this)}/>
            </div>
          </Router>  
        );

      default:
        return;
    }
   
  }
}

export default App;
