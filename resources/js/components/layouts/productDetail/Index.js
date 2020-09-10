import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar';
import ProductDetail from './ProductDetail';
import Section1 from '../shop/Section1';
import Favicon from 'react-favicon';

import Footer from '../Footer';
import Loader from '../Loader';
export default class Index extends Component{
    constructor(){
        super()
        this.state =({
            isLogin:false,
            isPermission: false
        })
        this.handlechangeLogin = this.handlechangeLogin.bind(this);
        this.handlechangePermission = this.handlechangePermission.bind(this);

    }
    handlechangeLogin(){
      this.setState({
          isLogin: !this.state.isLogin,
      });
              
      }
      handlechangePermission(e){
        this.setState({
            isPermission: e
        });
      }
    render(){
        return (
            
            <div>
                {/* <HeaderFE /> */}
                <Favicon url="https://image.flaticon.com/icons/svg/1259/1259767.svg" />
                <Navbar isLogin={this.handlechangeLogin} isPermission={this.handlechangePermission} />
                <Section1 />
                <ProductDetail isLogin={this.state.isLogin} />
                {/* <Section7 /> */}

                <Footer />
                <Loader />
            </div>
            
        );
    }
}

if (document.getElementById('productDetail')) {
    ReactDOM.render(<Index />, document.getElementById('productDetail'));
}