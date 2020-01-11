import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckOutSummary.module.css';
import Button from '../../UI/Button/Button';

const CheckOutSummary = props => {

    return (
        <div className={classes.CheckOutSummary}>
            <div style={{width:'100%', margin: 'auto'}} >
            <p><strong>HAPPY BURGERRING</strong></p>
            <Burger ingredients={props.ingredients}/>
            <Button btnType='Success' clicked={props.confirm}>CONFIRM</Button>
            <Button btnType='Danger' clicked={props.cancel}>CANCEL</Button>
            </div>
        </div>
    );
}

export default CheckOutSummary;