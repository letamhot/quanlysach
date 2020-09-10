import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Form} from 'reactstrap';
import axios, { post } from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {ToastContainer, toast} from 'react-toastify';
import Title from 'reactjs-title';
import Favicon from 'react-favicon';



import 'react-toastify/dist/ReactToastify.css';

export default class Category extends Component{

    constructor(props){
        super(props)
        this.state = {
            editCategoryModal: false,
            categories: [],
            newCategoryModal:false,
            pagination: "",
            validationError: "",
            links: "",
            dataCreate:{
                name:"",
                image:""
            },
           
            dataUpdate:{
                id:"",
                name:"",
                image:"", 
            },
            Id_delete: ""
           
        }
        this.addCategories = this.addCategories.bind(this);
        this.fileUploadCreate = this.fileUploadCreate.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.loadCategories = this.loadCategories.bind(this);
    }
    //load data Category
    loadCategories(e=null){
        // let token = JSON.parse(localStorage.getItem('user')).token;
       
        axios.get('/api/category'+(e ? ('?search='+ e.target.value): "" )).then((response) => {
                // console.log(response.data.data);
                this.setState({
                    categories:response.data.data,
                    pagination: response.data.meta,
                    links: response.data.links,
    
                })
            })
    }

    //Pagination
    Prev(e){
        e.preventDefault();
        axios.get(e.target.href).then((response) => {
            this.setState({
                categories:response.data.data,
                pagination: response.data.meta,
                links: response.data.links,

            })

        })
    }
    handlePageChange(pageNumber) {
        // console.log(`active page is ${pageNumber}`);
        this.setState({pagination: pageNumber});
    }
    //show Create Category
    fileUploadCreate(file){
        let {image, name} =this.state.dataCreate;
        // let token = JSON.parse(localStorage.getItem('user')).token;

        const url = '/api/category';
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
      }

