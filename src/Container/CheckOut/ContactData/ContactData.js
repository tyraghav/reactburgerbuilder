import React , { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../Component/UI/Button/Button';
import Spinner from '../../../Component/UI/Spinner/Spinner';
import AxiosInstance from '../../../AxiosInstance';
import Input from '../../../Component/UI/Input/Input';

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
                valid : false,
                touched : false,
                value : 'fastest'
            }
        },
        formIsValid : false
    }

    isValidChecker = (myValue,rules) => {
        let isValid = true;
        if(rules.required){
            isValid = myValue.trim()!=='' && isValid;
        }
        if(rules.minLength){
            isValid = myValue.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = myValue.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputOnChangeHandler = (event,inputId) => {
        let myFormIsValid = true;
        const myForm = {...this.state.orderForm};
        const inputEl = {...myForm[inputId]};
        inputEl.value = event.target.value;
        inputEl.touched = true;
        inputEl.valid = this.isValidChecker(inputEl.value,inputEl.validation);
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
            ingredients: this.props.ingredients,
            price: this.props.price,
            contact: this.state.contact,
            orderData: myOrderData
        }
        this.setState({loading: true});
        AxiosInstance.post('/Orders.json',myOrder)
            .then(Response => {
                this.setState({loading: false});
                this.props.history.push('/');
            }).catch(Error => {
                this.setState({loading:false});
            });
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

        if(this.state.loading){
            form = <Spinner/>
        }

        return (<div className={classes.ContactData}>
                    {form}
                </div>)
    }
}

export default ContactData;