import React from 'react';
import classes from './Input.module.css';

const Input = props => { 
let inputElement = null;
let inputElementClass = classes.InputElement;
if(props.invalid && props.touched){
    inputElementClass = inputElementClass + ' ' + classes.Invalid;
}

switch(props.elementType){
    case('input'):
        inputElement=<input className={inputElementClass} {...props.elementConfig} onChange={props.change}/>
        break;
    case('textarea'):
        inputElement=<textarea className={inputElementClass} {...props.elementConfig} onChange={props.change}/>
        break;
    case('select'):
        inputElement=<select className={inputElementClass} {...props.elementConfig} onChange={props.change}>
            {props.elementConfig.options.map(optEl => <option value={optEl.value} key={optEl.value}>{optEl.displayValue}</option>)}
        </select>
        break;
    default:
        inputElement=<input className={inputElementClass} {...props.elementConfig} onChange={props.change}/>
        break;
}

return (
<div className={classes.Input}>
    <label className={classes.Label}>{props.label}</label>
    {inputElement}
</div>);
}

export default Input;