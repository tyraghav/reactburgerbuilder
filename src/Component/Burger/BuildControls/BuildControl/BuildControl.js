import React from 'react';
import classes from './BuildControl.module.css';

const BuildControl = (props) => {
    console.log("HI"+props.label+props.disabledInfo);
    return <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.More} onClick={props.adder}>More</button>
        <button className={classes.Less} onClick={props.remover} disabled={props.disabledInfo}>Less</button>
    </div>;
}

export default BuildControl;