import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import '../../../../css/style.css';
import NumberFormat from 'react-number-format';


export default class Categories extends Component{
    constructor(){
        super()
        this.state = ({
            categories:[]
        })
        this.loadCategory = this.loadCategory.bind(this);

    }
  
    loadCategory(){
        axios.get('/api/category').then(res => {
            console.log('res', res.data.data);  
            this.setState({
                categories: res.data.data
            });
                
        });  
    }
    componentWillMount(){
        this.loadCategory();
        
    }
    
    render(){
       let category = this.state.categories.map(category =>{
            return(
                <div className="panel panel-default" key={category.id}>
                <div className="panel-heading" role="tab" id="headingOne">
                    <h4 className="panel-title">
                        <a href={'/product/'+ category.slug}>{category.name}
                        </a>
                    </h4>
                </div>
            </div>
            )
       });
        return(
            <div className="col-md-4 col-lg-2">
                <div className="sidebar">
                    <div className="sidebar-box-2">
                        <h2 className="heading">Categories</h2>
                        <div className="fancy-collapse-panel">
                            <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                              {category}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}