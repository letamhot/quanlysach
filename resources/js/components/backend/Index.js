import React from "react";
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Category from "./Category";
// import CartAD from "./CartAD";
import Product from "./Product";
import Producer from "./Producer";
import User from "./User";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Bill from "./Bill";
import Comment from "./Comment";

export default class Index extends React.Component{
    constructor(){
        super()
        this.state = ({
            isPermission: false,
            isLogin: false

        })
        this.changeHeader = this.changeHeader.bind(this);
        this.handlechangeLogin = this.handlechangeLogin.bind(this);
    }
  changeHeader(e){
      console.log(e);
    this.setState({
        isPermission: e
    });
            
    }
    handlechangeLogin(){
        this.setState({
            isLogin: !this.state.isLogin,
        });
                
        }
  render(){
      
        return (
        <Router>

            <div className="wrapper">
            {/* Sidebar  */}
            
                <Navbar  isPermission={this.state.isPermission} isLogin={this.state.isLogin} />
            
            {/* Page Content  */}
            <div id="content">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button type="button" id="sidebarCollapse" className="btn btn-info">
                        <i className="fas fa-align-left" />
                        <span>Toggle Sidebar</span>
                    </button>
                    <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-align-justify" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav navbar-nav ml-auto">
                            <Header isPermission={this.changeHeader} isLogin={this.handlechangeLogin} />

                        </ul>
                    </div>
                </div>
            </nav>

            <main className="py-4">
            
            
    
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/admin/category"> 
                <Category isPermission={this.state.isPermission} isLogin={this.state.isLogin}/>
                </Route>
                <Route path="/admin/bill"> 
                <Bill isPermission={this.state.isPermission} isLogin={this.state.isLogin}/>
                </Route>
                <Route path="/admin/comment"> 
                <Comment isPermission={this.state.isPermission} isLogin={this.state.isLogin}/>
                </Route>
                
                <Route path="/admin/user">
                <User isPermission={this.state.isPermission} isLogin={this.state.isLogin}/>
                </Route>
                <Route path="/admin/dashboard">
                <Dashboard isPermission={this.state.isPermission} isLogin={this.state.isLogin}/>
                </Route>
                <Route path="/admin/product">
                <Product isPermission={this.state.isPermission} isLogin={this.state.isLogin}/>
                </Route>
                <Route path="/admin/producer">
                <Producer isPermission={this.state.isPermission} isLogin={this.state.isLogin}/>
                </Route>
            </Switch>
            </main>

            </div>
            </div>
            
        </Router>
        
        );
    }
}
  if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}