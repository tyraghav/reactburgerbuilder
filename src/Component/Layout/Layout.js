import React , { Component } from 'react';
import Auxillary from '../../HOC/Auxillary/Auxillary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        })
    }

    render() {
        return (
            <Auxillary>
                <Toolbar isAuthenticated={this.props.isAuthenticated} sideDrawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer isAuthenticated={this.props.isAuthenticated} open={this.state.showSideDrawer} clickedBackdrop={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxillary>
    );
}
} ;

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.idToken!==null
    }
}
export default connect(mapStateToProps)(Layout);