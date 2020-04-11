import * as actionTypes from '../actions/actionTypes';

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
            return {
                ...state,
                ingredients : {...state.ingredients,
                [action.ingredientName] : state.ingredients[action.ingredientName]+1
                },
                totalPrice : state.totalPrice + INGREDIENT_PRICE[action.ingredientName] 
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients : {...state.ingredients,
                [action.ingredientName] : state.ingredients[action.ingredientName]-1
                },
                totalPrice : state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients : action.ingredients,
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