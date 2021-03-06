import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let displayIngredients = Object.keys(props.ingredients).map(
        idKey => [...Array(props.ingredients[idKey])].map(
        (_,num) => <BurgerIngredient key={idKey+num} type={idKey} /> 
        )).reduce((arr,currEl) => arr.concat (currEl),[]);
    if(displayIngredients.length === 0){
        displayIngredients = <p>Please add a Ingredient</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {displayIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

export default Burger;
