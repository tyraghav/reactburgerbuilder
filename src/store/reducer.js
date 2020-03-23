import * as actionTypes from './actions';

const INGREDIENT_PRICE = {
    cheese : 1.1,
    salad : 2.1,
    bacon : 3.3,
    meat : 0.7
}

const initialState = {
    ingredients : {
        cheese : 0,
        salad : 0,
        bacon : 0,
        meat : 0
    },
    totalPrice : 4.0,
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
        default : 
            return state;
 }
}

export default reducer;