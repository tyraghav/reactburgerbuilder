import React, { Component } from 'react';
import './App.css';
import Layout from './Component/Layout/Layout';
import BurgerBuilder from './Container/BurgerBuilder/BurgerBuilder';
import { Route , Switch, withRouter, Redirect } from 'react-router-dom';
import LogOut from './Container/Auth/LogOut/LogOut';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';
import asyncComponent from './HOC/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./Container/CheckOut/CheckOut');
});

const asyncAuth = asyncComponent(() => {
  return import('./Container/Auth/Auth');
});

const asyncOrders = asyncComponent(() => {
  return import('./Container/Orders/Orders');
});

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render(){

    let routes = (
    <Switch>
      <Route path='/auth' component={asyncAuth} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to='/'/>
    </Switch>);

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path='/logout' component={LogOut}/>
          <Route path='/auth' component={asyncAuth} />
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
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
