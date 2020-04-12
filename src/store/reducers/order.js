import * as actions from '../actions/actionTypes';

const initialState = {
    orders : [],
    loading : false,
    purchased : false
}

const reducer = (state=initialState, action ) => {
    switch (action.type) {
        case actions.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            }
        case actions.PURCHASE_BURGER_FAILURE:
            return {
                ...state,
                loading: false
            }
        case actions.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actions.PURCHASE_BURGER_INIT:
            return {
                ...state,
                purchased: false
            }
        case actions.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }
        case actions.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.orders
            }
        case actions.FETCH_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
            }
        default :
            return state;
    }
}

export default reducer;