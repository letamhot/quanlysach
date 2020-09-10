import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar';
import Section1 from '../shop/Section1';
import Cart from './Cart';
import Favicon from 'react-favicon';


import Footer from '../Footer';
import Loader from '../Loader';
export default class Index extends Component{
    constructor(){
        super()
        this.state =({
            isLogin:false,
            isPermission: false,
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
            
            <div>
                <Favicon url="https://image.flaticon.com/icons/svg/1259/1259767.svg" />
                <Navbar isLogin={this.handlechangeLogin} isPermission={this.handlechangePermission}  />
                <Section1 />
                {this.state.isLogin ?  <Cart  /> : 
                    <div className="container">
                        <br />
                        <h2 className="text-left"> Giỏ Hàng: </h2>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="cart-list">
                                    <table className="table">
                                        <thead className="thead-primary">
                                        <tr className="text-center">
                                            <th>&nbsp;</th>
                                            <th>&nbsp;</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Update</th>
                                        </tr>
                                        </thead>
                                        <tbody >
                                            <tr >
                                                <td colSpan={7} className="text-center">Không có dữ liệu</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                <Footer />
                <Loader />
            </div>
            
        );
    }
}

if (document.getElementById('cart')) {
    ReactDOM.render(<Index />, document.getElementById('cart'));
}