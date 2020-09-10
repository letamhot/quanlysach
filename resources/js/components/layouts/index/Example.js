import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';
import Navbar from '../Navbar';
import Section from '../Section';
import Footer from '../Footer';
import Loader from '../Loader';
export default class Example extends Component{
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
            
            <>
                {/* <HeaderFE /> */}
                <Favicon url="https://image.flaticon.com/icons/svg/1259/1259767.svg" />
                <Navbar isLogin={this.handlechangeLogin} isPermission={this.handlechangePermission}/>
                <Section />
                <Footer />
                <Loader />
            </>
            
        );
    }
}

if (document.getElementById('layout')) {
    ReactDOM.render(<Example />, document.getElementById('layout'));
}
