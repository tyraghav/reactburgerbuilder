import React , { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.module.css';
import Button from '../../../Component/UI/Button/Button';
import Spinner from '../../../Component/UI/Spinner/Spinner';
import AxiosInstance from '../../../AxiosInstance';
import Input from '../../../Component/UI/Input/Input';
import * as actions from '../../../store/actions/index';
import WithErrorHandler from '../../../HOC/WithErrorHandler/WithErrorHandler';
import { isValidChecker } from '../../../store/utility';

class ContactData extends Component {
    /*state = {
        contact: {
            name: '',
            email: '',
            address: {
                street: '',
                zip: ''
            }
        },
        loading: false
    }*/
    state = {
        orderForm : {
            name : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your Name'
                },
                validation : {
                    required : true
                },
                valid : false,
                touched : false,
                value : ''
            },
            street : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your Street'
                },
                validation : {
                    required : true
                },
                valid : false,
                touched : false,
                value : ''
            },
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
            country : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your Country'
                },
                validation : {
                    required : true
                },
                valid : false,
                touched : false,
                value : ''
            },
            zip : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Pin Code'
                },
                validation : {
                    required : true
                },
                valid : false,
                touched : false,
                value : ''
            },
            deliveryMethod : {
                elementType : 'select',
                elementConfig : {
                    options : [
                        { value: 'fastest', displayValue: 'fastest'},
                        { value: 'cheapest', displayValue: 'cheapest'}
                    ]
                },
                validation : {
                    required : true
                },
                valid : true,
                touched : true,
                value : 'fastest'
            }
        },
        formIsValid : false
    }


    inputOnChangeHandler = (event,inputId) => {
        let myFormIsValid = true;
        const myForm = {...this.state.orderForm};
        const inputEl = {...myForm[inputId]};
        inputEl.value = event.target.value;
        inputEl.touched = true;
        inputEl.valid = isValidChecker(inputEl.value,inputEl.validation);
        myForm[inputId] = inputEl;
        for(let inputId in myForm){
            myFormIsValid = myForm[inputId].valid && myFormIsValid;
        }
        this.setState({orderForm : myForm , formIsValid: myFormIsValid});
    }

    placeOrderHandler = (event) => {
        event.preventDefault();
        const myOrderData = {}
        for (let formIdele in this.state.orderForm){
            myOrderData[formIdele] = this.state.orderForm[formIdele].value;
        }
        const myOrder = {
            ingredients: this.props.ings,
            price: this.props.price,
            contact: this.state.contact,
            orderData: myOrderData,
            userId: this.props.userId
        };
        console.log(myOrder);
        this.props.onOrderBurger(myOrder,this.props.token);
    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (<form onSubmit={this.placeOrderHandler}>
                        <h2>Enter your details below</h2>
                        {formElementsArray.map(el => (
                            <Input elementType={el.config.elementType} key={el.id} elementConfig={el.config.elementConfig} value={el.config.value} invalid={!el.config.valid} touched={el.config.touched} change={(event) => this.inputOnChangeHandler(event,el.id)}/>
                        ))}
                        <Button btnType='Success' disabled={!this.state.formIsValid}>PLACE ORDER</Button>
                    </form>);

        if(this.props.loading){
            form = <Spinner/>
        }

        return (<div className={classes.ContactData}>
                    {form}
                </div>)
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(ContactData,AxiosInstance));