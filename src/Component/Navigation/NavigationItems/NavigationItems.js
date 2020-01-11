import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem linkUrl='/' exact>BURGER BUILDER</NavigationItem>
        <NavigationItem linkUrl='/orders'>ORDERS</NavigationItem>
    </ul>
)

export default NavigationItems;