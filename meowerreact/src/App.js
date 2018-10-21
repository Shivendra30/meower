import React, { Component } from 'react';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Meower from './components/Meower/Meower';

import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

/*
Things to achieve:
- Add a profle section. 
- Set the isAuthenticated state according to the user session from the backend
- Disable forward-arrow url navigation in chrome so that the user cannot see protected content without logging in
- Set isAuthenticated to false when the user clicks the back button (essentially signpout the user)
*/

class App extends Component {


  constructor(props){
    super(props);
    this.state = {
      username: '',
      userMew: '',
      route: 'signin',
      mewsUpdate: false,
      isAuthenticated: false,
      user: {}
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

  authenticate = (isValid) => {
    this.setState({
      isAuthenticated: isValid
    });
    console.log('authenticate', isValid);
  }

  setUser = (user) => {
    console.log(user);
    this.setState({
      user: user
    })
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/meower', {
      method: 'get',
      headers: {'Content-Type': 'appplication/json'}
    }).then(response => {
      console.log('/Meower response',response);
      response.json()
    })
    .then(data => {
      console.log('/Meower Data', data);
      if(data === 'valid user'){
        this.setState({isAuthenticated: true});
      }else{
        this.setState({isAuthenticated: false})
      }
      this.forceUpdate();
    });
  }


  render() {

    return(

    <BrowserRouter>
      
      <div>
        <Route path="/" render={(props) => 
          <Signin {...props} isAuthenticated = {this.authenticate} setUser={this.setUser.bind(this)} />} exact={true} />
        <Route path="/register" render={(props) => 
          <Register {...props} isAuthenticated = {this.authenticate} setUser={this.setUser.bind(this)} />}  />
        {this.state.isAuthenticated && 
          <Route path="/meower" render={(props) => <Meower {...props} user = {this.state.user} isAuthenticated = {this.authenticate} />}  />}        
      </div>  

    </BrowserRouter>

    );
   
  }


}

export default App;
