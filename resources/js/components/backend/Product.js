import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Form} from 'reactstrap';
import axios, { post } from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NumberFormat from 'react-number-format';
import Title from 'reactjs-title';
import Favicon from 'react-favicon';



import '../../../css/style.css';
import ModalshowProduct from "./ModalshowProduct";
import jQuery from 'jquery';
import { isString } from 'lodash';
window.$= window.jQuery=jQuery;

export default class Product extends Component{
    constructor(props){
        super(props)
        this.initialProduct = {
            name:"",
            category: 1,
            producer: 1,
            amount:"",
            image:"",
            price_input:"",
            promotion_price:"",
            status:"",
            description:"",
            nameError: "",
            amountError:"",
            price_inputError:"",
            promotion_priceError:"",
            descriptionError:""
        };
        this.state = {
            editProductModal: false,
            showProduct: false,
            products: [],
            category: "",
            categories: [],
            producer: "",
            producers: [],
            validationError: "",
            pagination: "",
            links: "",
            isChecked: true,
            description:"",
            newProductModal:false,
            dataCreate: this.initialProduct, 
            dataUpdate:{
                id:"",
                name:"",
                category:"",
                producer:"",
                amount:"",
                image:"",
                price_input:"",
                promotion_price:"",
                status:"",
                description:""
            },
            Id_delete: ""
           
        }
        this.addProduct = this.addProduct.bind(this);
        this.fileUploadCreate = this.fileUploadCreate.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeProducer = this.onChangeProducer.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice_input = this.onChangePrice_input.bind(this);
        this.onChangePromotion_price = this.onChangePromotion_price.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.loadProduct = this.loadProduct.bind(this);
        this.Prev = this.Prev.bind(this);
    }
    
    //load form 
    loadProduct(e = null){
        axios.get('/api/product'+(e ? ('?search='+ e.target.value): "" )).then((response) => {
            console.log(response);
            this.setState({
                showProduct: false,
                products:response.data.data, // dataCreate  //
                pagination: response.data.meta,
                links: response.data.links,
            })

        })

    }
    loadCategory(){
        axios.get('/api/category').then(response => {
            this.setState({
                categories : response.data.data,
                dataCreate: {
                    ...this.state.dataCreate, category: response.data.data[0].id
                }
            })

        })
    }
    loadProducer(){
        axios.get('/api/producer').then(response => {

            this.setState({
                producers : response.data.data,
                dataCreate: {
                    ...this.state.dataCreate, producer: response.data.data[0].id
                }
            })
        })
    }

