import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback, CustomInput} from 'reactstrap';
import {Link} from 'react-router-dom';
import Select from 'react-select';
var config = require('../config');

class Postsub extends Component {

    constructor(props){
        super(props);

        this.state = {
            image:'',
            imageURL:'',
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
            damage:'',
            touched: {
                title: false,
                price: false,
                quantity: false
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputFileChange = this.handleInputFileChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMultiInputChange = this.handleMultiInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleInputFileChange(event){
        this.setState({
            image: event.target.files[0].name,
            imageURL: URL.createObjectURL(event.target.files[0])
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

    handleMultiInputChange = (events) => {
        var value = [];
        for(var i = 0;i < events.length;i++){
            value.push(events[i].value);
        }
        this.setState({subCategories: value});
    }


    handleSubmit(event){
        event.preventDefault();
        let databody = {
            "image": this.state.image,
            "title": this.state.title,
            "price": this.state.price,
            "quantity": this.state.quantity,
            "condition": this.state.condition,
            "delivery": this.state.delivery,
            "category": this.state.category,
            "subCategories": this.state.subCategories,
            "sizeInfo": this.state.sizeInfo,
            "detachable": this.state.detachable,
            "careIns": this.state.careIns,
            "productInsurance": this.state.productInsurance,
            "damage": this.state.damage
        }
        fetch(config.serverUrl+'/postsub/'+this.props.username, {
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
                alert(JSON.stringify(data.err));
        })
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    validate(title, price, quantity) {

        const errors = {
            title: '',
            price:'',
            quantity:''
        };

        if (this.state.touched.title && title.length < 1)
            errors.title = 'Title should be >= 1 characters';

        const reg = /^\d+$/;
        if (this.state.touched.price && !reg.test(price))
            errors.price = 'Price should contain only numbers';
        if (this.state.touched.quantity && !reg.test(quantity))
            errors.quantity = 'Quantity should contain only numbers';

        return errors;
    }

    renderSelection(category){
        const options_home = [
            { value: 'furniture', label: 'Furniture' },
            { value: 'livingroom', label: 'Living room' },
            { value: 'bathroom', label: 'Bathroom' },
            { value: 'bedroom', label: 'Bedroom' },
            { value: 'dormroom', label: 'Dorm room' },
            { value: 'kitchen', label: 'Kitchen' },
            { value: 'storageOrganization', label: 'Storage and organization' },
            { value: 'homeDecor', label: 'Home Decor' },
            { value: 'others', label: 'Others' }
        ]
        const options_books = [
            { value: 'textbook', label: 'Textbook' },
            { value: 'others', label: 'Others' }
        ]
        const options_stationery = [
            { value: 'writingUtensils', label: 'Writing Utensils' },
            { value: 'organizationUtensils', label: 'Organization Utensils' },
            { value: 'notebook', label: 'Notebook' },
            { value: 'papers', label: 'Papers' },
            { value: 'others', label: 'Others' }
        ]
        const options_electronics = [
            { value: 'computer', label: 'Computer' },
            { value: 'phone', label: 'Phone' },
            { value: 'iclicker', label: 'iClicker' },
            { value: 'ipad', label: 'iPad' },
            { value: 'TV', label: 'TV' },
            { value: 'gaming', label: 'Gaming' },
            { value: 'headphone', label: 'Headphone' },
            { value: 'printer', label: 'Printer' },
            { value: 'others', label: 'Others' }
        ]
        const options_motors = [
            { value: 'bike', label: 'Bike' },
            { value: 'car', label: 'Phone' },
            { value: 'unicycle', label: 'Unicycle' },
            { value: 'skateboard', label: 'Skateboard' },
            { value: 'others', label: 'Others' }
        ]
        const options_pets = [
            { value: 'petSupplies', label: 'Pet Supplies' },
            { value: 'petFood', label: 'Pet Food' },
            { value: 'others', label: 'Others' }
        ]
        if(category == 'home'){
            return(
                options_home
            );
        }
        else if(category == 'books'){
            return(
                options_books
            );
        }
        else if(category== 'stationery'){
            return(
                options_stationery
            );
        }
        else if(category == 'electronics'){
            return(
                options_electronics
            );
        }
        else if(category == 'motors'){
            return(
                options_motors
            );
        }
        // pets
        else{
            return(
                options_pets
            );
        }
    }

    render() {
        const errors = this.validate(this.state.title, this.state.price, this.state.quantity);
        const { subCategory } = this.state;
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
                                <Col sm={12} md={{size:6, offset:3}}>
                                    <FormGroup>
                                        <CustomInput type="file" id="img" name="img" label="Upload Images" onChange={this.handleInputFileChange}/>
                                        <img style={{width: "180px", marginTop:"20px"}} src={this.state.imageURL} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:3}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="title" className="form-style-label">Title (Required)</Label>
                                        <Input type="text" id="title" name="title" className="form-style-input" placeholder="Title" value={this.state.title} valid={errors.title === ''} invalid={errors.title !== ''} onChange={this.handleInputChange} onBlur={this.handleBlur('title')}/>
                                        <FormFeedback>{errors.title}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={{size:6, offset:3}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="price" className="form-style-label">Price (Required)</Label>
                                        <Input type="text" id="price" name="price" className="form-style-input" placeholder="Price in US Dollar" value={this.state.price} valid={errors.price === ''} invalid={errors.price !== ''} onChange={this.handleInputChange}/>
                                        <FormFeedback>{errors.price}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={{size:6, offset:3}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="quantity" className="form-style-label">Quantity</Label>
                                        <Input type="text" id="quantity" name="quantity" className="form-style-input" value={this.state.quantity} valid={errors.quantity=== ''} invalid={errors.quantity !== ''} onChange={this.handleInputChange}/>
                                        <FormFeedback>{errors.quantity}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6} md={{size:6, offset:3}}>
                                    <FormGroup>
                                        <select name="condition" className="select-list" onChange={this.handleInputChange}>
                                            <option selected disabled>Condition (Required)</option>
                                            <option value ="99">99% new - Package has been opened but not used</option>
                                            <option value ="90">90% new - Slightly used or color faded</option>
                                            <option value ="70">70% new - Visible scratches and visible lost paint/color</option>
                                            <option value ="50">50% new - Heavily used but still functional</option>
                                        </select> 
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6} md={{size:6, offset:3}}>
                                    <FormGroup>
                                        <select name="delivery" className="select-list" onChange={this.handleInputChange}>
                                            <option selected disabled>Delivery Option (Required)</option>
                                            <option value ="pickup">Pick up</option>
                                            <option value ="delivery">Delivery</option>
                                            <option value ="both">Both</option>
                                        </select> 
                                    </FormGroup>
                                </Col>
                            </Row>
                            <div className="col-12 col-md-6 offset-md-3">
                                <p style={{fontSize:"16px", fontFamily:"Arial Black"}}>More about your goods</p>
                                <p style={{fontSize:"12px", marginTop:"-20px"}}>Please provide as much info as possible.</p>
                            </div>
                            <Row>
                                <Col xs={12} md={6} md={{size:6, offset:3}}>
                                    <FormGroup>
                                        <select name="category" className="select-list" onChange={this.handleInputChange}>
                                            <option selected disabled>Category and Subcategory (Required)</option>
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
                                <Col xs={12} md={6} md={{size:6, offset:3}}>
                                    <FormGroup>
                                        <Label htmlFor="subCategories">Subcategories</Label>
                                        <Select
                                            isMulti
                                            name="subCategories"
                                            value= {subCategory}
                                            options={this.renderSelection(this.state.category)}
                                            classNamePrefix="select"
                                            onChange={this.handleMultiInputChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:3}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="sizeInfo" className="form-style-label">Size Info</Label>
                                        <Input type="text" id="sizeInfo" name="sizeInfo" className="form-style-input" value={this.state.sizeInfo} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:3}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="productInsurance" className="form-style-label">Product Insurance</Label>
                                        <Input type="text" id="productInsurance" name="productInsurance" className="form-style-input" placeholder="Ex. No insurance" value={this.state.productInsurance} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={6} md={{size:6, offset:3}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="detachable" className="form-style-label">Detaching Info</Label>
                                        <Input type="textarea" rows="5" id="detachable" name="detachable" value={this.state.detachable} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:3}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="careIns" className="form-style-label">Care Instruction</Label>
                                        <Input type="textarea" id="careIns" name="careIns" rows="5" value={this.state.careIns} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:3}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="damage" className="form-style-label">Description on damage(s)</Label>
                                        <Input type="textarea" id="damage" name="damage" rows="5" value={this.state.damage} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:3}}>
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