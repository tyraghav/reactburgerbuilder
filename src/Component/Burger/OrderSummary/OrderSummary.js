import React from 'react';
import Auxillary from '../../../HOC/Auxillary/Auxillary';

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
    </Auxillary>
}

export default OrderSummary;