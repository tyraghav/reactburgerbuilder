import React, { Component } from 'react';
import Auxillary from '../../HOC/Auxillary/Auxillary';
import WithErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler';
import Burger from '../../Component/Burger/Burger';
import BuildControls from '../../Component/Burger/BuildControls/BuildControls';
import Modal from '../../Component/UI/Modal/Modal';
import OrderSummary from '../../Component/Burger/OrderSummary/OrderSummary';
import AxiosInstance from '../../AxiosInstance';
import Spinner from '../../Component/UI/Spinner/Spinner';

const INGREDIENT_PRICE = {
    cheese : 1.1,
    salad : 2.1,
    bacon : 3.3,
    meat : 0.7
}

class BurgerBuilder extends Component{

    state = {
        ingredients : null,
        purchasable : false,
        purchasing : false,
        totalPrice : 4.0,
        loading: false,
        error: false
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
        /*const myOrder = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice
        }
        this.setState({loading: true});
        AxiosInstance.post('/Orders.json',myOrder)
            .then(Response => {
                this.setState({loading: false,
                            purchasing: false});
            }).catch(Error => {
                this.setState({loading:false,
                    purchasing: false});
            });*/
            const queryParams = [];
            for (let i in this.state.ingredients){
                queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
            }
            const queryString = queryParams.join('&');
            this.props.history.push({
                pathname: '/checkout',
                search: '?'+queryString+'&price='+this.state.totalPrice
            });
    }

    componentDidMount(){
        AxiosInstance.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            }).catch(error => {
                this.setState({error: true});
            });
    }

    render(){
        const disabledInfo = {...this.state.ingredients};
        let burger = (<Auxillary><Burger ingredients={this.state.ingredients} />
            <BuildControls 
                addIngredient={this.addIngredientHandler}
                removeIngredient={this.removeIngredientHandler}
                disabledInfo={disabledInfo}
                price={this.state.totalPrice}
                orderEnabled={this.state.purchasable}
                ordered={this.purchaseHandler}/>
                </Auxillary>);
        if(this.state.ingredients===null){
            burger=this.state.error?<p>Error Fetching Ingredient Details</p>:<Spinner />;
        }
        let orderSummary = <OrderSummary ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            confirmClicked={this.purchaseConfirmHandler}
                            cancelClicked={this.purchaseCancelHandler}/>;
        if(this.state.loading){
            orderSummary = <Spinner/>;
        }
        if(this.state.ingredients===null){
            orderSummary = null;
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Auxillary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
        );
    }
};

export default WithErrorHandler(BurgerBuilder,AxiosInstance);