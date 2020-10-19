import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback} from 'reactstrap';
import {Link} from 'react-router-dom';
import Select from 'react-select';
var config = require('../config');

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
            zipcode:'',
            transportation:'',
            care:'',
            interests:[],
            touched: {
                username: false,
                password: false,
                nickname: false,
                phone: false,
                email: false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMultiInputChange = this.handleMultiInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleMultiInputChange = (interests) => {

        var value = [];
        for(var i = 0;i < interests.length;i++){
            value.push(interests[i].value);
        }
        this.setState({interests: value});
        //this.setState({ interests });
    }

    handleSubmit(event){
        event.preventDefault();
        let databody = {
            "username": this.state.username,
            "password": this.state.password,
            "nickname": this.state.nickname,
            "phone": this.state.phone,
            "email": this.state.email,
            "address": this.state.address,
            "city": this.state.city,
            "theState": this.state.theState,
            "zipcode": this.state.zipcode,
            "transportation": this.state.transportation,
            "care": this.state.care,
            "interests": this.state.interests
        }
        fetch(config.serverUrl+'/users/signupbuyer', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) this.props.history.push('/home');
            else
                alert(JSON.stringify(data.err));
        })
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    validate(username, password, nickname, phone, email) {

        const errors = {
            username: '',
            password: '',
            nickname: '',
            phone: '',
            email: ''
        };

        if (this.state.touched.username && username.length < 1)
            errors.username = 'Username should be >= 1 characters';
        else if (this.state.touched.username && username.length > 10)
            errors.username = 'Userame should be <= 10 characters';

        if (this.state.touched.nickname && nickname.length < 1)
            errors.nickname = 'Nickname should be >= 1 characters';
        else if (this.state.touched.nickname && nickname.length > 10)
            errors.nickname = 'Nickname should be <= 10 characters';

        if (this.state.touched.password && password.length < 6)
            errors.password = 'Password should be >= 6 characters';
        else if (this.state.touched.password && password.length > 20)
            errors.password = 'Password should be <= 20 characters';

        const reg = /^\d+$/;
        if (this.state.touched.phone && !reg.test(phone))
            errors.phone = 'Phone Number should contain only numbers';

        if (this.state.touched.phone && phone.length !== 10)
            errors.phone = 'Phone Number should have 10 digits';
            
        if (this.state.touched.email && email.includes("@case.edu") !== true && email.includes("@CASE.EDU") !== true)  
            errors.email = 'Please use your Case email for sign up';



        return errors;
    }

    render(){
        const errors = this.validate(this.state.username, this.state.password, this.state.nickname, this.state.phone, this.state.email);
        const options = [
            { value: 'home', label: 'Home' },
            { value: 'books', label: 'Books' },
            { value: 'stationery', label: 'Stationery' },
            { value: 'electronics', label: 'Electronics' },
            { value: 'motors', label: 'Motors' },
            { value: 'pets', label: 'Pets' }
          ]
        const { interest } = this.state;
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb className="col-5 col-sm-5 col-md-3 col-lg-2">
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Sign up</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3">
                        <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>Sign up</h5>
                        <hr className="seperation" />
                    </div>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col xs={12} md={{size: 6, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="username">Username (Required)</Label>
                                <Input type="text" id="username" name="username" value={this.state.username} valid={errors.username === ''} invalid={errors.username !== ''} onChange={this.handleInputChange} onBlur={this.handleBlur('username')}/>
                                <FormFeedback>{errors.username}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{size: 6, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="password">Password (Required)</Label>
                                <Input type="password" id="password" name="password" value={this.state.password} valid={errors.password === ''} invalid={errors.password !== ''} onChange={this.handleInputChange} onBlur={this.handleBlur('password')}/>
                                <FormFeedback>{errors.password}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{size: 6, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="nickname">Nickname (Required)</Label>
                                <Input type="text" id="nickname" name="nickname" value={this.state.nickname} valid={errors.nickname === ''} invalid={errors.nickname !== ''} onChange={this.handleInputChange} onBlur={this.handleBlur('nickname')}/>
                                <FormFeedback>{errors.nickname}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{size: 6, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="phone">Phone (Required)</Label>
                                <Input type="text" id="phone" name="phone" value={this.state.phone} valid={errors.phone === ''} invalid={errors.phone !== ''} onChange={this.handleInputChange} onBlur={this.handleBlur('phone')}/>
                                <FormFeedback>{errors.phone}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{size: 6, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="email">Email (Required)</Label>
                                <Input type="text" id="email" name="email" value={this.state.email} valid={errors.email === ''} invalid={errors.email !== ''} onChange={this.handleInputChange} onBlur={this.handleBlur('email')}/>
                                <FormFeedback>{errors.email}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{size: 6, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="address">Address</Label>
                                <Input type="text" id="address" name="address" value={this.state.address} onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{size: 2, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="city">City</Label>
                                <Input type="text" id="city" name="city" value={this.state.city} onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={2}>
                            <FormGroup>
                                <Label htmlFor="theState">State</Label>
                                <Input type="text" id="theState" name="theState" value={this.state.theState} onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={2}>
                            <FormGroup>
                                <Label htmlFor="zipcode">Zipcode</Label>
                                <Input type="text" id="zipcode" name="zipcode" value={this.state.zipcode} onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{size: 3, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="transportation">Preferred Transportation</Label>
                                <select name="transportation" className="select-list" onChange={this.handleInputChange}>
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
                                <select name="care" className="select-list" onChange={this.handleInputChange}>
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
                                    value= {interest}
                                    options={options}
                                    classNamePrefix="select"
                                    onChange={this.handleMultiInputChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <FormGroup className="col-12 col-md-2 offset-md-3">
                            <Button disabled={errors.username !== ''||errors.password!==''||errors.nickname!==''||errors.phone!==''||errors.email!==''||this.state.username===''||this.state.password===''||this.state.nickname===''||this.state.phone===''||this.state.email===''} type="submit" value="submit" color="primary" style={{width:"100%", marginBottom:"25px", marginTop:"10px"}}>Sign up</Button>
                        </FormGroup>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Signupbuyer;