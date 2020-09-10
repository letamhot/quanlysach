import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import NumberFormat from 'react-number-format';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class ShowOrder extends Component{
    constructor(props){
        super(props)
        this.state =({
            products: [],
            

        })

    }
    //load form product
    loadProduct(){
        // console.log('href', location.href);
        let url = location.href.split('/').slice(-2).join('/');
        console.log('url' , url);
        axios.get('/api/cart/' +url).then(res => {
            // console.log('res', res);  
            this.setState({
                products:res.data.data
            });
                
        });

    }

    componentWillMount(){
        this.loadProduct();
        
    }
    render(){
        let bills = this.state.products.map((bill) =>{
            return(
                <tr key={bill.id}>
                    <td><a href={`/productDetail/${bill.slug}`}><img src={bill.image} style={{width:"100px", height:"100px"}} alt={bill.name} /></a><span>x {bill.quantity} </span></td>
                    <td><a href={`/productDetail/${bill.slug}`}>{bill.name}</a></td>
                    <td><NumberFormat value={bill.price} displayType={'text'} thousandSeparator={true} suffix={' VND'} /></td>

                </tr>
            )
        });
        // console.log('aaaa', this.props.isLogin);
            return(
                <div className="container">
                <br />
                <h2 className="text-left"> Thông tin đặt hàng: </h2>

                <div className="row">
                <div className="col-md-12">
                    <div className="cart-list">
                        <table className="table">
                        <thead className="thead-primary">
                            <tr className="text-center">
                                    <th>Ảnh minh họa(số sách)</th>
                                    <th>Tên sách</th>
                                    <th>Tổng tiền</th>
                                   
                            </tr> 
                        </thead>
                        <tbody>
                        {bills}
                            
                        </tbody>
                        </table>
                    </div>
                </div>
             </div>
             </div>
            )

       
        
    }
}

