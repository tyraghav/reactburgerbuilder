import React, { Component } from 'react';
import Aux from '../../HOC/Auxillary/Auxillary';
import Burger from '../../Component/Burger/Burger';

class BurgerBuilder extends Component{

    state = {
        ingredients : {
            cheese : 1,
            salad : 2,
            bacon : 3
        }
    }

    render(){
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}></Burger>
                <div>Build Controls</div>
            </Aux>
        );
    }
};

export default BurgerBuilder;