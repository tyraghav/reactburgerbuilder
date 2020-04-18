const UpdateObject = (OldObject,UpdatedProperties) => {
    return{
        ...OldObject,
        ...UpdatedProperties
    }
}

export const isValidChecker = (myValue,rules) => {
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

export default UpdateObject;