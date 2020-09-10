import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import '../../../../css/style.css';
import NumberFormat from 'react-number-format';


export default class Section1 extends Component{
    render(){
        
        return(
            <section id="home-section" className="hero">
                <div className="home-slider owl-carousel">
                    <div className="slider-item js-fullheight">
                        <div className="overlay" />
                        <div className="container-fluid p-0">
                            <div className="row d-md-flex no-gutters slider-text align-items-center justify-content-end" data-scrollax-parent="true">
                                <img className="one-third order-md-last img-fluid" src="images/ttp.png" style={{width:"100%" , height:"100%"}} alt="" />
                                <div className="one-forth d-flex align-items-center ftco-animate" data-scrollax=" properties: { translateY: '70%' }">
                                    <div className="text">
                                        {/* <span className="subheading">#New Arrival</span> */}
                                        <div className="horizontal">
                                            <h1 className="mb-4 mt-3" style={{border: '3px solid red', color:'red', textAlign:"center", fontSize:'40px', fontFamily: 'Bookman, Tahoma, Verdana' }}>Trương Tam Phong Truyện</h1>
                                            <p><a href="/" className="btn-custom">Discover Now</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slider-item js-fullheight">
                        <div className="overlay" />
                        <div className="container-fluid p-0">
                            <div className="row d-flex no-gutters slider-text align-items-center justify-content-end" data-scrollax-parent="true">
                                <img className="one-third order-md-last img-fluid" src="images/yeu-anh-hon-ca-tu-than.png" style={{width:"100%", height:"100%"}} alt="" />
                                <div className="one-forth d-flex align-items-center ftco-animate" data-scrollax=" properties: { translateY: '70%' }">
                                    <div className="text">
                                        {/* <span className="subheading">#New Arrival</span> */}
                                        <div className="horizontal">
                                            <h1 className="mb-4 mt-3" style={{border: '3px solid red' ,color:'red', textAlign:"center", fontSize:'40px', fontFamily: 'Bookman, Tahoma, Verdana'}}>Yêu anh hơn cả tử thần</h1>
                                            <p><a href="/" className="btn-custom">Discover Now</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}