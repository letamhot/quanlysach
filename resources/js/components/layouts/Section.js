import React, {Component} from 'react';
import Section1 from "./index/Section1";
import Section2 from "./index/Section2";
import Section3 from "./Section3";
import Section5 from "./index/Section5";
import Section6 from "./index/Section6";


export default class Section extends Component{
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
            <Section1 />
            <Section2 />
            <Section3 isLogin={this.state.isLogin} />
            <Section5 />
            <Section6 />
        </>
      );
    }
  }