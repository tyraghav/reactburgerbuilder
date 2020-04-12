import React, { Component } from 'react';
import classes from './Orders.module.css';
import Order from '../../Component/Order/Order';
import AxiosInstance from '../../AxiosInstance';
import WithErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler';
import Spinner from '../../Component/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component {

componentDidMount(){
}

render(){
    let myOrders = this.props.orders.map((myOrder) => <Order key={myOrder.id} ingredients={myOrder.ingredients} price={myOrder.price}/>);
    if(this.props.loading){
        myOrders=<Spinner/>
    }
    return (
        <div className={classes.Orders}>
            {myOrders}
        </div>
    );
}

}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(Orders,AxiosInstance));