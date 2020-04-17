import * as actionTypes from './actionTypes';
import axios from 'axios';

export const signupAuthSuccess = (idToken,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}


export const signupAuthFailure = (error) => {
    return {
        type: actionTypes.AUTH_FAILURE,
        error: error
    }
}

export const signupAuthStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authTimeOut = (expireTimeOut) => {
    return dispatch => setTimeout(() => {
        dispatch(authLogOut());
    },expireTimeOut*1000);
}

export const signupAuth = (email,password,isSignup) => {
    return dispatch => {
        dispatch(signupAuthStart());
        const req = { email:email, password:password, returnSecureToken:true};
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBnTQCb34k3AlCXuxHM-dAlmR-LUw7qkH4';
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBnTQCb34k3AlCXuxHM-dAlmR-LUw7qkH4';
        }
        axios.post(url,req).then(
            response => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime()+response.data.expiresIn*1000);
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('userId',response.data.localId);
                localStorage.setItem('expirationDate',expirationDate);
                dispatch(signupAuthSuccess(response.data.idToken,response.data.localId));
                dispatch(authTimeOut(response.data.expiresIn));
            }
        ).catch(
            err => {
                dispatch(signupAuthFailure(err.response.data.error));
            }
        );
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(authLogOut);
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()){
                dispatch(authLogOut);
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(signupAuthSuccess(token,userId));
                dispatch(authTimeOut((expirationDate.getTime()-new Date().getTime())/1000));
            }
        }
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}