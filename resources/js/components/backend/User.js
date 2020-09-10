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


export default class User extends Component{

    constructor(props){
        super(props)
        this.state = {
            editUserModal: false,
            users: [],
            roles:[],
            pagination: "",
            validationError: "",
            isChecked: true,
            links: "",
            dataUpdate:{
                id:"",
                status:"",
                avatar:"",
                role:"",
            },
            Id_delete: ""
           
        }
        this.onChangeImage = this.onChangeImage.bind(this);
        this.loadUsers = this.loadUsers.bind(this);
        this.Prev = this.Prev.bind(this);

    }
    //load data User
    loadUsers(e=null){

        axios.get('/api/user'+(e ? ('?search='+ e.target.value): "" )).then((response) => {
            this.setState({
                users:response.data.data,
                pagination: response.data.meta,
                links: response.data.links,

            })
        })
    }
    //load data Role
    loadRole(){

        axios.get('/api/role').then(response => {
            this.setState({
                roles : response.data.data
            })
        })
    }
    //Pagination
    Prev(e){
        e.preventDefault();
        axios.get(e.target.href).then((response) => {
            this.setState({
                users:response.data.data,
                pagination: response.data.meta,
                links: response.data.links,

            })

        })
    }
    handlePageChange(pageNumber) {
        this.setState({pagination: pageNumber});
    }

    //Show update User
    editUsers(user)
    {

        axios.get("/api/user/" + user.id ).then(response => {

            this.setState({
                validationError: "",
                dataUpdate:{
                    id: user.id,
                    status: user.status,
                    avatar: user.avatar,
                    role: user.role.id
                },
                
                editUserModal:true,
                isChecked: user.status == 1 ? true : false,
                editUserModal: !this.state.editUserModal
                
            });
        })
        
    }
    //Update User
    updateUsers(e){
        e.preventDefault();
        let dataUpdate =this.state.dataUpdate;

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const formData = new FormData();
        formData.append('status', dataUpdate.status ? 1: 0);
        dataUpdate.avatar ? formData.append('avatar', dataUpdate.avatar):"";
        formData.append('role_id', dataUpdate.role);
        formData.append('_method', "put");
        // formData.append('token', token);
        let key = dataUpdate.id;
        // console.log(key);
        axios.post('/api/user/'+ key,formData,config).then((response) =>{
            
            toast.success("🦄Update success", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
               
            this.loadUsers()
            this.loadRole()
            this.setState({
                validationError: "",
                editUserModal:false,
                dataUpdate:""
               
            })
            
               
        }).catch(e=>{
            let err = e.response.data.errors;
            this.UserError(err);
        })
    }
    //Error User
    UserError(err){
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

    //delete User
    deleteUser(){

        axios.delete('/api/user/'+this.state.Id_delete).then((response)=>{
            toast.success("🦄Delete success", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            this.loadUsers()
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
              onClick: () => this.deleteUser()
            },
            {
              label: 'No',
              onClick: () => this.loadUsers()
            }
          ]
        });
    };

    onChangeImage(e){
        if(this.state.editUserModal){        
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
                    name:dataUpdate.name,
                    email:dataUpdate.email,
                    provider:dataUpdate.provider,
                    status:dataUpdate.status,
                    avatar: e.target.files[0],
                    role:dataUpdate.role,
                }
            })
        }
    }
   
    componentWillMount(){
        this.loadUsers();
        this.loadRole();
        
    }

    toggleEditUserModal(){
        this.setState({
            editUserModal:!this.state.editUserModal,

        })
    }
    render(){
        if(this.props.isPermission){
            let users = this.state.users.map((user) => {
                return(
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.provider? user.provider : "provider"}</td>
                        <td>{user.status == 1 ?(<Label className="badge bg-green" style={{backgroundColor:"blue"}} >Active</Label>):(<Label className="badge bg-gray" style={{backgroundColor:"red"}}>Inactive</Label>)}</td>
                        <td><img src={user.avatar} width="100px" height="100px"/></td>
                        <td>{user.role.name}</td>
                        <td>
                            <Button color="success" size="sm"
                            onClick={this.editUsers.bind(this, user)}>Edit</Button>
                            <Button color="danger" size="sm" onClick={this.submit.bind(this, user.id)}>Delete</Button>
                        </td>
                    </tr>
                )
            })
            return (
                // <Sidebar>
                <div className="App">
                    <Favicon url="https://image.flaticon.com/icons/svg/1259/1259767.svg" />
                    <Title render="User"/>
                    <ToastContainer />
                    <Form onSubmit={this.editUsers}>
                    <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)} >
                        <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Modal title</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="role">Role</Label>
                                <Input type="select" name="role" id="role"value={this.state.dataUpdate.role} onChange={e =>  {
                                    let dataUpdate = this.state.dataUpdate;
                                    dataUpdate.role = e.target.value;
                                    this.setState({
                                        dataUpdate: dataUpdate,
                                            
                                    })
                                    }
                                } >
                                    {this.state.roles.map(roles => (
                                        <option
                                        key={roles.id}
                                        value={roles.id}>
                                        {roles.name}
                                        </option>
                                    ))}

                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Input type="checkbox" name="status" id="status" className="ml-2" defaultChecked={this.state.isChecked} onChange={e =>{
                                    let data = this.state.dataUpdate;
                                    data.status = e.target.checked ? 1 : 0 ;
                                    this.setState({
                                        dataUpdate : data,
                                        isChecked: e.target.checked ? true : false
                                    })
                                }}>
                                </Input>
                                <Label for="status" className="form-check-label ml-4" >Status</Label>

                            </FormGroup>
                                
                            <FormGroup>
                                <Label >Avatar</Label>
                                <Input id="avatar" name="avatar" type="file"
                                    onChange={this.onChangeImage}></Input>
                                <img id="img" src={`${this.state.imageReview || this.state.dataUpdate.avatar}`} width="80px" height="80px"/>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" onClick={this.updateUsers.bind(this)}>Update</Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    </Form>
                    <div className="table-responsive">
                        <div className="container">
                            
                            <h1 className="display-4 text-center my-4">User List</h1>
                            <div className="mb-4 row">
                                <div className="col-6 col-md-4 ml-auto">
    
                                    <Input placeholder="Search" name="search" onInput={this.loadUsers}></Input>
                                </div>
                            </div>
                            <Table className="table table-bordered py-4">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Provider</th>
                                        <th>Status</th>
                                        <th>Avatar</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {users}
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
if (document.getElementById('user')) {
    ReactDOM.render(<User />, document.getElementById('user'));
}