import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import '../../../../css/style.css';
import NumberFormat from 'react-number-format';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class Section5 extends Component{
    constructor(){
        super()
        this.state =({
            products: {},
            category:"",
            producer:"",
          
        })
    }
    
    showProduct()
    {
        axios.get('api/cart/showProductPromotionPrice').then(response =>{
            // console.log('pro', response.data);
            this.setState({
                products:response.data,
                category:response.data.category,
                producer:response.data.producer
            })
        })
    }
    componentWillMount(){
        this.showProduct();
        
    }
    
    render(){
        return(
            <section className="ftco-section ftco-deal bg-primary">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={this.state.products.image} style={{width: "400px" ,height: "450px"}} className="img-fluid" alt={this.state.products.name} />
                        </div>
                        <div className="col-md-6">
                            <div className="heading-section heading-section-white">
                                <span className="subheading">Deal of the month</span>
                                <h2 className="mb-3">Deal of the month</h2>
                            </div>
                            <div id="timer" className="d-flex mb-4">
                                <div className="time" id="days" />
                                <div className="time pl-4" id="hours" />
                                <div className="time pl-4" id="minutes" />
                                <div className="time pl-4" id="seconds" />
                            </div>
                            <div className="text-deal">
                                <h2><a href={`/productDetail/${this.state.products.slug}`}>{this.state.products.name}</a></h2>
                                <p className="price">
                                    <span className="mr-2 price-dc">
                                        <NumberFormat value= {this.state.products.price_input} displayType={'text'} thousandSeparator={true} suffix={' VND'} />
                                   
                                    </span>
                                    <span className="price-sale">                                    
                                        <NumberFormat value={this.state.products.promotion_price} displayType={'text'} thousandSeparator={true} suffix={' VND'} />
                                    </span>
                                </p>
                                <ul className="thumb-deal d-flex mt-4">
                                <li>Category: {this.state.category.name}</li>
                                <li>Producer: {this.state.producer.name}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}