import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import '../../../../css/style.css';
import NumberFormat from 'react-number-format';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class ProductDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            products: {},
            category:"",
            producer:"",
            validationError:"",
            newProductModal: false,
            commentCreate:{
                user: "",
                product: "",
                comment: ""
            }
        }
        this.loadProduct = this.loadProduct.bind(this);
        
    }

    createComment(){
        let commentCreate =this.state.commentCreate;
        // debugger
      
        const url = '/api/comment';
        const formData = new FormData();
        formData.append('user_id', commentCreate.user);
        formData.append('product_id', commentCreate.product);
        formData.append('comment', commentCreate.amount);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config) // adđ product
    }

    //load form product
    loadProduct(){
        console.log('href', location.href);
        let url = location.href.split('/').slice(-2).join('/');
        // console.log('url' , url.slice(-2));
        axios.get('/api/' +url).then(res => {
            // console.log('res', res.data);  
            this.setState({
                products: res.data,
                category: res.data.category,
                producer: res.data.producer
            });
                
        });

    }
    //update số lượng sản phẩm
    updateCart(id, qty){
        let data = {qty: document.getElementById('qty_' + id).value};
        // console.log('dat', data);
        axios.post('/api/cart/updateCart/' + id, data).then((response) =>{
            // console.log(response);
            toast.success("🦄Update success", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }).catch((e) =>{
        //   console.log('esss' ,e.response.data);
          if(e.response.data.errors)
            {
                let validationError = this.state.validationError;
                validationError = e.response.data.errors;
                // console.log('val', validationError);
    
                toast.error('🦄You should login before buying ', {
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
            if(e.response.data.err)
            {
                let validationError = this.state.validationError;
                validationError = e.response.data.err;
                // console.log('val', validationError);
    
                toast.error('🦄Quantity must not be greater than amount ', {
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
         
      });
    }
    componentWillMount(){
        this.loadProduct();
        
    }

    render(){
        // console.log('aa', this.state);
      
      let product = this.state.products;
      {/*Kiểm tra số lượng sản phẩm còn hay không*/}
      if(product.amount >0){
          return(
            <section className="ftco-section">
                <ToastContainer />

                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-5 ">
                            <a href={product.image} className="image-popup prod-img-bg"><img src={product.image} className="img-fluid" width="540px" alt="Colorlib Template" /></a>
                        </div>
                        <div className="col-lg-6 product-details pl-md-5 ">
                            <h3>{product.name}</h3>
                            <div className="rating d-flex">
                            <p className="text-left mr-4">
                                <a href="#" className="mr-2">5.0</a>
                                <a href="#"><span className="ion-ios-star-outline" /></a>
                                <a href="#"><span className="ion-ios-star-outline" /></a>
                                <a href="#"><span className="ion-ios-star-outline" /></a>
                                <a href="#"><span className="ion-ios-star-outline" /></a>
                                <a href="#"><span className="ion-ios-star-outline" /></a>
                            </p>
                            <p className="text-left mr-4">
                                <a href="#" className="mr-2" style={{color: '#000'}}>100 <span style={{color: '#bbb'}}>Rating</span></a>
                            </p>
                            <p className="text-left">
                                <a href="#" className="mr-2" style={{color: '#000'}}>500 <span style={{color: '#bbb'}}>Sold</span></a>
                            </p>
                        </div>
                            <p className="price">
                            Giá: <NumberFormat value={product.promotion_price != 0 ? product.promotion_price : product.price_input } displayType={'text'} thousandSeparator={true} suffix={' VND'} />
                            </p>
                           
                            <p>Thể loại: {this.state.category.name}</p>
                            <p>Nhà phân phối: {this.state.producer.name}</p>

                            <div className="row mt-4">
                                <div className="w-100" />
                                <div className="input-group col-md-6 d-flex mb-3">
                                    {this.props.isLogin ?<>
                                    <input type="text" id={"qty_" + product.id} name="quantity" className={this.state.validationError ? "is-invalid quantity form-control input-number": "quantity form-control input-number"} defaultValue={1} min={1} max={product.amount} />
                                    <small className="invalid-feedback">{this.state.validationError ?? ""}</small></> : <input type="text" id={"qty_" + product.id} name="quantity" className= "quantity form-control input-number" defaultValue={1} min={1} max={product.amount} /> 
                                    }
                                </div>
                                <div className="w-100" />
                                <div className="col-md-12">
                                <p style={{color: '#000'}}>Số lượng: {product.amount} piece available</p>
                                </div>
                            </div>
                            <p><a onClick={this.updateCart.bind(this, product.id)} className="btn btn-black py-3 px-5 mr-2">Add to Cart</a><a href="/cart" className="btn btn-primary py-3 px-5">Buy now</a></p>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-12 nav-link-wrap">
                            <div className="nav nav-pills d-flex text-center" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a className="nav-link  active mr-lg-1" id="v-pills-1-tab" data-toggle="pill" href="#v-pills-1" role="tab" aria-controls="v-pills-1" aria-selected="true">Description</a>
                                <a className="nav-link  mr-lg-1" id="v-pills-2-tab" data-toggle="pill" href="#v-pills-2" role="tab" aria-controls="v-pills-2" aria-selected="false">Manufacturer</a>
                                <a className="nav-link " id="v-pills-3-tab" data-toggle="pill" href="#v-pills-3" role="tab" aria-controls="v-pills-3" aria-selected="false">Reviews</a>
                            </div>
                        </div>
                        <div className="col-md-12 tab-wrap">
                            <div className="tab-content bg-light" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-pills-1" role="tabpanel" aria-labelledby="day-1-tab">
                                <div className="p-4">
                                    <h3 className="mb-4">{product.name}</h3>
                                    <p>{product.description}</p>
                                </div>
                                </div>
                                <div className="tab-pane fade" id="v-pills-2" role="tabpanel" aria-labelledby="v-pills-day-2-tab">
                                    <div className="p-4">
                                        <h3 className="mb-4">Nhà phân phối: {this.state.producer.name}</h3>
                                        <p>Dịa chỉ:{this.state.producer.address}</p>
                                        <p>Số điện thoại: {this.state.producer.phone}</p>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="v-pills-3" role="tabpanel" aria-labelledby="v-pills-day-3-tab">
                                    <div className="row p-4">
                                        <div className="col-md-7">
                                            <h3 className="mb-4">23 Reviews</h3>
                                            <div className="mb-4">
                                                <textarea name="comment" id="comment" style={{width: '100%', height: '120px'}}></textarea>
                                                <br/>
                                                <button className="btn btn-info" style={{float:'right'}}>Comment</button>
                                            </div>
                                            <div className="review">
                                                <div className="user-img" style={{backgroundImage: 'url(images/person_1.jpg)'}} />
                                                <div className="desc">
                                                    <h4>
                                                        <span className="text-left">Jacob Webb</span>
                                                        <span className="text-right">14 March 2018</span>
                                                    </h4>
                                                    <p className="star">
                                                        <span>
                                                        <i className="ion-ios-star-outline" />
                                                        <i className="ion-ios-star-outline" />
                                                        <i className="ion-ios-star-outline" />
                                                        <i className="ion-ios-star-outline" />
                                                        <i className="ion-ios-star-outline" />
                                                        </span>
                                                        <span className="text-right"><a href="#" className="reply"><i className="icon-reply" /></a></span>
                                                    </p>
                                                    <p>When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrov</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="rating-wrap">
                                                <h3 className="mb-4">Give a Review</h3>
                                                <p className="star">
                                                <span>
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    (98%)
                                                </span>
                                                <span>20 Reviews</span>
                                                </p>
                                                <p className="star">
                                                <span>
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    (85%)
                                                </span>
                                                <span>10 Reviews</span>
                                                </p>
                                                <p className="star">
                                                <span>
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    (98%)
                                                </span>
                                                <span>5 Reviews</span>
                                                </p>
                                                <p className="star">
                                                <span>
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    (98%)
                                                </span>
                                                <span>0 Reviews</span>
                                                </p>
                                                <p className="star">
                                                <span>
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    <i className="ion-ios-star-outline" />
                                                    (98%)
                                                </span>
                                                <span>0 Reviews</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </section>
        )
      }else{
        return(
            <section className="ftco-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-5 ">
                            <a href={product.image} className="image-popup prod-img-bg"><img src={product.image} className="img-fluid" width="540px" style={{opacity: "0.1"}} alt="Colorlib Template" /></a>
                        </div>
                        <div className="col-lg-6 product-details pl-md-5 ">
                            <h3 style={{opacity: "0.3", textDecoration:"line-through"}}>{product.name}</h3>
                            <div className="rating d-flex">
                            <p className="text-left mr-4">
                                <a href="#" className="mr-2">5.0</a>
                                <a href="#"><span className="ion-ios-star-outline" /></a>
                                <a href="#"><span className="ion-ios-star-outline" /></a>
                                <a href="#"><span className="ion-ios-star-outline" /></a>
                                <a href="#"><span className="ion-ios-star-outline" /></a>
                                <a href="#"><span className="ion-ios-star-outline" /></a>
                            </p>
                            <p className="text-left mr-4">
                                <a href="#" className="mr-2" style={{color: '#000'}}>100 <span style={{color: '#bbb'}}>Rating</span></a>
                            </p>
                            <p className="text-left">
                                <a href="#" className="mr-2" style={{color: '#000'}}>500 <span style={{color: '#bbb'}}>Sold</span></a>
                            </p>
                        </div>
                            <p className="price">
                            Giá: <NumberFormat style={{opacity:"0.3", textDecoration:"line-through"}} value={product.promotion_price != 0 ? product.promotion_price : product.price_input } displayType={'text'} thousandSeparator={true} suffix={' VND'} />
                            </p>
                           
                            <p>Thể loại: {this.state.category.name}</p>
                            <p>Nhà phân phối: {this.state.producer.name}</p>
                            <p >
                                Trạng thái: 
                                <span style={{backgroundColor: "red", borderRadius:"20px", border: "2px solid black", color: "white" , fontSize: "30px" , fontWeight: "bold" , maxWidth: "230px", textAlign:"center"}}>Hết hàng</span>

                            </p>
                            </div>
                    </div>
                    <div className="row mt-5">
                <div className="col-md-12 nav-link-wrap">
                <div className="nav nav-pills d-flex text-center" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link  active mr-lg-1" id="v-pills-1-tab" data-toggle="pill" href="#v-pills-1" role="tab" aria-controls="v-pills-1" aria-selected="true">Description</a>
                    <a className="nav-link  mr-lg-1" id="v-pills-2-tab" data-toggle="pill" href="#v-pills-2" role="tab" aria-controls="v-pills-2" aria-selected="false">Manufacturer</a>
                    <a className="nav-link " id="v-pills-3-tab" data-toggle="pill" href="#v-pills-3" role="tab" aria-controls="v-pills-3" aria-selected="false">Reviews</a>
                </div>
                </div>
                <div className="col-md-12 tab-wrap">
                <div className="tab-content bg-light" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-1" role="tabpanel" aria-labelledby="day-1-tab">
                    <div className="p-4">
                        <h3 className="mb-4">{product.name}</h3>
                        <p>{product.description}</p>
                    </div>
                    </div>
                    <div className="tab-pane fade" id="v-pills-2" role="tabpanel" aria-labelledby="v-pills-day-2-tab">
                        <div className="p-4">
                            <h3 className="mb-4">Nhà phân phối: {this.state.producer.name}</h3>
                            <p>Dịa chỉ:{this.state.producer.address}</p>
                            <p>Số điện thoại: {this.state.producer.phone}</p>
                        </div>
                    </div>

                    <div className="tab-pane fade" id="v-pills-3" role="tabpanel" aria-labelledby="v-pills-day-3-tab">
                        <div className="row p-4">
                        <div className="col-md-7">
                        <h3 className="mb-4">23 Reviews</h3>
                        <div className="review">
                            <div className="user-img" style={{backgroundImage: 'url(images/person_1.jpg)'}} />
                            <div className="desc">
                            <h4>
                                <span className="text-left">Jacob Webb</span>
                                <span className="text-right">14 March 2018</span>
                            </h4>
                            <p className="star">
                                <span>
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                </span>
                                <span className="text-right"><a href="#" className="reply"><i className="icon-reply" /></a></span>
                            </p>
                            <p>When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrov</p>
                            </div>
                        </div>
                        <div className="review">
                            <div className="user-img" style={{backgroundImage: 'url(images/person_2.jpg)'}} />
                            <div className="desc">
                            <h4>
                                <span className="text-left">Jacob Webb</span>
                                <span className="text-right">14 March 2018</span>
                            </h4>
                            <p className="star">
                                <span>
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                </span>
                                <span className="text-right"><a href="#" className="reply"><i className="icon-reply" /></a></span>
                            </p>
                            <p>When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrov</p>
                            </div>
                        </div>
                        <div className="review">
                            <div className="user-img" style={{backgroundImage: 'url(images/person_3.jpg)'}} />
                            <div className="desc">
                            <h4>
                                <span className="text-left">Jacob Webb</span>
                                <span className="text-right">14 March 2018</span>
                            </h4>
                            <p className="star">
                                <span>
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                </span>
                                <span className="text-right"><a href="#" className="reply"><i className="icon-reply" /></a></span>
                            </p>
                            <p>When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrov</p>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-4">
                        <div className="rating-wrap">
                            <h3 className="mb-4">Give a Review</h3>
                            <p className="star">
                            <span>
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                (98%)
                            </span>
                            <span>20 Reviews</span>
                            </p>
                            <p className="star">
                            <span>
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                (85%)
                            </span>
                            <span>10 Reviews</span>
                            </p>
                            <p className="star">
                            <span>
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                (98%)
                            </span>
                            <span>5 Reviews</span>
                            </p>
                            <p className="star">
                            <span>
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                (98%)
                            </span>
                            <span>0 Reviews</span>
                            </p>
                            <p className="star">
                            <span>
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                <i className="ion-ios-star-outline" />
                                (98%)
                            </span>
                            <span>0 Reviews</span>
                            </p>
                        </div>
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
}