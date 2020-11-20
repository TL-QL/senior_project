import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback} from 'reactstrap';
import {baseUrl} from '../shared/baseUrl';
import { Link } from 'react-router-dom';
var config = require('../config');

class Home extends Component{

    constructor(props){
        super(props);

        this.state = {
            search:'',
            category:'NA',
            condition:'NA',
            delivery:'NA',
            sort:'NA',
            items: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(config.serverUrl+'/home/'+this.state.search+'/'+this.state.category+'/'+this.state.condition+'/'+this.state.delivery+'/'+this.state.sort, {
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
                <div key={item.item_id} className="row col-12 col-md-8 offset-md-1" style={{marginBottom:"30px", borderStyle:"solid", borderRadius:"10px", borderWidth:"1px", borderColor:"#D7D7D7"}}>
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
                        <p><strong>Seller:</strong> {item.seller}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Favorite:</strong> {item.favoriteCount}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Buy:</strong> {item.shoppingCartCount}</p>
                    </div>
                    <div className="col-6 col-md-4 offset-6 offset-md-8 border" style={{borderRadius:"5px", backgroundColor:"rgba(132,0,255,0.57)", height:"40px",width:"100%",paddingTop:"8px", marginBottom:"20px"}}>
                        <center><strong><Link to={`/itemdetail/${item.item_id}`} style={{ color: '#FFF' }}><i class="fa fa-info-circle" aria-hidden="true"></i> More Info</Link></strong></center>
                    </div>
                </div>
            );
        });

        return(
            <div className="container">
                <div className="col-12">
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col sm={12} md={9} className="mr-auto">
                                <i className="fa fa-search fa-lg icon"></i>
                                <FormGroup>
                                    <Input type="text" className="search-bar" name="search" placeholder="Search.." onChange={this.handleInputChange}/>
                                </FormGroup>
                            </Col>
                            <Col sm={6} md={2}>
                                <FormGroup>
                                    <Button type="submit" className="searchButton"><b><center>Search</center></b></Button>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={2}>
                                <FormGroup>
                                    <select name="category" className="select-list" onChange={this.handleInputChange}>
                                        <option selected disabled>Category</option>
                                        <option value ="home">Home</option>
                                        <option value ="books">Books</option>
                                        <option value ="stationery">Stationery</option>
                                        <option value ="electronics">Electronics</option>
                                        <option value ="motors">Motors</option>
                                        <option value ="pets">Pets</option>
                                    </select> 
                                </FormGroup>
                            </Col>
                            <Col sm= {12} md={4}>
                                <FormGroup>
                                    <select name="condition" className="select-list" onChange={this.handleInputChange}>
                                        <option selected disabled>Condition</option>
                                        <option value ="99">Package has been opened but not used</option>
                                        <option value ="90">Slightly used or color faded</option>
                                        <option value ="70">Visible scratches and visible lost paint/color</option>
                                        <option value ="50">Heavily used but still functional</option>
                                    </select> 
                                </FormGroup>
                            </Col>
                            <Col sm={12} md={2} className="mr-auto">
                                <FormGroup>
                                    <select name="delivery" className="select-list" onChange={this.handleInputChange}>
                                        <option selected disabled>Delivery Option</option>
                                        <option value ="pickup">Pick up</option>
                                        <option value ="delivery">Delivery</option>
                                        <option value ="both">Both</option>
                                    </select> 
                                </FormGroup>
                            </Col>
                            <p style={{marginLeft:"15px"}}>Sorted by</p>
                            <Col xs={12} sm={6} md={2}>
                                <FormGroup>
                                    <select name="sort" className="select-list" onChange={this.handleInputChange}>
                                        <option value ="none">Our Choice</option>
                                        <option value ="high">Price High to Low</option>
                                        <option value ="low">Price Low to High</option>
                                    </select> 
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="col-12" style={{marginTop:"22px"}}>
                    <div className="row">
                        {item}
                    </div>
                </div>
                <div className="col-12">
                    <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>Things that You May be Interested In</h5>
                    <hr className="seperation" />
                </div>
            </div>
        );
    }
}

export default Home;