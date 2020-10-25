import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback} from 'reactstrap';
import {Link} from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl';
var config = require('../config');

class Contactseller extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            phone:'',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: '',
            touched: {
                firstname: false,
                lastname: false,
                phone: false,
                email: false
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
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
        event.preventDefault();
        let databody = {
            "firstname": this.state.firstname,
            "lastname": this.state.lastname,
            "phone": this.state.phone,
            "email": this.state.email,
            "agree": this.state.agree,
            "contactType": this.state.contactType,
            "message": this.state.message
        }
        fetch(config.serverUrl+'/contactus', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) this.props.history.push('/homeseller');
            else
                alert(JSON.stringify(data));
        })
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    validate(firstname, lastname, phone, email) {

        const errors = {
            firstname: '',
            lastname: '',
            phone: '',
            email: ''
        };

        if (this.state.touched.firstname && firstname.length < 3)
            errors.firstname = 'First Name should be >= 3 characters';
        else if (this.state.touched.firstname && firstname.length > 10)
            errors.firstname = 'First Name should be <= 10 characters';

        if (this.state.touched.lastname && lastname.length < 3)
            errors.lastname = 'Last Name should be >= 3 characters';
        else if (this.state.touched.lastname && lastname.length > 10)
            errors.lastname = 'Last Name should be <= 10 characters';

        const reg = /^\d+$/;
        if (this.state.touched.phone && !reg.test(phone))
            errors.phone = 'Tel. Number should contain only numbers';
            
        if (this.state.touched.email && email.split('').filter(x => x === '@').length !== 1) 
            errors.email = 'Email should contain a @';

        return errors;
    }

    render() {
        const errors = this.validate(this.state.firstname, this.state.lastname, this.state.phone, this.state.email);
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>

                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-md-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                                10900 Euclid Ave<br />
                                Cleveland, OH 44106<br />
                                United States<br />
                                <br />
                                <div className="btn-group" role="group">
                                    <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                                    <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                                    <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                                </div>
                                <br />
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Our Location</h5>
                        <img src={baseUrl+'/images/cwru.jpg'} alt="CWRU" style={{width:"80%"}}/>
                    </div>
                </div>

                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us Your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstname" name="firstname" placeholder="First Name" value={this.state.firstname} valid={errors.firstname === ''} invalid={errors.firstname !== ''} onChange={this.handleInputChange} onBlur={this.handleBlur('firstname')}/>
                                    <FormFeedback>{errors.firstname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastname" name="lastname" placeholder="Last Name" value={this.state.lastname} valid={errors.lastname === ''} invalid={errors.lastname !== ''} onChange={this.handleInputChange} onBlur={this.handleBlur('lastname')}/>
                                    <FormFeedback>{errors.lastname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="phone" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Input type="tel" id="phone" name="phone" placeholder="Tel. Number" value={this.state.phone} valid={errors.phone === ''} invalid={errors.phone !== ''} onChange={this.handleInputChange} onBlur={this.handleBlur('phone')}/>
                                    <FormFeedback>{errors.phone}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email" placeholder="Email" value={this.state.email} valid={errors.email === ''} invalid={errors.email !== ''} onChange={this.handleInputChange} onBlur={this.handleBlur('telnum')} />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col> 
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 6, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="agree" checked={this.state.agree} onChange={this.handleInputChange} /> {' '} <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Input type="select" name="contactType" value={this.state.contactType} onChange={this.handleInputChange}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="message" name="message" rows="12" value={this.state.message} onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size:10, offset:2}}>
                                    <Button disabled={errors.firstname !== ''||errors.lastname!==''||errors.phone!==''||errors.email!==''||this.state.firstname===''||this.state.lastname===''||this.state.phone===''||this.state.email===''} type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Contactseller;