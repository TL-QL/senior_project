import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback} from 'reactstrap';
import {Link} from 'react-router-dom';
import Select from 'react-select';

class Signupbuyer extends Component{

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            nickname: '',
            phone:'',
            email: '',
            address:'',
            city:'',
            theState:'',
            zipcode:''
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

    validate(username, password, nickname, phone, email, zipcode) {

        const errors = {
            username: '',
            password: '',
            nickname: '',
            telnum: '',
            email: '',
            zipcode: '',
            transportation:'',
            care: '',
            interests: ''
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
        if (!reg.test(phone))
            errors.phone = 'Phone Number should contain only numbers';
            
        if (email.split('').filter(x => x === '@').length !== 1) 
            errors.email = 'Email should contain a @';

        if (zipcode.length !== 5)
            errors.zipcode = 'First Name should be 5 characters';

        return errors;
    }

    render(){
        const errors = this.validate(this.state.username, this.state.password, this.state.nickname, this.state.phone, this.state.email, this.state.zipcode);
        const options = [
            { value: 'home', label: 'Home' },
            { value: 'books', label: 'Books' },
            { value: 'stationery', label: 'Stationery' },
            { value: 'electronics', label: 'Electronics' },
            { value: 'motors', label: 'Motors' },
            { value: 'pets', label: 'Pets' }
          ]
        return(
            <div className="container">
                <div className="col-5 col-md-2">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Sign up</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="col-12 col-md-6 offset-md-3">
                    <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>Sign up</h5>
                    <hr className="seperation" />
                </div>
                <Form onSubmit={this.handleLogin}>
                    <Row>
                        <Col xs={12} md={{size: 6, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{size: 6, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{size: 6, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="nickname">Nickname</Label>
                                <Input type="text" id="nickname" name="nickname"
                                    innerRef={(input) => this.nickname = input}  />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{size: 6, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="phone">Phone</Label>
                                <Input type="text" id="phone" name="phone"
                                    innerRef={(input) => this.phone = input}  />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{size: 6, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="text" id="email" name="email"
                                    innerRef={(input) => this.email = input}  />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{size: 6, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="address">Address</Label>
                                <Input type="text" id="address" name="address"
                                    innerRef={(input) => this.address = input}  />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{size: 2, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="city">City</Label>
                                <Input type="text" id="city" name="city"
                                    innerRef={(input) => this.city = input}  />
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={2}>
                            <FormGroup>
                                <Label htmlFor="theState">State</Label>
                                <Input type="text" id="theState" name="theState"
                                    innerRef={(input) => this.theState = input}  />
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={2}>
                            <FormGroup>
                                <Label htmlFor="zipcode">Zipcode</Label>
                                <Input type="text" id="zipcode" name="zipcode"
                                    innerRef={(input) => this.zipcode = input}  />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{size: 3, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="transportation">Preferred Transportation</Label>
                                <select name="transportation" className="select-list">
                                    <option selected disabled>---</option>
                                    <option value ="drive">Drive</option>
                                    <option value ="transit">Transit</option>
                                    <option value ="bike">Bike</option>
                                    <option value ="walk">Walk</option>
                                </select> 
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={3}>
                            <FormGroup>
                                <Label htmlFor="care">You care more about</Label>
                                <select name="care" className="select-list">
                                    <option selected disabled>---</option>
                                    <option value ="feature">Getting all my features</option>
                                    <option value ="price">Having the cheapest price</option>
                                </select> 
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{size: 6, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="interests">What kinds of goods are you interested in?</Label>
                                <Select
                                    isMulti
                                    name="interests"
                                    options={options}
                                    classNamePrefix="select"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <FormGroup className="col-12 col-md-2 offset-md-3">
                            <Button type="submit" value="submit" color="primary" style={{width:"100%", marginBottom:"25px", marginTop:"10px"}}>Sign up</Button>
                        </FormGroup>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Signupbuyer;