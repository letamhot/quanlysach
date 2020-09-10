import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar';
import Section1 from './Section1';
import Section2 from './Section2';
import Favicon from 'react-favicon';

import Footer from '../Footer';
import Loader from '../Loader';
export default class Index extends Component{
    render(){
        return (
            
            <div>
                <Favicon url="https://image.flaticon.com/icons/svg/1259/1259767.svg" />
                <Navbar />
                <Section1 />
                <Section2 />
                <Footer />
                <Loader />
            </div>
            
        );
    }
}

if (document.getElementById('shop')) {
    ReactDOM.render(<Index />, document.getElementById('shop'));
}