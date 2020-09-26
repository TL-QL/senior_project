import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback, CustomInput} from 'reactstrap';
import {Link} from 'react-router-dom';

class Postsub extends Component {

    constructor(props){
        super(props);

        this.state = {
            image:'',
            title:'',
            price:'',
            condition:'',
            delivery:'',
            address:'',
            phone:'',
            email:'',
            category:'',
            subCategory:'',
            sizeInfo:'',
            detachable:'',
            careIns:'',
            productInsurance:'',
            damage:''
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

    validate(title, address, phone, email) {

        const errors = {
            title: '',
            address: '',
            phone: '',
            email: ''
        };

        if (title.length < 1)
            errors.title = 'Title should be >= 1 characters';

        if (address.length < 1)
            errors.address = 'Address should be >= 1 characters';

        const reg = /^\d+$/;

        if (!reg.test(phone))
            errors.phone = 'Phone Number should contain only numbers';
            
        if (email.split('').filter(x => x === '@').length !== 1) 
            errors.email = 'Email should contain a @';

        return errors;
    }

    render() {
        const errors = this.validate(this.state.title, this.state.address, this.state.phone, this.state.email);
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Seller Post</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>Post Your Goods</h5>
                        <hr className="seperation" />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <Form onSubmit={this.handleSubmit} class="form-style">
                            <Row>
                                <Col sm={12} md={3}>
                                    <FormGroup>
                                        <CustomInput type="file" id="img" name="img" label="Upload Images"/>
                                    </FormGroup>
                                </Col>
                                <Col sm={12} md={{size:6, offset:1}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="title" className="form-style-label">Title</Label>
                                        <Input type="text" id="title" name="title" className="form-style-input" placeholder="Title" value={this.state.title} valid={errors.title === ''} invalid={errors.title !== ''} onChange={this.handleInputChange}/>
                                        <FormFeedback>{errors.title}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={{size:6, offset:4}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="price" className="form-style-label">Price</Label>
                                        <Input type="text" id="price" name="price" className="form-style-input" placeholder="Price in US Dollar" value={this.state.price} valid={errors.price === ''} invalid={errors.price !== ''} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6} md={{size:6, offset:4}}>
                                    <FormGroup>
                                        <select name="condition" className="select-list">
                                            <option selected disabled>Condition</option>
                                            <option value ="99">99% new - Package has been opened but not used</option>
                                            <option value ="90">90% new - Slightly used or color faded</option>
                                            <option value ="70">70% new - Visible scratches and visible lost paint/color</option>
                                            <option value ="50">50% new - Heavily used but still functional</option>
                                        </select> 
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6} md={{size:6, offset:4}}>
                                    <FormGroup>
                                        <select name="delivery" className="select-list">
                                            <option selected disabled>Delivery Option</option>
                                            <option value ="pickup">Pick up</option>
                                            <option value ="delivery">Delivery</option>
                                            <option value ="both">Both</option>
                                        </select> 
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6} md={{size:6, offset:4}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="address" className="form-style-label">Address</Label>
                                        <Input type="text" id="address" name="address" className="form-style-input" placeholder="Address" value={this.state.address} valid={errors.address === ''} invalid={errors.address !== ''} onChange={this.handleInputChange}/>
                                        <FormFeedback>{errors.address}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={{size:3, offset:4}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="phone" className="form-style-label">Phone</Label>
                                        <Input type="text" id="phone" name="phone" className="form-style-input" placeholder="Phone" value={this.state.phone} valid={errors.phone === ''} invalid={errors.phone !== ''} onChange={this.handleInputChange}/>
                                        <FormFeedback>{errors.phone}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} md={3}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="email" className="form-style-label">Email</Label>
                                        <Input type="text" id="email" name="email" className="form-style-input" placeholder="Email" value={this.state.email} valid={errors.email === ''} invalid={errors.email !== ''} onChange={this.handleInputChange}/>
                                        <FormFeedback>{errors.email}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <div className="col-12 col-md-6 offset-md-4">
                                <p style={{fontSize:"16px", fontFamily:"Arial Black"}}>More about your goods</p>
                                <p style={{fontSize:"12px", marginTop:"-20px"}}>Please provide as much info as possible.</p>
                            </div>
                            <Row>
                                <Col xs={12} md={6} md={{size:6, offset:4}}>
                                    <FormGroup>
                                        <select name="category" className="select-list">
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
                            </Row>
                            <Row>
                                <Col xs={12} md={6} md={{size:6, offset:4}}>
                                    <FormGroup>
                                        <select name="subCategory" className="select-list">
                                            <option selected disabled>Subcategory</option>
                                        </select> 
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:4}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="sizeinfo" className="form-style-label">Size Info</Label>
                                        <Input type="text" id="sizeinfo" name="sizeinfo" className="form-style-input" placeholder="Size Info" value={this.state.sizeInfo} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:4}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="productInsurance" className="form-style-label">Product Insurance</Label>
                                        <Input type="text" id="productInsurance" name="productInsurance" className="form-style-input" placeholder="Ex. No insurance" value={this.state.productInsurance} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={6} md={{size:6, offset:4}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="detachable" className="form-style-label">Detaching Info</Label>
                                        <Input type="textarea" rows="5" id="detachable" name="detachable" value={this.state.detachable} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:4}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="careIns" className="form-style-label">Care Instruction</Label>
                                        <Input type="textarea" id="careIns" name="careIns" rows="5" value={this.state.careIns} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:4}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="damage" className="form-style-label">Description on damage(s)</Label>
                                        <Input type="textarea" id="damage" name="damage" rows="5" value={this.state.damage} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:4}}>
                                    <FormGroup>
                                        <Button type="submit" value="submit" style={{background:"rgba(132,0,255,0.57)", width:"100%", fontFamily:"Arial Black"}}>Submit</Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Postsub;