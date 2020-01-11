import React from 'react';
import classes from './Order.module.css';

const Order = props => {
    const inArray = [];
    for(let ing in props.ingredients){
        inArray.push({name:ing, amount:props.ingredients[ing]});
    }

    const ingredientDisplay = inArray.map((ig) => (
    <span key={ig.name} style={{textTransform: 'capitalize',
                                display: 'inline-block',
                                margin: '0 8px',
                                border: '1px solid #ccc',
                                padding: '5px'
}}> {ig.name} : ({ig.amount}) </span>));

    return (
        <div className={classes.Order}>
            <p>Ingredients : {ingredientDisplay}</p>
            <p>Price : <strong>INR {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default Order;