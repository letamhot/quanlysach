import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import NumberFormat from 'react-number-format';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default class Cart extends Component{
  constructor(props){
    super(props)
    this.state = ({
      products : [],
      users: {},
      validationError: "",
      Id_delete: ""
    })
  }

  //Xóa sản phảm khỏi giỏ hàng
  deleteCart(){
    
    axios.delete('/api/cart/'+this.state.Id_delete).then(response =>{
              console.log(response);
              toast.success("Delete success", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
      this.setState({
        products:response.data.products
      })
    })
  }
  submit(id) {
    this.setState({
        Id_delete: id
    })
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.deleteCart()
        },
        {
          label: 'No',
          onClick: () => this.getCart()
        }
      ]
    });
};
//Load form cart
  getCart(){
    axios.get('/api/cart/getCart').then(response =>{
      console.log('getCart', response.data.user);
        this.setState({
          products:response.data.products,
          users:response.data.user
          
        })
    })
  }
//Update số lượng sản phẩm
  updateCart(id, qty){
    let data = {qty: document.getElementById('qty_' + id).value};
    console.log('dat', data);
    axios.post('/api/cart/updateCart/' + id, data).then((response) =>{
      toast.success("🦄Update quantity success", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        console.log('ud', response);
        
        this.setState({
          products:response.data.products
        })
    }).catch((e) =>{
      console.log('e' ,e);
      let validationError = this.state.validationError;
      validationError = e.response.data.err;
      console.log('val', validationError);
  
      toast.error('🦄🦄Quantity must not be greater than amount ', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });  
          this.setState({
              validationError: validationError
          });
  });
 
  }
  //Thông báo lỗi
  Error(err){
    let validationError = this.state.validationError;
    validationError = err;
    console.log('val', validationError);

    toast.error('🦄Error ', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });  
        this.setState({
            validationError: validationError
        });
}
//đặt hàng
orderCart(e){
  e.preventDefault();
  axios.post('/api/cart/orderCart', {address: this.state.users.address, phone: this.state.users.phone}).then(response=>{
    console.log('order', response.data);
    toast.success("Order success", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    this.setState({
      products: response.data.products,
      users: response.data.user,
    })
    this.getCart();

  }).catch((e) =>{
    console.log('e' ,e);
    let err = e.response.data.errors;
    let error = e.response.data.error;
    console.log('err', err);
    console.log('error', error);
    if(error){
      let validationError = this.state.validationError;
      validationError = error;
      console.log('val', validationError);
  
      toast.error('🦄The admin account has no right to order ', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });  
          this.setState({
              validationError: validationError
          });
    }
    if(err){
      this.Error(err);
    }
  });
    
}
  componentWillMount(){
    this.getCart();
    
}
//Dữ liệu có trong giỏ hàng
renderCart(){
  console.log('aaaa', this.props.isLogin);
  return this.state.products.map(product =>{
    let price = product.promotion_price != 0 ? product.promotion_price : product.price_input;
    let qty = product.pivot.qty;
      return(
        <tr className="text-center" key={product.id}>
          <td className="product-remove"><a title="Remove" onClick={this.submit.bind(this, product.id)}><span className="ion-ios-close" /></a></td>
          <td className="image-prod">
          <img style={{width:"290px", height:"325px"}} src={product.image} alt={product.name} />
          </td>
          <td className="product-name">
            <h3>{product.name}</h3>
            <p>{product.status == 1 ?(<label className="badge bg-green" style={{backgroundColor:"blue"}} >New</label>):(<label className="badge bg-gray" style={{backgroundColor:"red"}}>Old</label>)}</p>
          </td>
          <td className="price">
          <NumberFormat value={price} displayType={'text'} thousandSeparator={true} suffix={' VND'} />
          </td>
          <td className="quantity">
            <div className="input-group mb-3">
              <input id={'qty_' + product.id} type="text" name="quantity" className="quantity form-control input-number" defaultValue={qty} min={1} max={100} />
            </div>
          </td>
          <td className="total"> <NumberFormat value={price * qty} displayType={'text'} thousandSeparator={true} suffix={' VND'} /></td>
          <td className="product-update"><a title="Edit" onClick={this.updateCart.bind(this, product.id)}><span className="ion-ios-create" /></a></td>

        </tr>
      )
  })
  
}
    render() {
        let sum = this.state.products.reduce((total, product )=> {
        let price = product.promotion_price != 0 ? product.promotion_price : product.price_input;
        let qty = product.pivot.qty;
          return total+ price*qty;
        }, 0);

      return (
        <>
        <ToastContainer />
        <section className="ftco-section ftco-cart">
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
                    <tbody>
                      {this.renderCart()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="row justify-content-start">
              <div className="col col-lg-5 col-md-6 mt-5 cart-wrap">
                <div className="cart-total mb-3">
                  <h3>Cart Totals</h3>
                  <hr />
                  <p className="d-flex total-price">
                    <span>Total</span>
                      <span><NumberFormat value={sum} displayType={'text'} thousandSeparator={true} suffix={' VND'} /></span>
                  </p>
                  <p><a onClick={this.orderCart.bind(this)} className="btn btn-primary py-3 px-4">Place an order</a></p>

                </div>
              </div>
              {/* <div className="col col-lg-5 col-md-6 mt-5 cart-wrap">
                <div className="cart-detail bg-light p-3 p-md-4">
                    <h3 className="billing-heading mb-4">Payment Method</h3>
                    <div className="form-group">
                        <div className="col-md-12">
                            <div className="radio">
                            <label><input type="radio" name="optradio" className="mr-2" /> Direct Bank Tranfer</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-12">
                            <div className="radio">
                            <label><input type="radio" name="optradio" className="mr-2" /> Check Payment</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-12">
                            <div className="radio">
                            <label><input type="radio" name="optradio" className="mr-2" /> Paypal</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-12">
                            <div className="checkbox">
                            <label><input type="checkbox" defaultValue className="mr-2" /> I have read and accept the terms and conditions</label>
                            </div>
                        </div>
                    </div>
                    <p><a onClick={this.orderCart.bind(this)} className="btn btn-primary py-3 px-4">Place an order</a></p>
                </div>
              </div> */}
              <div className="col col-lg-5 col-md-6 mt-5 cart-wrap">
                <div className="heading">
                    <h3>What would you like to do next?</h3>
                    <p>Choose if you have a discount code or reward points you want to use or would like to estimate your
                        delivery cost.</p>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-buttons">
                        {/* Thêm thông tin địa chỉ khách hàng*/}
                      <h4>Shipping address:</h4>
                      <input name="address" className={this.state.validationError.address  ? "is-invalid form-control" : "form-control"} onChange={(e)=>{
                        let user = this.state.users;
                        user.address = e.target.value;
                        this.setState({users: user});
                       }} value={this.state.users.address ?? ""} required/>
                      <small className="invalid-feedback">{this.state.validationError.address ?? ""}</small>

                       <br />

                      <span />
                      {/* Thêm thông tin số điện thoại khách hàng*/}

                      <h4>Phone number(+84): </h4>
                      <input name="phone" className={this.state.validationError.phone  ? "is-invalid form-control" : "form-control"} onChange={(e)=>{
                        let user = this.state.users;
                        user.phone = e.target.value;
                        this.setState({users: user});}} value={this.state.users.phone ?? ""} required />
                      <small className="invalid-feedback">{this.state.validationError.phone ?? ""}</small>

                      <br />
                      <br />
                      <h4>Email:{this.state.users.email}</h4> <br />                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
      </>
      );
  }
};