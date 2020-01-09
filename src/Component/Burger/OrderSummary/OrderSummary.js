import React from 'react';
import Auxillary from '../../../HOC/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map(
        idKey => { return (<li key={idKey}><span style={{textTransform : 'capitalize'}}>{idKey} : </span>{props.ingredients[idKey]}</li>)}
    );
    return <Auxillary>
        <h3>Your Order</h3>
        <p>A Delicious Burger with following Ingredients</p>
        <ul>
            {ingredientsSummary}
        </ul>
        <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
        <Button btnType='Success' clicked={props.confirmClicked}>CONFIRM</Button>
        <Button btnType='Danger' clicked={props.cancelClicked}>CANCEL</Button>
    </Auxillary>
}

export default OrderSummary;