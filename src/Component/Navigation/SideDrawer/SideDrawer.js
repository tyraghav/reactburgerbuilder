import React from 'react';
import classes from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Auxillary from '../../../HOC/Auxillary/Auxillary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = props => {
    let sideDrawerClass = classes.SideDrawer;
    if(props.open === true){
        sideDrawerClass = sideDrawerClass+' '+classes.Open;
    } else {
        sideDrawerClass = sideDrawerClass+' '+classes.Close;
    }
    return (
    <Auxillary>
        <Backdrop show={props.open} clicked={props.clickedBackdrop}/>
        <div className={sideDrawerClass} onClick={props.clickedBackdrop}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems isAuthenticated={props.isAuthenticated}/>
            </nav>
        </div>
    </Auxillary>
    )
}

export default SideDrawer;