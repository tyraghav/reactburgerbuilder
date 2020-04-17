import React, { Component } from 'react';
import './App.css';
import Layout from './Component/Layout/Layout';
import BurgerBuilder from './Container/BurgerBuilder/BurgerBuilder';
import CheckOut from './Container/CheckOut/CheckOut';
import Auth from './Container/Auth/Auth';
import { Route , Switch, withRouter, Redirect } from 'react-router-dom';
import Orders from './Container/Orders/Orders';
import LogOut from './Container/Auth/LogOut/LogOut';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render(){

    let routes = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to='/'/>
    </Switch>);

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path='/logout' component={LogOut}/>
          <Route path='/auth' component={Auth} />
          <Route path='/checkout' component={CheckOut} />
          <Route path='/orders' component={Orders} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/'/>
        </Switch>
      );
    }

    return (
    <div className="App">
      <Layout>
        {routes}
      </Layout>
    </div>
  );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