    //Phân trang
    Prev(e){
        e.preventDefault();
        axios.get(e.target.href).then((response) => {
            this.setState({
                showProduct: false,
                products:response.data.data,
                pagination: response.data.meta,
                links: response.data.links,
            })

        })
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({pagination: pageNumber});
    }

    
    //Create product
    fileUploadCreate(e)
    {
        let dataCreate =this.state.dataCreate;
        // debugger
      
        const url = '/api/product';
        const formData = new FormData();
        formData.append('name', dataCreate.name);
        formData.append('categories_id', dataCreate.category);
        formData.append('producer_id', dataCreate.producer);
        formData.append('amount', dataCreate.amount);
        formData.append('image', dataCreate.image);
        formData.append('price_input', dataCreate.price_input);
        formData.append('promotion_price', dataCreate.promotion_price);
        formData.append('description', dataCreate.description);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config) // adđ product
    } 
    addProduct(e){
        e.preventDefault();
        this.fileUploadCreate(this.state.dataCreate.image).then((response)=>{
            // console.log(response);
        toast.success("🦄Create success", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        // debugger
        const { data } = response;
        
       
            // products.push(response.data);
              
                this.setState(old => {
                    old.products.push(data);

                    return {
                        products :old.products,
                        newProductModal:false,
                        showProduct: false,
                        dataCreate: this.initialProduct
                    }
                    
               
            })
            
        }).catch(e=>{
            let err = e.response.data.errors;
            this.productError(err);
        })
       
    }
    toggleNewProductModal(){
        // debugger
        this.setState({
            newProductModal:!this.state.newProductModal,
            showProduct: false,
            
        })
        
    }

    //lỗi
    productError(err){
        // console.log(err);
        let validationError = this.state.validationError;
        validationError = err;
        toast.error('🦄 Error ', {
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

    //update product
    editProduct(product){
        // console.log(product);
        this.setState({
            validationError: "",
            dataUpdate:{
                
                id: product.id,
                name: product.name,
                category: product.category.id,
                producer: product.producer.id,
                amount:product.amount,
                image: product.image,
                price_input: product.price_input,
                promotion_price: product.promotion_price,
                status: product.status,
                description: product.description
            },
               
        editProductModal:true,
        isChecked: product.status == 1 ? true : false,
        editProductModal:!this.state.editProductModal
        
    })
    }
    updateProduct(e){
        e.preventDefault();
        let dataUpdate= this.state.dataUpdate;

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const formData = new FormData();
        formData.append('_method', "put");
        formData.append('name', dataUpdate.name);
        formData.append('categories_id', dataUpdate.category);
        formData.append('producer_id', dataUpdate.producer);
        formData.append('amount', dataUpdate.amount);
        !isString(dataUpdate.image)? formData.append('image', dataUpdate.image ): null ;
        formData.append('price_input', dataUpdate.price_input);
        formData.append('promotion_price', dataUpdate.promotion_price);
        formData.append('status', dataUpdate.status);
        formData.append('description', dataUpdate.description);
        axios.post('/api/product/'+ dataUpdate.id,formData,config).then((response) =>{
            console.log(response);
            toast.success("Update success", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                const { data } = response;
                this.setState(old => {
                    let id = old.products.findIndex(i => i.id == data.id);
                    old.products[id] = data;
                    return {
                        products :old.products,
                        editProductModal:false,
                        showProduct: false,
                    }
                    
            })
               
        }).catch(e=>{
            let err = e.response.data.errors;
            this.productError(err);
        })
    }
    toggleEditProductModal(){
        this.setState({
            editProductModal:!this.state.editProductModal,
            showProduct: false,
        })
    }

    //delete product
    deleteProduct(){
        axios.delete('/api/product/'+this.state.Id_delete).then((response)=>{
            toast.success("Delete success", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            this.loadProduct()
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
              onClick: () => this.deleteProduct(), showProduct: false,

            },
            {
              label: 'No',
              onClick: () => this.loadProduct()
            }
          ]
        });
    };
   

    //Create-Update data
    onChangeName(e){
        if(this.state.editProductModal){
            // var dataUpdate = this.state.dataUpdate;
            this.setState({
                dataUpdate: {...this.state.dataUpdate, name: e.target.value }
            })

        }else{
            this.setState({
                dataCreate:{...this.state.dataCreate, name: e.target.value }
            })
        }
    }
    onChangeCategory(e){
        if(this.state.editProductModal){
            // var dataUpdate = this.state.dataUpdate;
            this.setState({
                dataUpdate: {...this.state.dataUpdate, category: e.target.value }
            })

        }else{
            this.setState({
                dataCreate:{...this.state.dataCreate, category: e.target.value }
            })
        }
    }
    onChangeProducer(e){
        if(this.state.editProductModal){
            // var dataUpdate = this.state.dataUpdate;
            this.setState({
                dataUpdate: {...this.state.dataUpdate, producer: e.target.value }
            })

        }else{
            this.setState({
                dataCreate:{...this.state.dataCreate, producer: e.target.value }
            })
        }
    }

    onChangeAmount(e){
        if(this.state.editProductModal){
            this.setState({
                dataUpdate:
                    {...this.state.dataUpdate,  amount: e.target.value }
                    
            })
        }else{
            this.setState({
                dataCreate:{...this.state.dataCreate,  amount: e.target.value }
            })
        }
    }

    onChangePrice_input(e){
        if(this.state.editProductModal){
            this.setState({
                dataUpdate:{...this.state.dataUpdate,  price_input: e.target.value }
                    
            })
        }else{
            this.setState({
                dataCreate:{...this.state.dataCreate,  price_input: e.target.value }
            })
        }
    }

    onChangePromotion_price(e){
        if(this.state.editProductModal){
            this.setState({
                dataUpdate:{...this.state.dataUpdate,  promotion_price: e.target.value }
                   
            })
        }else{
            this.setState({
                dataCreate:{...this.state.dataCreate,  promotion_price: e.target.value }
            })
        }
    }
    onChangeDescription(e){
        // console.log(e);
        if(this.state.editProductModal){
            this.setState({
                dataUpdate:{...this.state.dataUpdate, description: e.target.value }
                   
            })
        }else{
            this.setState({
                dataCreate:{...this.state.dataCreate, description: e.target.value }
            })
        }
    }
    onChangeImage(e){
        if(this.state.editProductModal){        
            const reader = new FileReader();
            var conn = this;
            reader.addEventListener("load", function () {
                // convert image file to base64 string
                conn.setState({
                    imageReview: reader.result
                });
            }, false);

                reader.readAsDataURL(e.target.files[0]);
            this.setState({
                dataUpdate:{...this.state.dataUpdate, image: e.target.files[0] }
                   
            })
        }else{
            this.setState({
                dataCreate:{...this.state.dataCreate, image: e.target.files[0] }
            })
        }
    }

    //chạy form
    componentWillMount(){
        this.loadProduct();
        this.loadCategory();
        this.loadProducer();
        
    }
    
    //show modal description
    ModalshowProduct(description){
        this.setState({
            showProduct:true,
            description:description
        })
    }
   
    

    render()
    {  
        // let user = JSON.parse(localStorage.getItem('userInfo'));
        if(this.props.isPermission){
        let products = this.state.products.map((product) => {
            // { }
            return(
                <tr key={product.id}>
                    <td>{product.name}{product.status == 1 ?(<Label className="badge bg-green" style={{backgroundColor:"blue"}} >New</Label>):(<Label className="badge bg-gray" style={{backgroundColor:"red"}}>Old</Label>)}</td>
                    <td>{product.category?.name}</td>
                    <td>{product.producer?.name}</td>
                    <td><NumberFormat value={product.amount} displayType={'text'} thousandSeparator={true} suffix={' Cuốn'} /></td>
                    <td><img src={product.image} width="100px" height="100px"/></td>
                    <td><NumberFormat value={product.price_input} displayType={'text'} thousandSeparator={true} suffix={' VND'} /></td>
                    <td><NumberFormat value={product.promotion_price} displayType={'text'} thousandSeparator={true} suffix={' VND'} /></td>
                    <td><Button onClick={this.ModalshowProduct.bind(this, product.description)} 
                    color="info" size="sm">Detail</Button></td>
                    <td>
                        <Button color="success" size="sm" 
                        onClick={this.editProduct.bind(this, product)}>Edit</Button>
                        <Button color="danger" size="sm" onClick={this.submit.bind(this, product.id)}>Delete</Button>
                    </td>
                </tr>
            )
        })
        return (
            
            <div className="App">
                <Favicon url="https://image.flaticon.com/icons/svg/1259/1259767.svg" />

                <Title render="Product"/>
                <ModalshowProduct description={this.state.description} showModal={this.state.showProduct} />
                <ToastContainer />
                {/* Form Modal Create*/}
               
                    <Modal isOpen={this.state.newProductModal} toggle={this.toggleNewProductModal.bind(this)} >
                    <Form onSubmit={this.addProduct.bind(this)} as='form'>
                        <ModalHeader toggle={this.toggleNewProductModal.bind(this)}>Modal title</ModalHeader>
                        <ModalBody>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input name="name" id="name" className={this.state.validationError.name ?? false ? "is-invalid" : ""}
                                    value={this.state.dataCreate.name ?? ""}
                                    onChange={this.onChangeName}></Input>
                                    <small className="invalid-feedback">{this.state.validationError.name ?? ""}</small>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="category">Category</Label>
                                    <Input type="select" name="category" id="category" value={this.state.dataCreate.category} onChange={this.onChangeCategory}>
                    
                                    {this.state.categories.map(categories => (
                                            <option
                                            key={categories.id}
                                            value={categories.id}
                                            >
                                            {categories.name}
                                            </option>
                                        ))}
                                    </Input>

                                </FormGroup>
                                <FormGroup>
                                    <Label for="producer">Producer</Label>
                                    <Input type="select" name="producer" id="producer"value={this.state.dataCreate.producer ?? ""} onChange={this.onChangeProducer}>
                                    {this.state.producers.map(producers => (
                
                                            <option
                                            key={producers.id}
                                            value={producers.id}
                                            >
                                            {producers.name}
                                            </option>
                                        ))}

                                    </Input>

                                </FormGroup>
                                <FormGroup>
                                    <Label for="amount">Amount</Label>
                                    <Input type="number" name="amount" id="amount" className={this.state.validationError.amount ?? false ? "is-invalid" : ""}
                                    value={this.state.dataCreate.amount ?? ""}
                                    onChange={this.onChangeAmount}></Input>
                                    <small className="invalid-feedback">{this.state.validationError.amount ?? ""}</small>


                                </FormGroup>
                                <FormGroup>
                                    <Label for="image">Image</Label>
                                    <Input name="image" type="file"
                                    onChange={this.onChangeImage}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="price_input">Price_input</Label>
                                    <Input type="number" name="price_input" id="price_input" className={this.state.validationError.price_input ?? false ? "is-invalid" : ""}
                                    value={this.state.dataCreate.price_input ?? ""}
                                    onChange={this.onChangePrice_input}></Input>
                                    <small className="invalid-feedback">{this.state.validationError.price_input ?? ""}</small>

                                </FormGroup>
                                <FormGroup>
                                    <Label for="promotion_price">Promotion_price</Label>
                                    <Input type="number" name="promotion_price" id="promotion_price" className={this.state.validationError.promotion_price ?? false ? "is-invalid" : ""}
                                    value={this.state.dataCreate.promotion_price ?? ""}
                                    onChange={this.onChangePromotion_price}></Input>
                                    <small className="invalid-feedback">{this.state.validationError.promotion_price ?? ""}</small>

                                </FormGroup>
                                <FormGroup >
                                    <Label for="description">Description</Label>
                                    <textarea  type="text" name="description" id="description" className={this.state.validationError.description ?? false ? "is-invalid form-control" : "form-control"}
                                    value={this.state.dataCreate.description ?? ""}
                                    onChange={this.onChangeDescription}></textarea>
                                    <small className="invalid-feedback">{this.state.validationError.description ?? ""}</small>

                                </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" type="submit">Add</Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewProductModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                        </Form>
                    </Modal>
                

                {/* Form Modal Update*/}
               
                <Modal isOpen={this.state.editProductModal} toggle={this.toggleEditProductModal.bind(this)} >
                <Form  onSubmit={this.updateProduct.bind(this)} as="form">
                    <ModalHeader toggle={this.toggleEditProductModal.bind(this)}>Modal title</ModalHeader>
                    <ModalBody>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input name="name" id="name" className={this.state.validationError.name ?? false ? "is-invalid" : ""}
                                value={ this.state.dataUpdate.name}
                                onChange={this.onChangeName}></Input>
                                <small className="invalid-feedback">{this.state.validationError.name ?? ""}</small>

                            </FormGroup>
                            <FormGroup>
                                <Label for="category">Category</Label>
                                <Input type="select" name="category" id="category" value={this.state.dataUpdate.category} onChange={this.onChangeCategory} 
                            >                                
                                   { this.state.categories.map(categories => (
                                        <option
                                        key={categories.id}
                                        value={categories.id}
                                       >
                                        {categories.name}
                                        </option>
                                    ))}

                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="producer">Producer</Label>
                                <Input type="select" name="producer" id="producer"value={this.state.dataUpdate.producer} onChange={this.onChangeProducer} >
                                   {this.state.producers.map(producers => (
                                        <option
                                        key={producers.id}
                                        value={producers.id}>
                                        {producers.name}
                                        </option>
                                    ))}

                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="amount">Amount</Label>
                                <Input type="number" name="amount" id="amount" className={this.state.validationError.amount ?? false ? "is-invalid" : ""}
                                value={this.state.dataUpdate.amount}
                                onChange={this.onChangeAmount}></Input>
                                <small className="invalid-feedback">{this.state.validationError.amount ?? ""}</small>
                            </FormGroup>
                            <FormGroup>
                                <Label for="image">Image</Label>
                                <Input name="image" type="file"
                                 onChange={this.onChangeImage}></Input>
                                <img id="img" src={`${this.state.imageReview || this.state.dataUpdate.image}`} width="80px" height="80px"/>

                            </FormGroup>
                            <FormGroup>
                                <Label for="price_input">Price_input</Label>
                                <Input type="number" name="price_input" id="price_input" className={this.state.validationError.price_input ?? false ? "is-invalid" : ""}
                                value={this.state.dataUpdate.price_input}
                                onChange={this.onChangePrice_input}></Input>
                                <small className="invalid-feedback">{this.state.validationError.price_input ?? ""}</small>
                            </FormGroup>
                            <FormGroup>
                                <Label for="promotion_price">Promotion_price</Label>
                                <Input type="number" name="promotion_price" id="promotion_price" className={this.state.validationError.promotion_price ?? false ? "is-invalid" : ""}
                                value={this.state.dataUpdate.promotion_price}
                                onChange={this.onChangePromotion_price}></Input>
                                <small className="invalid-feedback">{this.state.validationError.promotion_price ?? ""}</small>
                            </FormGroup>
                            <FormGroup>
                                <Input type="checkbox" name="status" id="status" className="ml-2" defaultChecked={this.state.isChecked} onChange={e =>{
                                    let data = this.state.dataUpdate;
                                    // console.log(data);
                                    data.status = e.target.checked ? 1 : 0;
                                    this.setState({
                                        dataUpdate : data,
                                        isChecked: e.target.checked ? true : false
                                    })
                                }}>
                                </Input>
                                <Label for="status" className="form-check-label ml-4" >Status</Label>

                            </FormGroup>
                            <FormGroup >
                                <Label for="description">Description</Label>
                                <textarea type="text" name="description" id="description" className={this.state.validationError.description ?? false ? "is-invalid form-control" : "form-control"}
                                value={this.state.dataUpdate.description}
                                onChange={this.onChangeDescription}></textarea>
                                <small className="invalid-feedback">{this.state.validationError.description ?? ""}</small>
                            </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" type="submit">Update</Button>{' '}
                    <Button color="secondary" onClick={this.toggleEditProductModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                    </Form>
                </Modal>
                

                {/* Table Product*/}
                <div className="table-responsive mx-auto">
                    <div className="container">
                        
                        <h1 className="display-4 text-center my-4">Product List</h1>
                        <div className="mb-4 row">
                            <Button color="primary" className="col-6 col-md-3 col-lg-2 mr-auto" onClick={this.toggleNewProductModal.bind(this)}>Add Product</Button>
                            <div className="col-6 col-md-4 ml-auto">
 
                                <Input placeholder="Search" name="search" onInput={this.loadProduct}></Input>
                            </div>
                        </div>
                        <Table className="table table-bordered py-4">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Producer</th>
                                    <th>Amount</th>
                                    <th>Image</th>
                                    <th>Price Input</th>
                                    <th>Promotion Price</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {products}
                            </tbody>
                        </Table>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className={"page-item "+ (this.state.pagination.current_page ==1 ? "disabled":"")}>
                                <a className="page-link" href={this.state.links.first} onClick={this.Prev}>
                                    First
                                </a>
                                </li>
                                <li className={"page-item "+ (this.state.pagination.current_page ==1 ? "disabled":"")}>
                                <a className="page-link" href={this.state.links.prev} onClick={this.Prev}>
                                    Previous
                                </a>
                                </li>
                                <li className="page-item active">
                                <a className="page-link" href="#">
                                    {this.state.pagination.current_page}
                                </a>
                                </li>
                                <li className={"page-item " + (this.state.pagination.current_page ==this.state.pagination.last_page ? "disabled":"")}>
                                <a className="page-link" href={this.state.links.next} onClick={this.Prev}>
                                    Next
                                </a>
                                </li>
                                <li className={"page-item "+ (this.state.pagination.current_page ==this.state.pagination.last_page ? "disabled":"")}>
                                <a className="page-link" href={this.state.links.last} onClick={this.Prev}>
                                    Last
                                </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
               
            </div>
        );
        }else{
            return(
                <>
                <Title render="Product"/>
                <Favicon url="https://image.flaticon.com/icons/svg/1259/1259767.svg" />


                <div><a href="/">Lỗi</a></div>
                </>
            )
        }
    }
}
if (document.getElementById('product')) {
    ReactDOM.render(<Product />, document.getElementById('product'));
}