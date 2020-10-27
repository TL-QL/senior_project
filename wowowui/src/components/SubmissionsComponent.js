import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {baseUrl} from '../shared/baseUrl';
import { Link } from 'react-router-dom';
var config = require('../config');

class Submissions extends Component{

    constructor(props){
        super(props);

        this.state = {
            items:[]
        }
    }

    componentDidMount() {
        fetch(config.serverUrl+'/submissions/'+this.props.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                items: data
            })
        })
    }

    render(){
        const item = this.state.items.map((item) => {
            return (
                <div key={item.item_id} className="row" style={{marginBottom:"30px"}}>
                    <div className="col-12">
                        <hr className="seperation" />
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <img style={{width: "180px", marginTop:"20px", marginBottom:"20px"}} src={baseUrl+'/images/'+item.images} />
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Title:</strong> {item.name}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Price:</strong> {item.price}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Condition:</strong> {item.condition}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Delivery:</strong> {item.delivery}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Category:</strong> {item.category}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Subcategories:</strong> {item.subCategory}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Size Info:</strong> {item.sizeInfo}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Product Insurance:</strong> {item.productInsurance}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Detaching Info:</strong> {item.detachable}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Care Instruction:</strong> {item.careIns}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Description on damage(s):</strong> {item.damage}</p>
                    </div>
                    <div className="col-12 col-md-2 offset-md-9 border" style={{borderRadius:"5px", backgroundColor:"rgba(132,0,255,0.57)", height:"40px",width:"100%",paddingTop:"8px"}}>
                        <center><strong><Link to={`/editsub/${item.item_id}`} style={{ color: '#FFF' }}><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit</Link></strong></center>
                    </div>
                </div>
            );
        });
        return(
            <div className="container">
                <div className="col-12">
                    <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>Your Submissions</h5>
                </div>
                <div className="row">
                    {item}
                </div>
            </div>
        );
    }
}

export default Submissions;