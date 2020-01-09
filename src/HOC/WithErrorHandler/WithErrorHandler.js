import React, { Component } from 'react';
import Auxillary from '../Auxillary/Auxillary';
import Modal from '../../Component/UI/Modal/Modal';
import AxiosInstance from '../../AxiosInstance';

const WithErrorHandler = (WrappedComponent,axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res,err =>{
                this.setState({error:err});
            });
        }

        componentWillUnmount(){
            AxiosInstance.interceptors.request.eject(this.reqInterceptor);
            AxiosInstance.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error:null});
        }

        render(){
            return <Auxillary>
                <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>{this.state.error?this.state.error.message:null}</Modal>
                <WrappedComponent {...this.props}/>
            </Auxillary>
        }
    }
}

export default WithErrorHandler;