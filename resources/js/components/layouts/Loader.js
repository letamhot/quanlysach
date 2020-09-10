import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Input} from 'reactstrap';
import axios from 'axios';
// import '../../../../css/style.css';

export default class Loader extends Component{
    render(){
        return(
                <div id="ftco-loader" className="show fullscreen"><svg className="circular" width="48px" height="48px"><circle className="path-bg" cx={24} cy={24} r={22} fill="none" strokeWidth={4} stroke="#eeeeee" /><circle className="path" cx={24} cy={24} r={22} fill="none" strokeWidth={4} strokeMiterlimit={10} stroke="#F96D00" /></svg></div>
        );
    }
}