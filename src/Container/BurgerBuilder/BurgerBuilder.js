import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxillary from '../../HOC/Auxillary/Auxillary';
import WithErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler';
import Burger from '../../Component/Burger/Burger';
import BuildControls from '../../Component/Burger/BuildControls/BuildControls';
import Modal from '../../Component/UI/Modal/Modal';
import OrderSummary from '../../Component/Burger/OrderSummary/OrderSummary';
import AxiosInstance from '../../AxiosInstance';
import Spinner from '../../Component/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component{

    state = {
        purchasable : false,
        purchasing : false,
        loading: false
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(
            iKey => ingredients[iKey]
        ).reduce(
        (sum,currValue) => sum+currValue, 0);
        return sum>0;
    }

    addIngredientHandler = (type) => {
        const myState = {...this.state};
        myState.ingredients[type] = this.props.ings[type]+1;
        this.setState(myState);
        this.updatePurchaseState(myState);
    }

    removeIngredientHandler = (type) => {
        const myState = {...this.state};
        if(myState.ingredients[type]<=0){
            return;
        }
        myState.ingredients[type] = this.props.ings[type]-1;
        this.setState(myState);
        this.updatePurchaseState(myState);
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
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
            });
            const queryParams = [];
            for (let i in this.props.ings){
                queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ings[i]));
            }
            const queryString = queryParams.join('&');*/
            this.props.onInitPurchase();
            this.props.history.push('/checkout');
    }

    componentDidMount(){
        this.props.onInitIngredients();
       /* AxiosInstance.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            }).catch(error => {
                this.setState({error: true});
            }); */
    }

    render(){
        const disabledInfo = {...this.props.ings};
        let burger = (<Auxillary><Burger ingredients={this.props.ings} />
            <BuildControls 
                isAuthenticated={this.props.isAuthenticated}
                addIngredient={this.props.onIngredientAdded}
                removeIngredient={this.props.onIngredientRemoved}
                disabledInfo={disabledInfo}
                price={this.props.price}
                orderEnabled={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler}/>
                </Auxillary>);
        if(this.state.ingredients===null){
            burger=this.props.error?<p>Error Fetching Ingredient Details</p>:<Spinner />;
        }
        let orderSummary = <OrderSummary ingredients={this.props.ings}
                            price={this.props.price}
                            confirmClicked={this.purchaseConfirmHandler}
                            cancelClicked={this.purchaseCancelHandler}/>;
        if(this.state.loading){
            orderSummary = <Spinner/>;
        }
        if(this.props.ings===null){
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

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuthenticated : state.auth.idToken!==null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseBurgerInit),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder,AxiosInstance));