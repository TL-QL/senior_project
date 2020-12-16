import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Col, Row} from 'reactstrap';
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
            items: [],
            recommendation: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        if(this.props.location.state){
            fetch(config.serverUrl+'/home/'+this.props.username+'/'+this.props.location.state.search+'/'+this.props.location.state.category+'/'+this.props.location.state.condition+'/'+this.props.location.state.method+'/'+this.props.location.state.sort, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer '+this.props.token
                }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    items: data.search,
                    recommendation: data.recommendation
                })
                //alert(data.recommendation);
            })
        }
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
        if(this.props.username){
            if(this.state.search){
                fetch(config.serverUrl+'/home/'+this.props.username+'/'+this.state.search+'/'+this.state.category+'/'+this.state.condition+'/'+this.state.delivery+'/'+this.state.sort, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'bearer '+this.props.token
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        items: data.search,
                        recommendation: data.recommendation
                    })
                })
            }
            else{
                alert("Must enter keyword!");
                this.props.history.push('/home');
            }
        }
        else{
            alert("You have not logged in!");
            this.props.history.push('/home');
        }
    }


    render(){

        const item = this.state.items.map((item) => {
            return (
                <div key={item.item_id} className="row col-12 col-md-8 offset-md-1" style={{marginBottom:"30px", borderStyle:"solid", borderRadius:"10px", borderWidth:"1px", borderColor:"#D7D7D7"}}>
                    <div className="col-12 col-md-6 offset-md-3">
                    <iframe style={{width: "220px", marginTop:"20px"}} src={item.images[0]}></iframe>
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
                        <center><strong><Link to={{ pathname: `/itemdetail/${item.item_id}` , state: { search: this.state.search, category: this.state.category, condition: this.state.condition, method: this.state.delivery, sort: this.state.sort} }} style={{ color: '#FFF' }}><i class="fa fa-info-circle" aria-hidden="true"></i> More Info</Link></strong></center>
                    </div>
                </div>
            );
        });

        const recs = this.state.recommendation.map((rec) => {
            return (
                <div key={rec.item_id} className="row col-12 col-md-8 offset-md-1" style={{marginBottom:"30px", borderStyle:"solid", borderRadius:"10px", borderWidth:"1px", borderColor:"#D7D7D7"}}>
                    <div className="col-12 col-md-6 offset-md-3">
                    <iframe style={{width: "220px", marginTop:"20px"}} src={rec.images[0]}></iframe>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Title:</strong> {rec.name}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Price:</strong> {rec.price}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Seller:</strong> {rec.seller}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Favorite:</strong> {rec.favoriteCount}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Buy:</strong> {rec.shoppingCartCount}</p>
                    </div>
                    <div className="col-6 col-md-4 offset-6 offset-md-8 border" style={{borderRadius:"5px", backgroundColor:"rgba(132,0,255,0.57)", height:"40px",width:"100%",paddingTop:"8px", marginBottom:"20px"}}>
                        <center><strong><Link to={{ pathname: `/itemdetail/${rec.item_id}` , state: { search: this.state.search, category: this.state.category, condition: this.state.condition, method: this.state.delivery, sort: this.state.sort} }} style={{ color: '#FFF' }}><i class="fa fa-info-circle" aria-hidden="true"></i> More Info</Link></strong></center>
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
                                        <option selected value="NA">Category</option>
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
                                        <option selected value="NA">Condition</option>
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
                                        <option selected value="NA">Delivery Option</option>
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
                    <div className="row">
                        {recs}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;