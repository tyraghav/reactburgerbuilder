import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem linkUrl='/' exact>BURGER BUILDER</NavigationItem>
        {props.isAuthenticated?<NavigationItem linkUrl='/orders'>ORDERS</NavigationItem>:null}
        {props.isAuthenticated?<NavigationItem linkUrl='/logout'>LOGOUT</NavigationItem>:<NavigationItem linkUrl='/auth'>AUTHENTICATE</NavigationItem>}
    </ul>
)

export default NavigationItems;