import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Sparklines, SparklinesBars } from 'react-sparklines';
import { ProgressBar, Dropdown } from 'react-bootstrap';

// import DatePicker from 'react-datepicker';
// import { Dropdown } from 'react-bootstrap';

export default class Navbar extends Component {
  constructor(props){
    super(props)
  }
  
  render () {
    if(this.props.isPermission){
    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                <a href="/admin/dashboard"><h3>Book Shop Admin</h3></a>
                <a href="/admin/dashboard"><strong>BS AD</strong></a>
            </div>
            <ul className="list-unstyled components">
                <li className="active">
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                    <i className="fas fa-home" />
                    Home
                </a>
                <ul className="collapse list-unstyled" id="homeSubmenu">
                    <li>
                    <a href="/admin/dashboard">Dashboard</a>
                    </li>
                </ul>
                </li>
                <li>
                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                    <i className="fas fa-copy" />
                    Pages
                </a>
                <ul className="collapse list-unstyled" id="pageSubmenu">
                    <li>
                    <a href="/admin/category">Categories</a>
                    </li>
                    <li>
                    <a href="/admin/bill">Bill</a>
                    </li>
                    <li>
                    <a href="/admin/comment">Comment</a>
                    </li>
                    <li>
                    <a href="/admin/product">Product</a>
                    </li>
                    <li>
                    <a href="/admin/producer">Producer</a>
                    </li>
                    <li>
                    <a href="/admin/user">User</a>
                    </li>
                </ul>
                </li>
            </ul>
            <ul className="list-unstyled CTAs">
                <li>
                <a href="https://bootstrapious.com/p/bootstrap-sidebar" className="article">Back to article</a>
                </li>
            </ul>
        </nav>
        
    );
    }else{
      return(
        <></>
      )
    }
  }
  
}
