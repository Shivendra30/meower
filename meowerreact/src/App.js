import React, { Component } from 'react';
import Input from './components/Input/Input';
import Mews from './components/Mews/Mews';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

/*
Things to achieve:
- Set the isAuthenticated state according to the user session from the backend
- Put a signout option on the top and set isAUthenticated to false
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
      isAuthenticated: false
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


  render() {

    return(

    <BrowserRouter>
      
      <div>
        <Route path="/" render={(props) => <Signin {...props} isAuthenticated = {this.authenticate} />} exact={true} />
        <Route path="/register" render={(props) => <Register {...props} isAuthenticated = {this.authenticate} />}  />
        {this.state.isAuthenticated && <Route path="/meower" component={Input} />}
        {this.state.isAuthenticated && <Route path="/meower" component={Mews} />}
      </div>  

    </BrowserRouter>

    );
   
  }


}

export default App;
