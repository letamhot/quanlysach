import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import '../../../../css/style.css';
import NumberFormat from 'react-number-format';


export default class Section7 extends Component{
    render(){
        return(

            <div className="hero-wrap hero-bread" style={{backgroundImage: 'url("images/bg_6.jpg")'}}>
            <div className="container">
              <div className="row no-gutters slider-text align-items-center justify-content-center">
                <div className="col-md-9 ftco-animate text-center">
                  <p className="breadcrumbs"><span className="mr-2"><a href="index.html">Home</a></span> <span>Shop</span></p>
                  <h1 className="mb-0 bread">Shop</h1>
                </div>
              </div>
            </div>
          </div>
        )
    }
}