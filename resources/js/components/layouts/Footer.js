import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import '../../../../css/style.css';
import NumberFormat from 'react-number-format';


export default class Footer extends Component{
    render(){
        return(
            <footer className="ftco-footer ftco-section">
                <div className="container">
                    <div className="row">
                        <div className="mouse">
                        <a href="#" className="mouse-icon">
                            <div className="mouse-wheel"><span className="ion-ios-arrow-up" /></div>
                        </a>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md">
                        <div className="ftco-footer-widget mb-4">
                            <h2 className="ftco-heading-2">Book Shop</h2>
                            <p>Welcome to customers who have visited the shop</p>
                            <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                            <li className="ftco-animate"><a href="https://twitter.com/letamhot"><span className="icon-twitter" /></a></li>
                            <li className="ftco-animate"><a href="https://www.facebook.com/Letamhot/"><span className="icon-facebook" /></a></li>
                            <li className="ftco-animate"><a href="https://www.instagram.com/letamhot/"><span className="icon-instagram" /></a></li>
                            </ul>
                        </div>
                        </div>
                        <div className="col-md">
                        <div className="ftco-footer-widget mb-4 ml-md-5">
                            <h2 className="ftco-heading-2">Menu</h2>
                            <ul className="list-unstyled">
                            <li><a href="/shop" className="py-2 d-block">Shop</a></li>
                            <li><a href="/cart" className="py-2 d-block">Cart</a></li>
                            <li><a href="/order" className="py-2 d-block">Order</a></li>
                            </ul>
                        </div>
                        </div>
                        <div className="col-md-4">
                        <div className="ftco-footer-widget mb-4">
                            <h2 className="ftco-heading-2">Help</h2>
                            <div className="d-flex">
                            <ul className="list-unstyled mr-l-5 pr-l-3 mr-4">
                                <li><a href="#" className="py-2 d-block">Shipping Information</a></li>
                                <li><a href="#" className="py-2 d-block">Returns &amp; Exchange</a></li>
                                <li><a href="#" className="py-2 d-block">Terms &amp; Conditions</a></li>
                                <li><a href="#" className="py-2 d-block">Privacy Policy</a></li>
                            </ul>
                            <ul className="list-unstyled">
                                <li><a href="#" className="py-2 d-block">FAQs</a></li>
                                <li><a href="#" className="py-2 d-block">Contact</a></li>
                            </ul>
                            </div>
                        </div>
                        </div>
                        <div className="col-md">
                        <div className="ftco-footer-widget mb-4">
                            <h2 className="ftco-heading-2">Have a Questions?</h2>
                            <div className="block-23 mb-3">
                            <ul>
                                <li><span className="icon icon-map-marker" /><span className="text">73 Ton That Duong Ky, Hue city</span></li>
                                <li><a href="#"><span className="icon icon-phone" /><span className="text">0949543496</span></a></li>
                                <li><a href="#"><span className="icon icon-envelope" /><span className="text">letamhot@gmail.com</span></a></li>
                            </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                        <p>{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                            Copyright © All rights reserved | This template is made with <i className="icon-heart color-danger" aria-hidden="true" /> by <a href="/" target="_self">Shop Book</a>
                            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                        </p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}