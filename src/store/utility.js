const UpdateObject = (OldObject,UpdatedProperties) => {
    return{
        ...OldObject,
        ...UpdatedProperties
    }
}

export default UpdateObject;