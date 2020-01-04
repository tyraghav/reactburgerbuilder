import React, { Component } from 'react';
import Aux from '../../HOC/Auxillary/Auxillary';
import Burger from '../../Component/Burger/Burger';
import BuildControls from '../../Component/Burger/BuildControls/BuildControls';

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
        totalPrice : 4.0
    }

    addIngredientHandler = (type) => {
        const myState = {...this.state};
        console.log(this.state);
        myState.ingredients[type] = this.state.ingredients[type]+1;
        myState.totalPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
        this.setState({myState});
    }

    removeIngredientHandler = (type) => {
        const myState = {...this.state};
        if(myState.ingredients[type]<=0){
            return;
        }
        myState.ingredients[type] = this.state.ingredients[type]-1;
        myState.totalPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
        this.setState({myState});
    }

    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls addIngredient={this.addIngredientHandler} removeIngredient={this.removeIngredientHandler} disabledInfo={disabledInfo}/>
            </Aux>
        );
    }
};

export default BurgerBuilder;