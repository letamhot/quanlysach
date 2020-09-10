import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import NumberFormat from 'react-number-format';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class CheckOrder extends Component{
    constructor(props){
        super(props)
        this.state =({
            bills: [], 
            Id_delete: ""

        })
        this.loadCheck = this.loadCheck.bind(this);

    }
    //load data Bills
    loadCheck(e=null){

            axios.get('/api/cart/checkOrder').then((response) => {
                // console.log('showbill' ,response);
                this.setState({
                    bills:response.data,

                })
            })
    }

    deleteOrder(){
        axios.delete('/api/deleteOrder/'+this.state.Id_delete).then(response =>{
            // console.log('ress', response.data);
            toast.success("Delete success", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
              this.loadCheck();
        })
    }
    submit(id) {
        this.setState({
            Id_delete: id
        })
        confirmAlert({
          title: 'Confirm to submit',
          message: 'You are sure you want to delete your ordered book?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.deleteOrder()
            },
            {
              label: 'No',
              onClick: () => this.loadCheck()
            }
          ]
        });
    };
  
    componentWillMount(){
        this.loadCheck();
        
        
    }
    renderOrder(){
        return this.state.bills.map((bill) => {
            return(
                <tr key={bill.id}>
                    <td><a type="button" href={`/showOrder/${bill.id}`}>MS{bill.id}</a></td>
                    <td>{bill.phone}</td>
                    <td>{bill.address}</td>
                    <td className="product-remove"><a title="Remove" onClick={this.submit.bind(this, bill.id)}><span className="ion-ios-close" /></a></td>
                </tr>
            )
        });
    }
    render(){
        // console.log('aaaa', this.props.isLogin);
           
            return(
                <div className="container">
                <br />
                <h2 className="text-left"> Thông tin đặt hàng: </h2>

                <div className="row">
                <div className="col-md-12">
                    <div className="cart-list">
                        <table className="table">
                        <thead className="thead-primary">
                            <tr className="text-center">

                                    <th>Mã sản phẩm</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>&nbsp;</th>

                            </tr> 
                        </thead>
                        <tbody>
                            {this.renderOrder()}
                        </tbody>
                        </table>
                    </div>
                </div>
             </div>
             </div>
            )

       
        
    }
}

