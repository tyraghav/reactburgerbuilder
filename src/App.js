import React from 'react';
import './App.css';
import Layout from './Component/Layout/Layout';
import BurgerBuilder from './Container/BurgerBuilder/BurgerBuilder';
import CheckOut from './Container/CheckOut/CheckOut';
import { Route , Switch } from 'react-router-dom';
import Orders from './Container/Orders/Orders';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path='/checkout' component={CheckOut} />
          <Route path='/orders' component={Orders} />
          <Route path='/' exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
