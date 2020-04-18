import React from 'react';
import { configure, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from '../../Component/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />',() => {
    
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} ings = {{salad : 0}}/>);
    });

    it('Should render <BuildControls /> when recieving Ingredients', () => {
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});
