import React from 'react';
import classes from './Logo.module.css';
import imagesrc from '../../Asset/Images/burger-logo.png';

const Logo = props => (
    <div className={classes.Logo}>
        <img src={imagesrc} alt='Burger Logo'/>
    </div>
)
export default Logo;