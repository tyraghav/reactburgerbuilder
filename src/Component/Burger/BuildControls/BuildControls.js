import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const BuildControls = (props) => {
    const controls = [
        { label: 'SALAD', type: 'salad'},
        { label: 'MEAT', type: 'meat'},
        { label: 'BACON', type: 'bacon'},
        { label: 'CHEESE', type: 'cheese'}
    ]
    return (<div className={classes.BuildControls}>
        <p>Total Price : <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(it => <BuildControl
                                key={it.type} label={it.label} 
                                adder={() => props.addIngredient(it.type)}
                                remover={() => props.removeIngredient(it.type)}
                                disabledInfo={props.disabledInfo[it.type]}
                            />
                        )}
        <button className={classes.OrderButton} onClick={props.ordered} disabled={!props.orderEnabled}>ORDER NOW</button>
    </div>);
}

export default BuildControls;