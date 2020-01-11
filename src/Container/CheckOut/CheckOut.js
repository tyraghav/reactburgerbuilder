import React , { Component } from 'react';
import classes from './CheckOut.module.css';
import CheckOutSummary from '../../Component/Order/CheckOutSummary/CheckOutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class CheckOut extends Component {
    state = {
        ingredients: {},
        price : null
    }
    
    componentDidMount(){
        const ingredients = {};
        let price = null;
        for(let i of this.props.location.search.slice(1).split('&')){
            let p = i.split('=');
            if(p[0]!=='price'){
                ingredients[p[0]]= +p[1];
            } else {
                price = +p[1];
            }
        }
        console.log(ingredients);
        this.setState({ingredients: ingredients, price: price});
    }

    checkOutConfirmHandler = () => {
        this.props.history.push('/checkout/contact');
    }

    checkOutCancelHandler = () => {
        this.props.history.goBack();
    }
    
    render() {
        return (
            <div className={classes.CheckOut}>
                <CheckOutSummary ingredients={this.state.ingredients}
                cancel={this.checkOutCancelHandler} confirm={this.checkOutConfirmHandler}/>
                <Route path='/checkout/contact' render={() =>{
                    return <ContactData {...this.props} ingredients={this.state.ingredients} price={this.state.price}/>
                }}/>
            </div>
        )
    }
}

export default CheckOut;