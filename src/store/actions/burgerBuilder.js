import * as actionTypes from './actionTypes';
import AxiosInstance from '../../AxiosInstance';

export const addIngredient = (name) => {
    return {
        type : actionTypes.ADD_INGREDIENT,
        ingredientName : name
    }
}

export const removeIngredient = (name) => {
    return {
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientName : name
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type : actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const setIngredients = (ingredients) => {
    return {
        type : actionTypes.SET_INGREDIENTS,
        ingredients : ingredients
    }
}

export const initIngredients = () => {
    return dispatch => AxiosInstance.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            }).catch(error => {
                dispatch(fetchIngredientsFailed());
            });
}