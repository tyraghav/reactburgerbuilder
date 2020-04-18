import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Auth.module.css';

import Input from '../../Component/UI/Input/Input';
import Button from '../../Component/UI/Button/Button';
import Spinner from '../../Component/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { isValidChecker } from '../../store/utility';

class Auth extends Component{
    state = {
        authForm : {
            email : {
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    placeholder : 'Your Email'
                },
                validation : {
                    required : true
                },
                valid : false,
                touched : false,
                value : ''
            },
            password : {
                elementType : 'input',
                elementConfig : {
                    type : 'password',
                    placeholder : 'Your Password'
                },
                validation : {
                    required : true,
                    minLength : 6
                },
                valid : false,
                touched : false,
                value : ''
            }
        },
        formIsValid : false,
        isSignUp : true
    }

    inputOnChangeHandler = (event,inputId) => {
        let myFormIsValid = true;
        const myForm = {...this.state.authForm};
        const inputEl = {...myForm[inputId]};
        inputEl.value = event.target.value;
        inputEl.touched = true;
        inputEl.valid = isValidChecker(inputEl.value,inputEl.validation);
        myForm[inputId] = inputEl;
        for(let inputId in myForm){
            myFormIsValid = myForm[inputId].valid && myFormIsValid;
        }
        this.setState({authForm : myForm , formIsValid: myFormIsValid});
    }

    switchButtonHandler = (event) => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onSignupAuth(this.state.authForm.email.value,this.state.authForm.password.value,this.state.isSignUp);
    }

    componentDidMount(){
        if(!this.props.building && this.props.authRedirectPath!=='/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.authForm){
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key]
            });
        }
        
        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }
        
        let form = (<div className={classes.Auth}>
                        {errorMessage}
                        <form onSubmit={this.onSubmitHandler}>
                            {formElementsArray.map(el => (
                                <Input elementType={el.config.elementType} key={el.id} elementConfig={el.config.elementConfig} value={el.config.value} invalid={!el.config.valid} touched={el.config.touched} change={(event) => this.inputOnChangeHandler(event,el.id)}/>
                            ))}
                            <Button btnType='Success' disabled={!this.state.formIsValid}>{this.state.isSignUp?'SIGN UP':'SIGN IN'}</Button>
                        </form>
                        <Button btnType='Danger' clicked={this.switchButtonHandler}>
                            SWITCH TO {this.state.isSignUp?'SIGN IN':'SIGN UP'}
                        </Button>
                    </div>);

        if(this.props.loading){
            form = <Spinner/>
        }

        if(this.props.isAuthenticated){
            form = <Redirect to={this.props.authRedirectPath}/>
        }

        return form;
    }
}

const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.idToken !== null,
        building : state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignupAuth : (email,password,isSignUp) => dispatch(actions.signupAuth(email,password,isSignUp)),
        onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);