import React , { Component } from 'react';
import { connect } from 'react-redux';
import classes from './CheckOut.module.css';
import CheckOutSummary from '../../Component/Order/CheckOutSummary/CheckOutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';

class CheckOut extends Component {

    componentDidMount(){
        /*const ingredients = {};
        let price = null;
        for(let i of this.props.location.search.slice(1).split('&')){
            let p = i.split('=');
            if(p[0]!=='price'){
                ingredients[p[0]]= +p[1];
            } else {
                price = +p[1];
            }
        }
        this.setState({ingredients: ingredients, price: price});*/
    }

    checkOutConfirmHandler = () => {
        this.props.history.push('/checkout/contact');
    }

    checkOutCancelHandler = () => {
        this.props.history.goBack();
    }
    
    render() {
        let summary = <Redirect to='/'/>
        if(this.props.ings){
            let purchasedRedirect = this.props.purchased?<Redirect to='/'/>:null;
            summary = <div className={classes.CheckOut}>
                {purchasedRedirect}
                <CheckOutSummary ingredients={this.props.ings}
                cancel={this.checkOutCancelHandler} confirm={this.checkOutConfirmHandler}/>
                <Route path='/checkout/contact' component={ContactData}/>
            </div>
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(CheckOut);