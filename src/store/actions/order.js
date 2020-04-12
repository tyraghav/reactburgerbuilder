import * as actionTypes from './actionTypes';
import AxiosInstance from '../../AxiosInstance';

export const purchaseBurgerSuccess = (id,orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailure = (error) => { 
    return {
        type: actionTypes.PURCHASE_BURGER_FAILURE,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        AxiosInstance.post('/Orders.json',orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            }).catch(error => {
                dispatch(purchaseBurgerFailure(error));
            });
    }
}

export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailure = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILURE,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
         type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
    dispatch(fetchOrderStart());
    AxiosInstance.get('/Orders.json')
        .then(Response => {
            const fetchedOrders = [];
            for(let ord in Response.data){
                fetchedOrders.push({...Response.data[ord],id:ord});
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
    }).catch(Error => {
        dispatch(fetchOrdersFailure(Error));
    });
}}
