import React, { Component } from 'react';
import Input from './components/Input/Input';
import Mews from './components/Mews/Mews';


// import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      username: '',
      userMew: ''
    }
  }  

  render() {
    return (
      <div className="App">
      <Input />
      <Mews />
      </div>
    );
  }
}

export default App;