    //Create Category
    addCategories(e){
        e.preventDefault()
        this.fileUploadCreate(this.state.dataCreate.image).then((response)=>{
            toast.success("🦄Create success", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        // console.log(response.data.data);
        let { categories } = this.state
            this.loadCategories()
            this.setState({
                categories,
                newCategoryModal:false,
                dataCreate:''
                
            })
        }).catch(e=>{
            let err = e.response.data.errors;
            this.categoryError(err);
        })
       
    }
    toggleNewCategoryModal(){
        this.setState({
            newCategoryModal:!this.state.newCategoryModal,

        })
    }

    //Show update Category
    editCategories(id, name, image){
        // let token = JSON.parse(localStorage.getItem('user')).token;

        axios.get('/api/category/'+ id).then((response)=>{
        this.setState({
            validationError: "",
            dataUpdate:{
                id: id,
                name: name,
                image: image,
            },
               
        editCategoryModal:true,
        editCategoryModal:!this.state.editCategoryModal
            
        })
        // console.log(this.state.dataUpdate);
    })
    }
    toggleEditCategoryModal(){
        this.setState({
            editCategoryModal:!this.state.editCategoryModal,

        })
    }
    //Update Category
    updateCategories(e){
        e.preventDefault();
        let { name} =this.state.dataUpdate;
        // let token = JSON.parse(localStorage.getItem('user')).token;

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const formData = new FormData(e.target);
        formData.append('_method', "put");
        let key = this.state.dataUpdate.id
        // console.log(key);
        axios.post('/api/category/'+ key,formData,config).then((response) =>{
            toast.success("🦄Update success", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            this.loadCategories()
            this.setState({
                validationError: "",
                editCategoryModal:false,
                dataUpdate:""
               
            })
            
               
        }).catch(e=>{
            let err = e.response.data.errors;
            this.categoryError(err);
        })
    }
    //Error Category
    categoryError(err){
        // console.log(err);
        let validationError = this.state.validationError;
        validationError = err;
        toast.error('🦄Create Error ', {
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

    //delete Category
    deleteCategory(){

        axios.delete('/api/category/'+this.state.Id_delete).then((response)=>{
            toast.success("🦄Delete success", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            this.loadCategories()
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
              onClick: () => this.deleteCategory()
            },
            {
              label: 'No',
              onClick: () => this.loadCategories()
            }
          ]
        });
    };


    onChangeName(e){
        if(this.state.editCategoryModal){
            var dataUpdate = this.state.dataUpdate;
            this.setState({
                dataUpdate:{
                    id: dataUpdate.id,
                    name: e.target.value,
                    image: dataUpdate.image
                }
            })
        }else{
            var dataCreate = this.state.dataCreate;
            this.setState({
                dataCreate:{
                    name: e.target.value,
                    image: dataCreate.image
                }
            })
        }
    }
    onChangeImage(e){
        if(this.state.editCategoryModal){        
            var dataUpdate = this.state.dataUpdate;
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
                dataUpdate:{
                    id: dataUpdate.id,
                    name: dataUpdate.name,
                    image: e.target.files[0]
                }
            })
        }else{
            var dataCreate = this.state.dataCreate;
            this.setState({
                dataCreate:{
                    name: dataCreate.name,
                    image: e.target.files[0]
                }
            })
        }
    }
   
    componentWillMount(){
        this.loadCategories();
        
    }
    

   
    
    render(){
        if(this.props.isPermission){
            let categories = this.state.categories.map((category) => {
            return(
                <tr key={category.id}>
                    <td>{category.name}</td>
                    <td><img src={category.image} width="100px" height="100px"/></td>
                    <td>
                        <Button color="success" size="sm"
                        onClick={this.editCategories.bind(this, category.id, category.name, category.image)}>Edit</Button>
                        <Button color="danger" size="sm" onClick={this.submit.bind(this, category.id)}>Delete</Button>
                    </td>
                </tr>
                )
            })
            return (
                <div className="App">
                    {/* <Sidebar /> */}
                    <ToastContainer />
                    <Favicon url="https://image.flaticon.com/icons/svg/1259/1259767.svg" />

                    <Title render="Category"/>
                
                    {/* Modal Create */}
                    <Modal isOpen={this.state.newCategoryModal} toggle={this.toggleNewCategoryModal.bind(this)} >
                    <Form onSubmit={this.addCategories.bind(this)}>
                        <ModalHeader toggle={this.toggleNewCategoryModal.bind(this)}>Modal title</ModalHeader>
                        <ModalBody>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input name="name" id="name" className={this.state.validationError.name ?? false ? "is-invalid" : ""} 
                                    value={this.state.dataCreate.name}
                                    onChange={this.onChangeName}></Input>
                                    <small className="invalid-feedback">{this.state.validationError.name ?? ""}</small>

                                </FormGroup>
                                <FormGroup>
                                    <Label for="image">Image</Label>
                                    <Input name="image" type="file" 
                                    onChange={this.onChangeImage}></Input>
                                </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" type="submit">Add</Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewCategoryModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                        </Form>
                    </Modal>
                   
                    {/* Modal Update */}
                    <Modal isOpen={this.state.editCategoryModal} toggle={this.toggleEditCategoryModal.bind(this)} >
                    <Form onSubmit={this.updateCategories.bind(this)}>
                        <ModalHeader toggle={this.toggleEditCategoryModal.bind(this)}>Modal title</ModalHeader>
                        <ModalBody>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input name="name" id="name" className={this.state.validationError.name ?? false ? "is-invalid" : ""}
                                    value={ this.state.dataUpdate.name}
                                    onChange={this.onChangeName}></Input>
                                    <small className="invalid-feedback">{this.state.validationError.name ?? ""}</small>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="image">Image</Label>
                                    <Input id="image" name="image" type="file"
                                    onChange={this.onChangeImage}></Input>
                                    <img id="img" src={`${this.state.imageReview || this.state.dataUpdate.image}`} width="80px" height="80px"/>
                                </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" type="submit">Update</Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditCategoryModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                        </Form>
                    </Modal>
                    
                    <div className="table-responsive">
                        <div className="container">
                            
                            <h1 className="display-4 text-center my-4">Category List</h1>
                            <div className="mb-4 row">
                                <Button color="primary" className="col-6 col-md-3 col-lg-2 mr-auto" onClick={this.toggleNewCategoryModal.bind(this)}>Add Categories</Button>
                                <div className="col-6 col-md-4 ml-auto">
                                    
                                    <Input placeholder="Search" name="search" onInput={this.loadCategories}></Input>
                                </div>
                            </div>
                            <Table className="table table-bordered py-4">
                                <thead>
                                    <tr>
                                        <th id="name">Name</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {categories}
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
                                <li className={"page-item "+ (this.state.pagination.current_page ==this.state.pagination.last_page ? "disabled":"")}>
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
            return (
                <div><a href="/">Lỗi</a></div>
            )
        }
        
    }
}
if (document.getElementById('category')) {
    ReactDOM.render(<Category />, document.getElementById('category'));
}