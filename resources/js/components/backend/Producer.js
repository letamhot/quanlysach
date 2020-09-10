import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Form} from 'reactstrap';
import axios, { post } from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from 'reactjs-title';
import Favicon from 'react-favicon';



export default class Producer extends Component{

    constructor(props){
        super(props)
        this.state = {
            editProducerModal: false,
            producers: [],
            newProducerModal:false,
            pagination: "",
            validationError: "",
            links: "",
            dataCreate:{
                name:"",
                address:"",
                phone:"",
                tax_code:"",
                image:""
            },
           
            dataUpdate:{
                id:"",
                name:"",
                address:"",
                phone:"",
                tax_code:"",
                image:"", 
            },
            Id_delete: ""
           
        }
        this.addProducer = this.addProducer.bind(this);
        this.fileUploadCreate = this.fileUploadCreate.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeTax_code = this.onChangeTax_code.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.loadProducer = this.loadProducer.bind(this);
    }
    //Load data producer
    loadProducer(e=null){
        // let token = JSON.parse(localStorage.getItem('user')).token;

        axios.get('/api/producer'+(e ? ('?search='+ e.target.value): "" )).then((response) => {
            // console.log(response.data.data);
            this.setState({
                producers:response.data.data,
                pagination: response.data.meta,
                links: response.data.links,
            });
        });
    }

    //Phân trang
    Prev(e){
        e.preventDefault();
        axios.get(e.target.href).then((response) => {
            this.setState({
                producers:response.data.data,
                pagination: response.data.meta,
                links: response.data.links,
            })

        })
    }
    handlePageChange(pageNumber) {
        // console.log(`active page is ${pageNumber}`);
        this.setState({pagination: pageNumber});
    }

