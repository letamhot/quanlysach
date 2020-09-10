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



export default class Comment extends Component{

    constructor(props){
        super(props)
        this.state = {
            comment: [],
            users:[],
            pagination: "",
            links: "",
            Id_delete: ""
           
        }
        this.loadComment = this.loadComment.bind(this);
        this.Prev = this.Prev.bind(this);

    }
    //load data Bills
    loadComment(e=null){

        axios.get('/api/comment'+(e ? ('&search='+ e.target.value): "" )).then((response) => {
            // console.log('comment' ,response.data);
            this.setState({
                comment:response.data.data,
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
                comment:response.data.data,
                pagination: response.data.meta,
                links: response.data.links,

            })

        })
    }
    handlePageChange(pageNumber) {
        // console.log(`active page is ${pageNumber}`);
        this.setState({pagination: pageNumber});
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

    //delete Comment
    deleteComment(){

        axios.delete('/api/comment/'+this.state.Id_delete).then((response)=>{
            toast.success("🦄Delete success", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            this.loadComment()
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
              onClick: () => this.deleteComment()
            },
            {
              label: 'No',
              onClick: () => this.loadComment()
            }
          ]
        });
    };
   
    componentWillMount(){
        this.loadComment();
        this.loadUsers();
        
        
    }

   
    render(){
        if(this.props.isPermission){
            let comment = this.state.comment.map((cmt) => {
                return(
                    <tr key={cmt.id}>
                        <td>{cmt.user.name}</td>
                        <td>{cmt.product.name}</td>
                        <td>{cmt.comment}</td>
                        <td>
                            <Button color="danger" size="sm" onClick={this.submit.bind(this, cmt.id)}>Delete</Button>
                        </td>
                    </tr>
                )
            })
            return (
                // <Sidebar>
                <div className="App">
                    <Title render="Comment"/>
                    <Favicon url="https://image.flaticon.com/icons/svg/1259/1259767.svg" />


                    <ToastContainer />
                   
                   
                    <div className="table-responsive">
                        <div className="container">
                            
                            <h1 className="display-4 text-center my-4">Comment List</h1>
                            <div className="mb-4 row">
                                <div className="col-6 col-md-4 ml-auto">
    
                                    <Input placeholder="Search" name="search" onInput={this.loadComment}></Input>
                                </div>
                            </div>
                            <Table className="table table-bordered py-4">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Product</th>
                                        <th>Comment</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {comment}
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
                <>
                <Title render="Comment"/>
                <Favicon url="https://image.flaticon.com/icons/svg/1259/1259767.svg" />


                <div><a href="/">Lỗi</a></div>
                </>
                
            )
        }
    }
}