import React, { Component } from 'react';
import classes from './Orders.module.css';
import Order from '../../Component/Order/Order';
import AxiosInstance from '../../AxiosInstance';
import WithErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler';
import Spinner from '../../Component/UI/Spinner/Spinner';


class Orders extends Component {
state = {
    orders: [],
    loading: false
}

componentDidMount(){
    this.setState({loading:true});
    AxiosInstance.get('/Orders.json')
        .then(Response => {
            const fetchedOrders = [];
            for(let ord in Response.data){
                fetchedOrders.push({...Response.data[ord],id:ord});
            }
            this.setState({loading: false,orders:fetchedOrders});
    }).catch(Error => {
        this.setState({loading:false});
    });
}

render(){
    let myOrders = this.state.orders.map((myOrder) => <Order key={myOrder.id} ingredients={myOrder.ingredients} price={myOrder.price}/>);
    if(this.state.loading){
        myOrders=<Spinner/>
    }
    return (
        <div className={classes.Orders}>
            {myOrders}
        </div>
    );
}

}
export default WithErrorHandler(Orders,AxiosInstance);