   //Create producer
    fileUploadCreate(e=null){
        // let token = JSON.parse(localStorage.getItem('user')).token;
        let {image, name, address, phone, tax_code} =this.state.dataCreate
        const url = '/api/producer';
        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('phone', phone);
        formData.append('tax_code', tax_code);
        formData.append('image', image)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
      }

    
    addProducer(e){
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
        let { producers } = this.state
            this.loadProducer()
            this.setState({
                producers,
                newProducerModal:false,
                dataCreate: ''
                
            });
        }).catch(e=>{
            let err = e.response.data.errors;
            this.producerError(err);
        });
       
    }
    toggleNewProducerModal(){
        this.setState({
            newProducerModal:!this.state.newProducerModal,
            

        })
    }


    //update producer
    editProducer(id, name, address, phone, tax_code, image, e= null){
        // let token = JSON.parse(localStorage.getItem('user')).token;
        axios.get('/api/producer/'+ id ).then((response)=>{
        this.setState({
            validationError: "",
            dataUpdate:{
                id: id,
                name: name,
                address: address,
                phone: phone,
                tax_code: tax_code,
                image: image,
            },
               
            editProducerModal:true,
            editProducerModal:!this.state.editProducerModal
            
            });
        });
    }
    updateProducer(e){
        e.preventDefault();
        // let {name, address, phone, tax_code, image} =this.state.dataUpdate;
        // let token = JSON.parse(localStorage.getItem('user')).token;

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const formData = new FormData(e.target);
        formData.append('_method', "put");
        let key = this.state.dataUpdate.id;
        // console.log(key);
        axios.post('/api/producer/'+ key,formData,config).then((response) =>{
            toast.success("Update success", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            this.loadProducer()
            this.setState({
                validationError: "",
                editProducerModal:false,
                dataUpdate:''
               
            });
            
               
        }).catch(e=>{
            let err = e.response.data.errors;
            this.producerError(err);
        });
    }
    toggleEditProducerModal(){
        this.setState({
            editProducerModal:!this.state.editProducerModal,

        })
    }

    //lỗi
    producerError(err){
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

    //delete producer
    deleteProducer(){
        // let token = JSON.parse(localStorage.getItem('user')).token;

        axios.delete('/api/producer/'+this.state.Id_delete).then((response)=>{
            toast.success("🦄Delete success", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            this.loadProducer()
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
              onClick: () => this.deleteProducer()
            },
            {
              label: 'No',
              onClick: () => this.loadProducer()
            }
          ]
        });
    };


    onChangeName(e){
        if(this.state.editProducerModal){
            var dataUpdate = this.state.dataUpdate;
            this.setState({
                dataUpdate:{
                    id: dataUpdate.id,
                    name: e.target.value,
                    address: dataUpdate.address,
                    phone: dataUpdate.phone,
                    tax_code:dataUpdate.tax_code,
                    image: dataUpdate.image
                }
            })
        }else{
            var dataCreate = this.state.dataCreate;
            this.setState({
                dataCreate:{
                    name: e.target.value,
                    address: dataCreate.address,
                    phone: dataCreate.phone,
                    tax_code:dataCreate.tax_code,
                    image: dataCreate.image
                }
            })
        }
    }

    onChangeAddress(e){
        if(this.state.editProducerModal){
            var dataUpdate = this.state.dataUpdate;
            this.setState({
                dataUpdate:{
                    id: dataUpdate.id,
                    name: dataUpdate.name,
                    address: e.target.value,
                    phone: dataUpdate.phone,
                    tax_code: dataUpdate.tax_code,
                    image: dataUpdate.image
                }
            })
        }else{
            var dataCreate = this.state.dataCreate;
            this.setState({
                dataCreate:{
                    name: dataCreate.name,
                    address: e.target.value,
                    phone: dataCreate.phone,
                    tax_code: dataCreate.tax_code,
                    image: dataCreate.image
                }
            })
        }
    }

    onChangePhone(e){
        if(this.state.editProducerModal){
            var dataUpdate = this.state.dataUpdate;
            this.setState({
                dataUpdate:{
                    id: dataUpdate.id,
                    name: dataUpdate.name,
                    address: dataUpdate.address,
                    phone: e.target.value,
                    tax_code: dataUpdate.tax_code,
                    image: dataUpdate.image
                }
            })
        }else{
            var dataCreate = this.state.dataCreate;
            this.setState({
                dataCreate:{
                    name: dataCreate.name,
                    address: dataCreate.address,
                    phone: e.target.value,
                    tax_code: dataCreate.tax_code,
                    image: dataCreate.image
                }
            })
        }
    }

    onChangeTax_code(e){
        if(this.state.editProducerModal){
            var dataUpdate = this.state.dataUpdate;
            this.setState({
                dataUpdate:{
                    id: dataUpdate.id,
                    name: dataUpdate.name,
                    address: dataUpdate.address,
                    phone: dataUpdate.phone,
                    tax_code: e.target.value,
                    image: dataUpdate.image
                }
            })
        }else{
            var dataCreate = this.state.dataCreate;
            this.setState({
                dataCreate:{
                    name: dataCreate.name,
                    address: dataCreate.address,
                    phone: dataCreate.phone,
                    tax_code: e.target.value,
                    image: dataCreate.image
                }
            })
        }
    }

    onChangeImage(e){
        if(this.state.editProducerModal){        
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
                    address: dataUpdate.address,
                    phone: dataUpdate.phone,
                    tax_code: dataUpdate.tax_code,
                    image: e.target.files[0]
                }
            })
        }else{
            var dataCreate = this.state.dataCreate;
            this.setState({
                dataCreate:{
                    name: dataCreate.name,
                    address: dataCreate.address,
                    phone: dataCreate.phone,
                    tax_code: dataCreate.tax_code,
                    image: e.target.files[0]
                }
            })
        }
    }
    
    componentWillMount(){
        this.loadProducer();
        
    }
   
   
    render(){
        // let user = JSON.parse(localStorage.getItem('userInfo'));
        if(this.props.isPermission){
        let producers = this.state.producers.map((producer) => {
            return(
                <tr key={producer.id}>
                    <td>{producer.name}</td>
                    <td>{producer.address}</td>
                    <td>{producer.phone}</td>
                    <td>{producer.tax_code}</td>
                    <td><img src={producer.image} width="100px" height="100px"/></td>
                    <td>
                        <Button color="success" size="sm"
                        onClick={this.editProducer.bind(this, producer.id, producer.name, producer.address, producer.phone, producer.tax_code, producer.image)}>Edit</Button>
                        <Button color="danger" size="sm" onClick={this.submit.bind(this, producer.id)}>Delete</Button>
                    </td>
                </tr>
            )
        })
        return (
            <div className="App">
                <Favicon url="https://image.flaticon.com/icons/svg/1259/1259767.svg" />

                <Title render="Producer"/>

                <ToastContainer />
                {/* Modal Create */}
                <Modal isOpen={this.state.newProducerModal} toggle={this.toggleNewProducerModal.bind(this)} >
                <Form onSubmit={this.addProducer.bind(this)}>
                    <ModalHeader toggle={this.toggleNewProducerModal.bind(this)}>Modal title</ModalHeader>
                    <ModalBody>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input name="name" id="name" className={this.state.validationError.name ?? false ? "is-invalid" : ""}
                                value={this.state.dataCreate.name}
                                onChange={this.onChangeName}></Input>
                                <small className="invalid-feedback">{this.state.validationError.name ?? ""}</small>
                            </FormGroup>
                            <FormGroup>
                                <Label for="address">Address</Label>
                                <Input name="address" id="address" className={this.state.validationError.address ?? false ? "is-invalid" : ""}
                                value={this.state.dataCreate.address}
                                onChange={this.onChangeAddress}></Input>
                                <small className="invalid-feedback">{this.state.validationError.address ?? ""}</small>
                            </FormGroup>
                            <FormGroup>
                                <Label for="phone">Phone</Label>
                                <Input type="number" name="phone" id="phone" className={this.state.validationError.phone ?? false ? "is-invalid" : ""}
                                value={this.state.dataCreate.phone}
                                onChange={this.onChangePhone}></Input>
                                <small className="invalid-feedback">{this.state.validationError.phone ?? ""}</small>
                            </FormGroup>
                            <FormGroup>
                                <Label for="tax_code">Tax_code</Label>
                                <Input type="number" name="tax_code" id="tax_code" className={this.state.validationError.tax_code ?? false ? "is-invalid" : ""}
                                value={this.state.dataCreate.tax_code}
                                onChange={this.onChangeTax_code}></Input>
                                <small className="invalid-feedback">{this.state.validationError.tax_code ?? ""}</small>
                            </FormGroup>
                            <FormGroup>
                                <Label for="image">Image</Label>
                                <Input name="image" type="file"
                                 onChange={this.onChangeImage}></Input>
                                 
                            </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" type="submit">Add</Button>{' '}
                    <Button color="secondary" onClick={this.toggleNewProducerModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                     </Form>
                </Modal>

                {/* Modal Update */}
               
                <Modal isOpen={this.state.editProducerModal} toggle={this.toggleEditProducerModal.bind(this)} >
                <Form onSubmit={this.updateProducer.bind(this)}>
                    <ModalHeader toggle={this.toggleEditProducerModal.bind(this)}>Modal title</ModalHeader>
                    <ModalBody>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input name="name" id="name" className={this.state.validationError.name ?? false ? "is-invalid" : ""}
                                value={ this.state.dataUpdate.name}
                                onChange={this.onChangeName}></Input>
                                <small className="invalid-feedback">{this.state.validationError.name ?? ""}</small>
                            </FormGroup>
                            <FormGroup>
                                <Label for="address">Address</Label>
                                <Input name="address" id="address" className={this.state.validationError.address ?? false ? "is-invalid" : ""}
                                value={this.state.dataUpdate.address}
                                onChange={this.onChangeAddress}></Input>
                                <small className="invalid-feedback">{this.state.validationError.address ?? ""}</small>

                            </FormGroup>
                            <FormGroup>
                                <Label for="phone">Phone</Label>
                                <Input type="number" name="phone" id="phone" className={this.state.validationError.phone ?? false ? "is-invalid" : ""}
                                value={this.state.dataUpdate.phone}
                                onChange={this.onChangePhone}></Input>
                                <small className="invalid-feedback">{this.state.validationError.phone ?? ""}</small>
                            </FormGroup>
                            <FormGroup>
                                <Label for="tax_code">Tax_code</Label>
                                <Input type="number" name="tax_code" id="tax_code" className={this.state.validationError.tax_code ?? false ? "is-invalid" : ""}
                                value={this.state.dataUpdate.tax_code}
                                onChange={this.onChangeTax_code}></Input>
                                <small className="invalid-feedback">{this.state.validationError.tax_code ?? ""}</small>
                            </FormGroup>
                            <FormGroup>
                                <Label for="image">Image</Label>
                                <Input name="image" type="file"
                                 onChange={this.onChangeImage}></Input>
                                <img id="img" src={`${this.state.imageReview || this.state.dataUpdate.image}`} width="80px" height="80px"/>
                            </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" type="submit">Update</Button>{' '}
                    <Button color="secondary" onClick={this.toggleEditProducerModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                    </Form>
                </Modal>
               
                <div className="table-responsive mx-auto">
                    <div className="container">
                        
                        <h1 className="display-4 text-center my-4">Producer List</h1>
                        <div className="mb-4 row">
                            <Button color="primary" className="col-6 col-md-3 col-lg-2 mr-auto" onClick={this.toggleNewProducerModal.bind(this)}>Add Producer</Button>
                            <div className="col-6 col-md-4 ml-auto">
 
                                <Input placeholder="Search" name="search" onInput={this.loadProducer}></Input>
                            </div>
                        </div>
                        <Table className="table table-bordered py-4">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Tax Code</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {producers}
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
            return(
                <>
                <Title render="Producer"/>
                <Favicon url="https://image.flaticon.com/icons/svg/1259/1259767.svg" />


                <div><a href="/">Lỗi</a></div>
                </>
            )
        }
    }
}
if (document.getElementById('producer')) {
    ReactDOM.render(<Producer />, document.getElementById('producer'));
}