import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';
const INGREDIENT_PRICE = {
    cheese : 1.1,
    salad : 2.1,
    bacon : 3.3,
    meat : 0.7
}

const initialState = {
    ingredients : {},
    totalPrice : 4.0,
    error : false
}

const reducer = (state = initialState, action) => {
    switch (action.type){ 
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredients = updateObject(...state.ingredients,{[action.ingredientName] : state.ingredients[action.ingredientName]+1});
            const updatedState = updateObject(...state,{ingredients : updatedIngredients,totalPrice : state.totalPrice + INGREDIENT_PRICE[action.ingredientName]})
            return updatedState;
        case actionTypes.REMOVE_INGREDIENT:
            const updIngredients = updateObject(...state.ingredients,{[action.ingredientName] : state.ingredients[action.ingredientName]-1});
            const updState = updateObject(...state,{ingredients : updIngredients,totalPrice : state.totalPrice - INGREDIENT_PRICE[action.ingredientName]})
            return updState;
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients : action.ingredients,
                totalPrice : 4,
                error : false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error : true
            }
        default: 
            return state;
 }
}

export default reducer;