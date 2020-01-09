import React, { Component } from 'react';
import Aux from '../../HOC/Auxillary/Auxillary';
import Burger from '../../Component/Burger/Burger';
import BuildControls from '../../Component/Burger/BuildControls/BuildControls';
import Modal from '../../Component/UI/Modal/Modal';
import OrderSummary from '../../Component/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    cheese : 1.1,
    salad : 2.1,
    bacon : 3.3,
    meat : 0.7
}

class BurgerBuilder extends Component{

    state = {
        ingredients : {
            cheese : 0,
            salad : 0,
            bacon : 0,
            meat: 0
        },
        purchasable : false,
        purchasing : false,
        totalPrice : 4.0
    }

    updatePurchaseState = (myState) => {
        const sum = Object.keys(myState.ingredients).map(
            iKey => myState.ingredients[iKey]
        ).reduce(
        (sum,currValue) => sum+currValue, 0);
        this.setState({purchasable: sum>0});
    }

    addIngredientHandler = (type) => {
        const myState = {...this.state};
        myState.ingredients[type] = this.state.ingredients[type]+1;
        myState.totalPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
        this.setState(myState);
        this.updatePurchaseState(myState);
    }

    removeIngredientHandler = (type) => {
        const myState = {...this.state};
        if(myState.ingredients[type]<=0){
            return;
        }
        myState.ingredients[type] = this.state.ingredients[type]-1;
        myState.totalPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
        this.setState(myState);
        this.updatePurchaseState(myState);
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }
    
    purchaseConfirmHandler = () => {
        alert('DONE!!!!!!!!!!');
    }

    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    confirmClicked={this.purchaseConfirmHandler}
                    cancelClicked={this.purchaseCancelHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls 
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    orderEnabled={this.state.purchasable}
                    ordered={this.purchaseHandler}/>
            </Aux>
        );
    }
};

export default BurgerBuilder;