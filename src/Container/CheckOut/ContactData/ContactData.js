import React , { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../Component/UI/Button/Button';
import Spinner from '../../../Component/UI/Spinner/Spinner';
import AxiosInstance from '../../../AxiosInstance';

class ContactData extends Component {
    state = {
        contact: {
            name: '',
            email: '',
            address: {
                street: '',
                zip: ''
            }
        },
        loading: false
    }

    placeOrderHandler = (event) => {
        event.preventDefault();
        const myOrder = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            contact: this.state.contact
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
        let form = (<form>
                        <h2>Enter your details below</h2>
                        <input className={classes.Input} type='name' placeholder='Your Name'/>
                        <input className={classes.Input} type='email' placeholder='Your Email'/>
                        <input className={classes.Input} type='text' placeholder='Your Street'/>
                        <input className={classes.Input} type='text' placeholder='Your Pincode'/>
                        <Button btnType='Success' clicked={this.placeOrderHandler}>PLACE ORDER</Button>
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