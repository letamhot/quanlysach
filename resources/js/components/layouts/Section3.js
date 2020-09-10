import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class Section3 extends Component{
    constructor(){
        super()
        this.state = {
            products: [],
            pagination: "",
            links: ""
        }
        this.loadHome = this.loadHome.bind(this);
        
    }
    addCart(id){
        let data = {product_id: id, qty: 1};
        // console.log('da', data);
        axios.post('/api/cart/addCart', data).then(reponse =>{
            // console.log('cart', reponse);
            toast.success("Create product success", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }).catch((e) =>{
            // console.log('e' ,e);
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
        });
    }
    //load form product
    loadHome(e = null){
        let param = new URLSearchParams(location.search);
        let page = param.get('page')|| 1;
        axios.get(`/api/home?page=${page}`).then((res) => {
           
            // console.log('products',res.data);  
            this.setState({
                products:res.data.data,
                pagination: res.data.meta,
                links: res.data.links
                
            });
                
        })
    }
    componentWillMount(){
        this.loadHome();
        
    }
    render(){
        let products = this.state.products.map((product) => {
            if(product.amount>0){
                 return(
                    <div key={product.id} className="col-sm-12 col-md-6 col-lg-4 mx-auto text-center">
                    <ToastContainer />

                	 <div className="product d-flex flex-column">
                        <a href={`/productDetail/${product.slug}`} className="img-prod"><img className="img-fluid" style={{width:"255px", height:"295px"}} src={product.image} alt="Colorlib Template" />
                        <div className="overlay" />
                        </a>
                        <div className="text py-3 pb-4 px-3">
                            <div className="d-flex">
                                <div className="cat">
                                <span>Category: {product.category.name}</span>
                                </div>
                            </div>
                            <h3><a href={`/productDetail/${this.state.products.slug}`} >{product.name}</a></h3>
                            <div className="pricing">
                                <p className="price">
                                <NumberFormat value={product.promotion_price != 0 ? product.promotion_price : product.price_input } displayType={'text'} thousandSeparator={true} suffix={' VND'} />

                                </p>
                            </div>

                            <p className="bottom-area d-flex px-3">
                                <a onClick={this.addCart.bind(this, product.id)} className="add-to-cart text-center py-2 mr-1"><span>Add to cart <i className="ion-ios-add ml-1" /></span></a>
                                <a href="/cart" className="buy-now text-center py-2">Buy now<span><i className="ion-ios-cart ml-1" /></span></a>
                            </p>
                        </div>
                    </div>
                </div>
                            
             
                );
            }else{
                return(
                    <div key={product.id} className="col-sm-12 col-md-6 col-lg-4 mx-auto text-center">
                	 <div className="product d-flex flex-column">
                        <a href={`/productDetail/${product.slug}`} className="img-prod"><img className="img-fluid" style={{width:"255px", height:"295px", opacity:"0.1"}} src={product.image} alt="Colorlib Template" />
                        <div className="overlay" />
                        </a>
                        <div className="text py-3 pb-4 px-3">
                            <div className="d-flex">
                                <div className="cat">
                                <span >Category: {product.category.name}</span>
                                </div>
                            </div>
                            <h3><a style={{opacity:"0.3",textDecoration:"line-through"}} href={`/productDetail/${this.state.products.slug}`} >{product.name}</a></h3>
                            <div className="pricing">
                                <p className="price">
                                <NumberFormat style={{opacity:"0.3", textDecoration:"line-through"}} value={product.promotion_price != 0 ? product.promotion_price : product.price_input } displayType={'text'} thousandSeparator={true} suffix={' VND'} />

                                </p>
                            </div>
                            <p className="bottom-area d-flex px-3">
                                <button className="btn btn-danger">Hết hàng</button>

                            </p>
                        </div>
                    </div>
                </div>
                            
             
                );
            }
           
            
        });
        return(
                <section className="ftco-section bg-light">
                    <div className="container">
                        <div className="row justify-content-center mb-3 pb-3">
                            <div className="col-md-12 heading-section text-center ftco-animate">
                            <h2 className="mb-4">Danh sách sản phẩm</h2>
                            <p>Xin hân hạnh được đón tiếp quý khách</p>
                            </div>
                        </div>   		
                    </div>
                    <div className="container">
                        <div className="row">
                            {products}
                        </div>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className={"page-item "+ (this.state.pagination.current_page == 1 ? "disabled":"")}>
                                <a className="page-link" href={this.state.links.first ? (this.state.links.first).replace('/api', ""):"#"} >
                                    First
                                </a>
                                </li>
                                <li className={"page-item "+ (this.state.pagination.current_page ==1 ? "disabled":"")}>
                                <a className="page-link" href={this.state.links.prev?(this.state.links.prev).replace('/api', ""):"#"} >
                                    Previous
                                </a>
                                </li>
                                <li className="page-item active">
                                <a className="page-link" href="#">
                                    {this.state.pagination.current_page}
                                </a>
                                </li>
                                <li className={"page-item " + (this.state.pagination.current_page == this.state.pagination.last_page ? "disabled":"")}>
                                <a className="page-link" href={this.state.links.next?(this.state.links.next).replace('/api', ""):"#"} >
                                    Next
                                </a>
                                </li>
                                <li className={"page-item "+ (this.state.pagination.current_page ==this.state.pagination.last_page ? "disabled":"")}>
                                <a className="page-link" href={this.state.links.last?(this.state.links.last).replace('/api', ""):"#"} >
                                    Last
                                </a>
                                </li>
                            </ul>
                        </nav>                            
                    </div>
                </section>


            );
        }
      }