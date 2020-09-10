import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import '../../../css/layout.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = ({
            showModal: false,
            showRegister: false,
            login: true,
            name: "",
            email:"",
            password:"",
            provider_id:"",
            imageUrl: "",
            validationError: "",
            bills:{},
            products: [],
            users:{}
        })
        this.signIn = this.signIn.bind(this);
        this.register = this.register.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    handleNameChange(e){
        this.setState({name:e.target.value})
    }
    handleEmailChange(e){
        this.setState({email:e.target.value})
    }
    handlePasswordChange(e){
        this.setState({password:e.target.value})
    }
    LoginButton(email, password){
        this.setState({
            showModal:!this.showModal,
            email:email,
            password:password
        })
    }
    RegisterButton(name, email, password){
        this.setState({
            showRegister:!this.showRegister,
            name:name,
            email:email,
            password:password
        })
    }
    clearModal(){
        this.setState({
            showModal:false, 
            showRegister:false
        })
    }
    signIn(){
        Axios.post('/api/login',{email:this.state.email, password:this.state.password},{
        headers: {
            'Accept' : 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }}).then(response =>{
            toast.success("Login success", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        // console.log('aaaaaad',response.status);
            if(response.status == 200){
                this.getUser();
            }
    

        }).catch(e=>{
            // console.log('eee',e);
            let err = e.response.data.error;
            // console.log('ee',err);
            let validationError = this.state.validationError;
            validationError = err;
            // console.log('val', validationError);
            toast.error('🦄This account does not have access ', {
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
    Error(err){
        // console.log(err);
        let validationError = this.state.validationError;
        validationError = err;
        // console.log('val', validationError);
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
    register(){
        Axios.post('/api/register',{name:this.state.name, email:this.state.email, password:this.state.password, password_confirmation: this.state.password},{
        headers: {
            'Accept' : 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }}).then(response =>{
            toast.success("Register success", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        // console.log(response.data);
        if(response.status == 200){

            this.getUser();
        }
    

    }).catch(e=>{
        let err = e.response.data.errors;
        this.Error(err);
    });          
    }

    getUser()
    {
        Axios.post('/api/me',
                {headers: {
                    'Accept' : 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }}).then(response =>{
                    
                    let permission = response.data.role_id ==1 ? true : false;
                    // console.log('user', response.data);
                    this.setState({ 
                            validationError: "",
                            login: false,
                            user:  response.data
                        })
                        this.clearModal();
                        this.props.isPermission(permission);
                        this.props.isLogin();
                    

                }).catch((e) =>{
                    
                    let err = e.response.data.message;
                    // console.log('e', err);
                    let validationError = this.state.validationError;
                    validationError = err;
                    // console.log('val', validationError); 
                        this.setState({
                            validationError: validationError
                        });
                });
    }
    GoogleLogin(data){
        Axios.post('/api/auth/google/callback',
        data,{
        headers: {
            'Accept' : 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }}).then(response =>{
          
            // console.log(response.data);
            this.setState({ 
               email: data.email,
               password:data.provider_id

            })
            this.signIn();

            

        

        });
    }
    logout(){
       Axios.get('/api/logout').then(response=>{
           this.getUser();
           this.props.isPermission();
            this.props.isLogin();
       })
       
   

        this.setState({ 
            login: true,
            user: ""       
        });
    }
    submit(id) {
        this.setState({
            Id_delete: id

        })
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Do you want to logout or not',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.logout(),

            },
            {
              label: 'No',
              onClick: () => alert('Click No')
            }
          ]
        });
    };
    responseGoogle(response){
        // console.log('google', response);
        if(response){
            let user ={
                name: response.profileObj.name,
                email: response.profileObj.email,
                provider_id: response.profileObj.googleId,
                avatar: response.profileObj.imageUrl
            };
           
        this.GoogleLogin(user);
    }
    }
    componentDidMount(){
        this.getUser();
    }
    render(){
        return (
            
            <>
                <ToastContainer />
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                {(this.state.login)?
                
                    (<li className="nav-item">
                        <div>
                            <button className="btn btn-info" onClick={this.LoginButton.bind(this, this.state.email, this.state.password)} 
                                color="info" size="sm">Login Account</button>
                            <button className="btn btn-success" onClick={this.RegisterButton.bind(this, this.name, this.state.email, this.state.password)} 
                                color="info" size="sm">Register</button>
                        </div>

                    </li>): 
                    (
                        <li className="nav-item dropdown">
                            <button className="dropbtn">
                                <img src={this.state.user.avatar ?? "https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg"} with="50px" height="50px" style={{borderRadius:"20px"}}
                                />
                                <span style={{color:"#000"}}>{this.state.user.name??""}</span>
                            </button>
                            <ul className="dropdown-content">
                                <li><a href="#" >Profile</a></li>
                                <li><a onClick={this.submit.bind(this)}>Logout</a></li>
                                
                            </ul> 
                        </li>
                    )
                }
                </ul>
                   
                    {/*Modal Login Account*/}
                <Modal isOpen = { this.state.showModal } > 
                <ModalHeader toggle={this.clearModal.bind(this)} > Modal Login </ModalHeader>  
                <ModalBody >
                    <h2 className="form-signin-heading"> Please sign in </h2>
                    <label  className="sr-only">Email address</label>
                    <input type="email" className={this.state.validationError.email ? "is-invalid form-control" : "form-control"} onChange={this.handleEmailChange} id="inputEmail"  placeholder="Email address" required autoFocus />
                    <small className="invalid-feedback">{this.state.validationError.email ?? ""}</small>

                    <label  className="sr-only">Password</label>
                    <input type="password" className={this.state.validationError.password ? "is-invalid form-control" : "form-control"} onChange={this.handlePasswordChange} id="inputPassword"  placeholder="Password" required />
                    <small className="invalid-feedback">{this.state.validationError.password ?? ""}</small>

                </ModalBody>  
                <ModalFooter >
                <Button className="btn btn-lg btn-primary btn-block" onClick={this.signIn} type="button">Sign in</Button>  
                <Button className="btn btn-lg btn-danger btn-block" type="button" onClick={this.clearModal.bind(this)}>Cancel</Button>
                <label htmlFor="">Or: </label>
                <br/>
                <br/>
                <GoogleLogin
                clientId="839087684515-hpvg9rd0ftgt374178q1924vq21elt4b.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={this.responseGoogle.bind(this)}
                onFailure={this.responseGoogle.bind(this)}
                cookiePolicy={'single_host_origin'} />
                </ModalFooter>  
                </Modal>
                {/*Modal register Account*/}
                <Modal isOpen = { this.state.showRegister } >
                <ModalHeader toggle={this.clearModal.bind(this)} > Modal Register </ModalHeader>  
                <ModalBody >
                    <h2 className="form-signin-heading"> Register </h2>
                    <label  className="sr-only">Name</label>
                    <input type="text" className={this.state.validationError.name ? " form-control is-invalid" : " form-control"} onChange={this.handleNameChange} id="inputName" placeholder="Name" required autoFocus />
                    <small className="invalid-feedback">{this.state.validationError.name ?? ""}</small>

                    <label  className="sr-only">Email address</label>
                    <input type="email" onChange={this.handleEmailChange} className={this.state.validationError.email ? "is-invalid form-control" : "form-control"} id="inputEmail" placeholder="Email address" required autoFocus />
                    <small className="invalid-feedback">{this.state.validationError.email ?? ""}</small>

                    <label  className="sr-only">Password</label>
                    <input type="password" onChange={this.handlePasswordChange} className={this.state.validationError.password ? "is-invalid form-control" : "form-control"} id="inputPassword" placeholder="Password" required />
                    <small className="invalid-feedback">{this.state.validationError.password ?? ""}</small>

                </ModalBody>  
                <ModalFooter >
                <Button className="btn btn-lg btn-primary btn-block" onClick={this.register} type="button">Register</Button>  
                <Button className="btn btn-lg btn-danger btn-block" onClick={this.clearModal.bind(this)} type="button">Cancel</Button>

                </ModalFooter>  
                </Modal>
            </>
            
        );
    }
}

if (document.getElementById('login')) {
    ReactDOM.render(<Header />, document.getElementById('login'));
}
