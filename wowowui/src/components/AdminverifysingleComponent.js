import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Input, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
var config = require('../config');

class Adminverifysingle extends Component{

    constructor(props){
        super(props);

        this.state = {
            image:[],
            title:'',
            price:'',
            quantity:'',
            condition:'',
            delivery:'',
            category:'',
            subCategories:[],
            sizeInfo:'',
            detachable:'',
            careIns:'',
            productInsurance:'',
            damage:''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleApprove = this.handleApprove.bind(this);
        this.handleReject = this.handleReject.bind(this);
    }

    componentDidMount() {
        fetch(config.serverUrl+this.props.path, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                image: data.images,
                title: data.name,
                price: data.price,
                quantity: data.quantity,
                condition: data.condition,
                delivery: data.delivery,
                category: data.category,
                subCategories: data.subCategory,
                sizeInfo: data.sizeInfo,
                productInsurance: data.productInsurance,
                detachable: data.detachable,
                careIns: data.careIns,
                damage: data.damage
            })
        })
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleApprove(event){
        event.preventDefault();
        let databody = {
            "approve": "true",
            "reject": "false",
            "imageScore": this.state.imageScore
        }
        fetch(config.serverUrl+this.props.path, {
            method: 'PUT',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) this.props.history.push('/adminverify');
            else
                alert(JSON.stringify(data.err));
        })
    }

    handleReject(event){
        event.preventDefault();
        let databody = {
            "reject": "true",
            "approve": "false"
        }
        fetch(config.serverUrl+this.props.path, {
            method: 'PUT',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) this.props.history.push('/adminverify');
            else
                alert(JSON.stringify(data.err));
        })
    }

    render(){
        const pic = this.state.image.map((url) => {
            return (
                <div>
                    <iframe style={{width: "220px", marginTop:"20px"}} src={url}></iframe>  
                </div>
            );
        });
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb className="col-5 col-sm-5 col-md-3 col-lg-2">
                        <BreadcrumbItem><Link to='/adminverify'>Verify List</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Review</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="col-12">
                    <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>Approve Posts</h5>
                </div>
                <div className="row">
                    <div className="col-12">
                        <hr className="seperation" />
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        {pic}
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Title:</strong> {this.state.title}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Price:</strong> {this.state.price}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Quantity:</strong> {this.state.quantity}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Condition:</strong> {this.state.condition}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Delivery:</strong> {this.state.delivery}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Category:</strong> {this.state.category}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Subcategories:</strong> {this.state.subCategories}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Size Info:</strong> {this.state.sizeInfo}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Product Insurance:</strong> {this.state.productInsurance}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Detaching Info:</strong> {this.state.detachable}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Care Instruction:</strong> {this.state.careIns}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Description on damage(s):</strong> {this.state.damage}</p>
                    </div>
 
                        <Col sm={6} md={{size:3, offset:3}}>
                            <Form onSubmit={this.handleApprove}>       
                                <FormGroup className="form-style-form-group">
                                    <Input type="text" id="imageScore" name="imageScore" placeholder="ImageScore" value={this.state.imageScore} onChange={this.handleInputChange} style={{alignSelf: "stretch"}}/>
                                </FormGroup>
                                <FormGroup>
                                    <Button block type="submit" value="submit" style={{background:"rgba(132,0,255,0.57)", alignSelf: "stretch", fontFamily:"Arial Black"}}><i class="fa fa-check" aria-hidden="true"></i>Approve</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col sm={6} md={6}></Col>
                        <Col sm={6} md={{size:3, offset:3}}>
                            <Form onSubmit={this.handleReject}>
                                    <FormGroup>
                                        <Button block type="submit" value="submit" style={{background:"rgba(132,0,255,0.57)", alignSelf: "stretch", fontFamily:"Arial Black"}}><i class="fa fa-times" aria-hidden="true"></i>Reject</Button>
                                    </FormGroup>
                            </Form>
                        </Col>

                </div>
            </div>
        );
    }
}

export default Adminverifysingle;