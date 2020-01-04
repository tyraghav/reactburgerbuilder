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
        {controls.map(it => <BuildControl key={it.type} label={it.label} adder={() => props.addIngredient(it.type)} remover={() => props.removeIngredient(it.type)} disabledInfo={props.disabledInfo[it.type]}/>)}
    </div>);
}

export default BuildControls;