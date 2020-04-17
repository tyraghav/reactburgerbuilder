import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
class LogOut extends Component {
    
    componentWillMount(){
        this.props.doLogOut();
    }

    render(){
        return <Redirect to='/'/>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        doLogOut: () => dispatch(actions.authLogOut())
    }
}

export default connect(null,mapDispatchToProps)(LogOut);