import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback} from 'reactstrap';

class Home extends Component{

    constructor(props){
        super(props);

        this.state = {
            search:'',
            category:'',
            condition:'',
            delivery:'',
            sort:''
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
        console.log("Current State is: "+JSON.stringify(this.state));
        alert("Current State is: "+JSON.stringify(this.state));
        event.preventDefault();
    }


    render(){
        return(
            <div className="container">
                <div className="col-12">
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <i className="fa fa-search fa-lg icon"></i>
                            <Col md={9} className="mr-auto">
                                <FormGroup>
                                    <Input type="text" className="search-bar" name="search" placeholder="Search.." />
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Button type="submit" className="searchButton"><b><center>Search</center></b></Button>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={2}>
                                <FormGroup style={{marginLeft:"30px"}}>
                                    <select name="category" className="select-list">
                                        <option selected disabled>Category</option>
                                        <option value ="Home">Home</option>
                                        <option value ="Books">Books</option>
                                        <option value ="Stationery">Stationery</option>
                                        <option value ="Electronics">Electronics</option>
                                        <option value ="Motors">Motors</option>
                                        <option value ="Pets">Pets</option>
                                    </select> 
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <select name="condition" className="select-list">
                                        <option selected disabled>Condition</option>
                                        <option value ="99">Package has been opened but not used</option>
                                        <option value ="90">Slightly used or color faded</option>
                                        <option value ="70">Visible scratches and visible lost paint/color</option>
                                        <option value ="50">Heavily used but still functional</option>
                                    </select> 
                                </FormGroup>
                            </Col>
                            <Col md={2} className="mr-auto">
                                <FormGroup>
                                    <select name="delivery" className="select-list">
                                        <option selected disabled>Delivery Option</option>
                                        <option value ="pickup">Pick up</option>
                                        <option value ="delivery">Delivery</option>
                                        <option value ="both">Both</option>
                                    </select> 
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <p>Sorted by</p>
                            </Col>
                            <Col md={2} style={{marginLeft:"-100px", marginRight:"-10px"}}>
                                <FormGroup>
                                    <select name="sort" className="select-list">
                                        <option value ="none">Our Choice</option>
                                        <option value ="price-high">Price High to Low</option>
                                        <option value ="price-low">Price Low to High</option>
                                    </select> 
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="col-12">
                    <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>Things that You may Interested In</h5>
                    <hr className="seperation" />
                </div>
            </div>
        );
    }
}

export default Home;