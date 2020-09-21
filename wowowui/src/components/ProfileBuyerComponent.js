import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback} from 'reactstrap';
import {Link} from 'react-router-dom';

class ProfileBuyer extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            nickname: '',
            telnum:'',
            email: '',
            address:'',
            city:'',
            theState:'',
            zipcode:'',
            transportation:'',
            care:'',
            interests:''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
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

    validate(username, password, nickname, telnum, email, zipcode) {

        const errors = {
            username: '',
            password: '',
            nickname: '',
            telnum: '',
            email: '',
            zipcode: ''
        };

        if (username.length < 1)
            errors.username = 'First Name should be >= 1 characters';
        else if (username.length > 10)
            errors.username = 'Userame should be <= 10 characters';

        if (nickname.length < 1)
            errors.nickname = 'Nickname should be >= 1 characters';
        else if (nickname.length > 10)
            errors.nickname = 'Nickname should be <= 10 characters';

        if (password.length < 6)
            errors.password = 'Password should be >= 6 characters';
        else if (password.length > 20)
            errors.password = 'Password should be <= 20 characters';

        const reg = /^\d+$/;
        if (!reg.test(telnum))
            errors.telnum = 'Phone Number should contain only numbers';
            
        if (email.split('').filter(x => x === '@').length !== 1) 
            errors.email = 'Email should contain a @';

        if (zipcode.length !== 5)
            errors.zipcode = 'First Name should be 5 characters';

        return errors;
    }

    render() {
        const errors = this.validate(this.state.username, this.state.password, this.state.nickname, this.state.telnum, this.state.email, this.state.zipcode);
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Profile</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3><b>Profile for <em>Nickname</em></b></h3>
                    </div>
                </div>

                <div className="row row-content">
                    <div className="col-12">
                        <h3>Account Details</h3>
                        <hr className="seperation" />
                    </div>
                    <div className="col-12">
                        <Form onSubmit={this.handleSubmit} class="form-style">
                            <Row>
                                <Col md={6}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="username" className="form-style-label">Username</Label>
                                        <Input type="text" id="username" name="username" className="form-style-input" placeholder="Username" value={this.state.username} valid={errors.username === ''} invalid={errors.username !== ''} onChange={this.handleInputChange}/>
                                        <FormFeedback>{errors.username}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="password" className="form-style-label">Password</Label>
                                        <Input type="text" id="password" name="password" className="form-style-input" placeholder="Password" value={this.state.password} valid={errors.password === ''} invalid={errors.password !== ''} onChange={this.handleInputChange}/>
                                        <FormFeedback>{errors.password}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="nickname" className="form-style-label">Nickname</Label>
                                        <Input type="text" id="nickname" name="nickname" className="form-style-input" placeholder="Nickname" value={this.state.nickname} valid={errors.nickname === ''} invalid={errors.nickname !== ''} onChange={this.handleInputChange}/>
                                        <FormFeedback>{errors.nickname}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="phone" className="form-style-label">Phone</Label>
                                        <Input type="text" id="phone" name="phone" className="form-style-input" placeholder="Phone" value={this.state.phone} valid={errors.phone === ''} invalid={errors.phone !== ''} onChange={this.handleInputChange}/>
                                        <FormFeedback>{errors.phone}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="email" className="form-style-label">Email</Label>
                                        <Input type="text" id="email" name="email" className="form-style-input" placeholder="Email" value={this.state.email} valid={errors.email === ''} invalid={errors.email !== ''} onChange={this.handleInputChange}/>
                                        <FormFeedback>{errors.email}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={5}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="address" className="form-style-label">Address</Label>
                                        <Input type="text" id="address" name="address" className="form-style-input" placeholder="Address" value={this.state.address} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="city" className="form-style-label">City</Label>
                                        <Input type="text" id="city" name="city" className="form-style-input" placeholder="City" value={this.state.city} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="theState" className="form-style-label">State</Label>
                                        <Input type="text" id="theState" name="theState" className="form-style-input" placeholder="State" value={this.state.theState} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="zipcode" className="form-style-label">Zipcode</Label>
                                        <Input type="text" id="zipcode" name="zipcode" className="form-style-input" placeholder="Zipcode" value={this.state.zipcode} valid={errors.zipcode === ''} invalid={errors.zipcode !== ''} onChange={this.handleInputChange}/>
                                        <FormFeedback>{errors.zipcode}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <div className="col-12">
                                <h3>Preferences</h3>
                                <hr className="seperation" />
                            </div>
                            <div className="col-12">
                                <h6><b>What kind of transportation do you prefer?</b></h6>
                            </div>
                            <FormGroup row>
                                <div className="col-2 offset-1 radio-border">
                                    <center>
                                        <input className="radio-custom radio-custom-drive" type="radio" id="Drive" name="transportation" value="Drive" onChange={this.handleInputChange}/> 
                                        <label htmlFor="Drive">Drive</label>
                                    </center>
                                </div>
                                <div className="col-2 radio-border" style={{marginLeft: "20px"}}>
                                    <center>
                                        <input className="radio-custom radio-custom-transit" type="radio" id="Transit" name="transportation" value="Transit" onChange={this.handleInputChange}/> 
                                        <label htmlFor="Transit">Transit</label>
                                    </center>
                                </div>
                                <div className="col-2 radio-border" style={{marginLeft: "20px"}}>
                                    <center>
                                        <input className="radio-custom radio-custom-bike" type="radio" id="Bike" name="transportation" value="Bike" onChange={this.handleInputChange}/> 
                                        <label htmlFor="Bike">Bike</label>
                                    </center>
                                </div>
                                <div className="col-2 radio-border" style={{marginLeft: "20px"}}>
                                    <center>
                                        <input className="radio-custom radio-custom-walk" type="radio" id="Walk" name="transportation" value="Walk" onChange={this.handleInputChange}/> 
                                        <label htmlFor="Walk">Walk</label>
                                    </center>
                                </div>
                            </FormGroup>
                            <div className="col-12">
                                <h6><b>You care more about</b></h6>
                            </div>
                            <FormGroup row>
                                <div className="col-4 offset-1 radio-border">
                                    <center>
                                        <input className="radio-custom radio-custom-bingo" type="radio" id="Price" name="care" value="Price" onChange={this.handleInputChange}/> 
                                        <label htmlFor="Price">Having the cheapest price</label>
                                    </center>
                                </div>
                                <div className="col-4 radio-border" style={{marginLeft: "30px"}}>
                                    <center>
                                        <input className="radio-custom radio-custom-bingo" type="radio" id="Feature" name="care" value="Feature" onChange={this.handleInputChange}/> 
                                        <label htmlFor="Feature">Getting all my features</label>
                                    </center>
                                </div>
                            </FormGroup>
                            <div className="col-12">
                                <h6><b>What kinds of goods are you interested in?</b></h6>
                            </div>
                            <FormGroup>
                                <Row>
                                <div className="col-2 offset-1 radio-border">
                                    <center>
                                        <input className="radio-custom radio-custom-home" type="checkbox" id="Home" name="interests" value="Home" onChange={this.handleInputChange}/> 
                                        <label htmlFor="Home">Home</label>
                                    </center>
                                </div>
                                <div className="col-2 radio-border" style={{marginLeft: "10px"}}>
                                    <center>
                                        <input className="radio-custom radio-custom-books" type="checkbox" id="Books" name="interests" value="Books" onChange={this.handleInputChange}/> 
                                        <label htmlFor="Books">Books</label>
                                    </center>
                                </div>
                                <div className="col-2 radio-border" style={{marginLeft: "10px"}}>
                                    <center>
                                        <input className="radio-custom radio-custom-stationery" type="checkbox" id="Stationery" name="interests" value="Stationery" onChange={this.handleInputChange}/> 
                                        <label htmlFor="Stationery">Stationery</label>
                                    </center>
                                </div>
                                </Row>
                                <Row>
                                <div className="col-2 offset-1 radio-border" style={{marginTop: "5px"}}>
                                    <center>
                                        <input className="radio-custom radio-custom-electronics" type="checkbox" id="Electronics" name="interests" value="Electronics" onChange={this.handleInputChange}/> 
                                        <label htmlFor="Electronics">Electronics</label>
                                    </center>
                                </div>
                                <div className="col-2 radio-border" style={{marginLeft: "10px", marginTop: "5px"}}>
                                    <center>
                                        <input className="radio-custom radio-custom-motors" type="checkbox" id="Motors" name="interests" value="Motors" onChange={this.handleInputChange}/> 
                                        <label htmlFor="Motors">Motors</label>
                                    </center>
                                </div>
                                <div className="col-2 radio-border" style={{marginLeft: "10px", marginTop: "5px"}}>
                                    <center>
                                        <input className="radio-custom radio-custom-pets" type="checkbox" id="Pets" name="interests" value="Pets" onChange={this.handleInputChange}/> 
                                        <label htmlFor="Pets">Pets</label>
                                    </center>
                                </div>
                                </Row>
                            </FormGroup>
                            <Row>
                                <FormGroup style={{marginTop: "20px"}}>
                                    <Button type="submit" className="button-width button-mr" color="primary">
                                        Save
                                    </Button>
                                    <Button type="reset" className="button-width">
                                        Cancel
                                    </Button>
                                </FormGroup>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileBuyer;