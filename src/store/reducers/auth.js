import * as actions from '../actions/actionTypes';

const initialState = {
    idToken : null,
    userId : null,
    error : null,
    loading : false,
    authRedirectPath : '/'
}

const authReducer = (state=initialState,action) => {
    switch(action.type){
        case actions.AUTH_SUCCESS:
            return {
                ...state,
                idToken : action.idToken,
                userId : action.userId,
                loading: false
            }
        case actions.AUTH_FAILURE:
            return {
                ...state,
                error : action.error,
                loading: false
            }
        case actions.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case actions.AUTH_LOGOUT:
            return {
                ...state,
                loading: false,
                idToken: null,
                userId: null
            }
        case actions.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath: action.path
            }
        default:
            return state;
    }
}

export default authReducer;