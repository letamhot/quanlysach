import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import '../../../../css/style.css';
import Section1 from "./Section1";
import NumberFormat from 'react-number-format';


export default class Section2 extends Component{
    render(){
        return(
            <section className="ftco-section ftco-no-pt ftco-no-pb">
                <div className="container">
                <div className="row no-gutters ftco-services">
                    <div className="col-lg-4 text-center d-flex align-self-stretch ftco-animate">
                    <div className="media block-6 services p-4 py-md-5">
                        <div className="icon d-flex justify-content-center align-items-center mb-4">
                        <span className="flaticon-bag" />
                        </div>
                        <div className="media-body">
                        <h3 className="heading">Free Shipping</h3>
                        <p>Ship COD Toàn Quốc</p>
                        </div>
                    </div>      
                    </div>
                    <div className="col-lg-4 text-center d-flex align-self-stretch ftco-animate">
                    <div className="media block-6 services p-4 py-md-5">
                        <div className="icon d-flex justify-content-center align-items-center mb-4">
                        <span className="flaticon-customer-service" />
                        </div>
                        <div className="media-body">
                        <h3 className="heading">Hỗ trợ khách hàng</h3>
                        <p>Mọi chi tiết xin liên hệ: 0949543496.</p>
                        </div>
                    </div>    
                    </div>
                    <div className="col-lg-4 text-center d-flex align-self-stretch ftco-animate">
                    <div className="media block-6 services p-4 py-md-5">
                        <div className="icon d-flex justify-content-center align-items-center mb-4">
                        <span className="flaticon-payment-security" />
                        </div>
                        <div className="media-body">
                        <h3 className="heading">Thanh toán</h3>
                        <p>Thanh toán trục tiếp hoặc chuyển khoản qua ngân hàng.</p>
                        </div>
                    </div>      
                    </div>
                </div>
                </div>
            </section>
        )
    }
}
        