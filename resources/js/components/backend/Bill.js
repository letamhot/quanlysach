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



export default class Bill extends Component{

    constructor(props){
        super(props)
        this.state = {
            editBillModal: false,
            bills: [],
            users:[],
            pagination: "",
            validationError: "",
            isChecked: true,
            links: "",
            dataUpdate:{
                id:"",
                user:"",
                phone:"",
                address:"",
                price_total:"",
                status:"",
                pay:"",
               
            },
            Id_delete: ""
           
        }
        this.loadBills = this.loadBills.bind(this);
        this.Prev = this.Prev.bind(this);

    }
    //load data Bills
    loadBills(e=null){

        axios.get('/api/bill'+(e ? ('&search='+ e.target.value): "" )).then((response) => {
            console.log('showbill' ,response.data.data[0].product[0].name);
            this.setState({
                bills:response.data.data,
                pagination: response.data.meta,
                links: response.data.links,

            })
        })
    }
    //load data Role
    loadUsers(){

        axios.get('/api/user').then(response => {
            this.setState({
                users : response.data.data
            })
        })
    }
    //Pagination
    Prev(e){
        e.preventDefault();
        axios.get(e.target.href).then((response) => {
            this.setState({
                bills:response.data.data,
                pagination: response.data.meta,
                links: response.data.links,

            })

        })
    }
    handlePageChange(pageNumber) {
        // console.log(`active page is ${pageNumber}`);
        this.setState({pagination: pageNumber});
    }

    //Show update User
    editbills(bill)
    {

        axios.get("/api/bill/" + bill.id).then(response => {
            this.setState({
                validationError: "",
                dataUpdate:{
                    id: bill.id,
                    status: bill.status,
                    pay: bill.pay
                    
                },
                
                editBillModal:true,
                isChecked: bill.status == 1 ? true : false,
                editBillModal: !this.state.editBillModal
                
            });
        })
        
    }
    //Update Bill
    updateBills(e){
        e.preventDefault();
        let dataUpdate =this.state.dataUpdate;

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const formData = new FormData();
        formData.append('pay', dataUpdate.pay ? 1 : 0);
        dataUpdate.pay == 1 ? formData.append('status', 1) : formData.append('status', 0) ;
        
        formData.append('_method', "put");
        let key = dataUpdate.id;
        // console.log(key);
        axios.post('/api/bill/'+ key,formData,config).then((response) =>{
            
            toast.success("🦄Update success", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
               
            this.loadBills()
            this.loadUsers()
            this.setState({
                validationError: "",
                editBillModal:false,
                dataUpdate:""
               
            })
            
               
        }).catch(e=>{
            let err = e.response.data.errors;
            this.BillError(err);
        })
    }
    toggleEditBillModal(){
        this.setState({
            editBillModal:!this.state.editBillModal,

        })
    }
    //Error Bill
    BillError(err){
        // console.log(err);
        let validationError = this.state.validationError;
        validationError = err;
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

    //delete Bill
    deleteBill(){

        axios.delete('/api/bill/'+this.state.Id_delete).then((response)=>{
            toast.success("🦄Delete success", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            this.loadBills()
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
              onClick: () => this.deleteBill()
            },
            {
              label: 'No',
              onClick: () => this.loadBills()
            }
          ]
        });
    };
   
    componentWillMount(){
        this.loadBills();
        this.loadUsers();
        
        
    }

   
    render(){
        if(this.props.isPermission){
            let bills = this.state.bills.map((bill) => {
                return(
                    <tr key={bill.id}>
                        <td>MS{bill.id}</td>
                        <td>{bill.user.name}</td>
                        <td>{bill.phone}</td>
                        <td>{bill.address}</td>
                        <td><NumberFormat value={bill.price_total} displayType={'text'} thousandSeparator={true} suffix={' VND'} /></td>

                        <td>{bill.status == 1 ?(<Label className="badge bg-green" style={{backgroundColor:"blue"}} >Active</Label>):(<Label className="badge bg-gray" style={{backgroundColor:"red"}}>Inactive</Label>)}</td>
                        <td>{bill.pay == 1 ?(<Label className="badge bg-green" style={{backgroundColor:"blue"}} >Finish</Label>):(<Label className="badge bg-gray" style={{backgroundColor:"red"}}>Unfinished</Label>)}</td>
                        <td>
                            <Button color="success" size="sm" onClick={this.editbills.bind(this, bill)}
                            >Edit</Button>
                            <Button color="danger" size="sm" onClick={this.submit.bind(this, bill.id)}>Delete</Button>
                        </td>
                    </tr>
                )
            })
            return (
                // <Sidebar>
                <div className="App">
                    <Title render="Bill"/>
                    <Favicon url="https://image.flaticon.com/icons/svg/1259/1259767.svg" />

                    <ToastContainer />
                   
                    <Modal isOpen={this.state.editBillModal} toggle={this.toggleEditBillModal.bind(this)} >
                    <Form onSubmit={this.updateBills.bind(this)}>
                        <ModalHeader toggle={this.toggleEditBillModal.bind(this)}>Modal title</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Input type="checkbox" name="pay" id="pay" className="ml-2" defaultChecked={this.state.isChecked} onChange={e =>{
                                    let data = this.state.dataUpdate;
                                    data.pay = e.target.checked ? 1 : 0 ;
                                    this.setState({
                                        dataUpdate : data,
                                        isChecked: e.target.checked ? true : false
                                    })
                                }}>
                                </Input>
                                <Label for="pay" className="form-check-label ml-4" >Pay</Label>

                            </FormGroup>
                                
                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" type="submit" >Update</Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditBillModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                        </Form>
                    </Modal>
                   
                    <div className="table-responsive">
                        <div className="container">
                            
                            <h1 className="display-4 text-center my-4">Bill List</h1>
                            <div className="mb-4 row">
                                <div className="col-6 col-md-4 ml-auto">
    
                                    <Input placeholder="Search" name="search" onInput={this.loadUsers}></Input>
                                </div>
                            </div>
                            <Table className="table table-bordered py-4">
                                <thead>
                                    <tr>
                                        <td>Bill</td>
                                        <th>User</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Price Total</th>
                                        <th>Status</th>
                                        <th>Pay</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {bills}
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
                // </Sidebar>
            );
        }else{
            return(
                <div><a href="/">Lỗi</a></div>
                
            )
        }
    }
}