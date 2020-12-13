import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col, Label, Input} from 'reactstrap';
import {Link} from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
var config = require('../config');

class Itemdetail extends Component {

    constructor(props){
        super(props);

        this.state = {
            image:[],
            title:'',
            price:'',
            seller:'',
            credit: '',
            favorite:'',
            buy:'',
            quantity:'',
            condition:'',
            delivery:'',
            address:'',
            contact:'',
            sizeInfo:'',
            detachable:'',
            careIns:'',
            productInsurance:'',
            damage:'',
            comments: [],
            rating: -1,
            serviceRating: -1,
            newComment: '',
            touched: {
                rating: false,
                serviceRating: false,
                comment: false
            },
            isModalOpen: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFav = this.handleFav.bind(this);
        this.handleBuy = this.handleBuy.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMultiInputChange = this.handleMultiInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        //alert(JSON.stringify(this.props.location.state));
        fetch(config.serverUrl+this.props.path, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            }
        })
        .then(res => res.json())
        .then(data => {
            var addr;
            if(data.delivery == "delivery") addr = "";
            else
                addr = data.zipcode;
            this.setState({
                image: data.images,
                title: data.name,
                price: data.price,
                seller: data.seller,
                favorite: data.favoriteCount,
                buy: data.shoppingCartCount,
                quantity: data.quantity,
                address: addr,
                contact: data.contact,
                condition: data.condition,
                delivery: data.delivery,
                sizeInfo: data.sizeInfo,
                productInsurance: data.productInsurance,
                detachable: data.detachable,
                careIns: data.careIns,
                damage: data.damage,
                comments: data.comments,
                credit: data.credit
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
            "rating": this.state.rating,
            "serviceRating": this.state.serviceRating,
            "comment": this.state.newComment,
            "username": this.props.username
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
            if(data.success){
                alert(JSON.stringify(data.status));
                this.toggleModal();
                //this.props.history.push(this.props.path);
            }
            else
                alert(JSON.stringify(data.err));
        })
    }

    handleFav(event){
        event.preventDefault();
        let databody = {
            "fav": 1,
            "username": this.props.username
        }
        fetch(config.serverUrl+this.props.path, {
            method: 'PUT',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) alert(JSON.stringify(data.status));
            else
                alert(JSON.stringify(data.err));
        })
    }

    handleBuy(event){
        event.preventDefault();
        let databody = {
            "buy": 1,
            "username": this.props.username
        }
        fetch(config.serverUrl+this.props.path, {
            method: 'PUT',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) alert(JSON.stringify(data.status));
            else
                alert(JSON.stringify(data.err));
        })
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

    validate(rating, serviceRating, newComment) {

        const errors = {
            rating:'',
            serviceRating: '',
            newComment:''
        };

        if (this.state.touched.rating && rating.length < 1)
            errors.rating = 'Rating is required';

        if (this.state.touched.serviceRating && serviceRating.length < 1)
            errors.serviceRating = 'Rating is required';

        if (this.state.touched.newComment && newComment.length < 1)
            errors.newComment = 'Comment is required';

        return errors;
    }


    render() {
        const errors = this.validate(this.state.rating, this.state.serviceRating, this.state.newComment);
        const pic = this.state.image.map((url) => {
            if(url !== ""){
                return (
                    <div className="each-slide" style={{width: "220px", marginTop:"20px"}}>
                        <iframe className="col-md-8 offset-md-3" src={url}></iframe>
                    </div>
                );
            }
        });
        var conditions = {
            "99": "Package has been opened but not used",
            "90": "Slightly used or color faded",
            "70": "Visible scratches and visible lost paint/color",
            "50": "Heavily used but still functional"
        };
        const comment = this.state.comments.map((comment) => {
            return (
                <div className="row col-12 col-md-6 offset-md-3" style={{marginBottom:"30px", borderStyle:"solid", borderRadius:"10px", borderWidth:"1px", borderColor:"#D7D7D7"}}>
                    <div className="col-12" style={{marginTop:"20px"}}>
                        <p><strong>Goods Rating: </strong> 
                            <StarRatingComponent 
                                name="rate1" 
                                starCount={10}
                                value={comment.rating}
                                starColor={"#F59A23"}
                                emptyStarColor={"white"}
                                renderStarIcon={() => <i class="fa fa-heart" aria-hidden="true"></i>}
                                />
                            </p>
                    </div>
                    <div className="col-12" style={{marginTop:"20px"}}>
                        <p><strong>Seller Rating: </strong> 
                            <StarRatingComponent 
                                name="rate2" 
                                starCount={10}
                                value={comment.serviceRating}
                                starColor={"#F59A23"}
                                emptyStarColor={"white"}
                                renderStarIcon={() => <i class="fa fa-heart" aria-hidden="true"></i>}
                                />
                            </p>
                    </div>
                    <div className="col-12">
                        <p><strong>Comment: </strong> {comment.comment}</p>
                    </div>
                </div>
            );
        });

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={{ pathname: '/home' , state: { search: this.props.location.state.search, category: this.props.location.state.category, condition: this.props.location.state.condition, method: this.props.location.state.method, sort: this.props.location.state.sort} }}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Detailed Info</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>Detailed Info</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <hr className="seperation" />
                    </div>
                    <div className="col-12 col-md-3 offset-md-3">
                        <Slide>
                            {pic}
                        </Slide>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Title:</strong> {this.state.title}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Price:</strong> {this.state.price}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Seller:</strong> {this.state.seller} 
                            <StarRatingComponent 
                                name="rate1" 
                                starCount={10}
                                value={this.state.credit}
                                isHalf={true}
                                starColor={"#D9001B"}
                                emptyStarColor={"white"}
                                renderStarIcon={() => <i class="fa fa-star" aria-hidden="true"></i>}
                                renderStarIconHalf={() =><i class="fa fa-star-half" aria-hidden="true" style={{color:"#D9001B"}}></i> }
                                />
                        </p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Favorite:</strong> {this.state.favorite}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Buy:</strong> {this.state.buy}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Quantity:</strong> {this.state.quantity}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Condition:</strong> {conditions[this.state.condition]}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Delivery Option:</strong> {this.state.delivery}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Address:</strong> {this.state.address}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Contact:</strong> {this.state.contact}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <hr className="seperation" style={{marginTop:"20px"}}/>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p style={{fontSize:"16px", fontFamily:"Arial Black"}}>More about the goods</p>
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
                </div>
                <div className="row">
                    <div className="col-12 col-md-3 offset-md-3">
                        <Button onClick={this.toggleModal} style={{background:"rgba(132,0,255,0.43)", width:"100%", fontFamily:"Arial Black", color:"white", border:"none"}}>
                            <i class="fa fa-pencil" aria-hidden="true"></i> Post comment
                        </Button>
                    </div>
                    <div className="col-6 col-md-1 offset-md-1">
                        <Form onSubmit={this.handleFav} class="form-style">
                            <Button type="submit" value="submit" style={{background:"rgba(132,0,255,0.43)", width:"100%", fontFamily:"Arial Black",border:"none"}}>
                                <i class="fa fa-heart" aria-hidden="true"></i>
                            </Button>
                        </Form>
                    </div>
                    <div className="col-6 col-md-1">
                        <Form onSubmit={this.handleBuy} class="form-style">
                            <Button type="submit" value="submit" style={{background:"rgba(132,0,255,0.43)", width:"100%", fontFamily:"Arial Black", border:"none"}}>
                                <i class="fa fa-cart-plus" aria-hidden="true"></i>
                            </Button>
                        </Form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3">
                        <hr className="seperation" style={{marginTop:"50px"}}/>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p style={{fontSize:"16px", fontFamily:"Arial Black"}}>Customer Comments</p>
                    </div>
                </div>
                {comment}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Post Your Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit} class="form-style">
                            <Row>
                                <Col xs={12}>
                                    <FormGroup>
                                        <select name="rating" className="select-list" onChange={this.handleInputChange} valid={errors.rating === ''} invalid={errors.rating !== ''} onBlur={this.handleBlur('rating')}>
                                            <option selected disabled> Goods Rating (Required)</option>
                                            <option value ="0">0</option>
                                            <option value ="1">1</option>
                                            <option value ="2">2</option>
                                            <option value ="3">3</option>
                                            <option value ="4">4</option>
                                            <option value ="5">5</option>
                                            <option value ="6">6</option>
                                            <option value ="7">7</option>
                                            <option value ="8">8</option>
                                            <option value ="9">9</option>
                                            <option value ="10">10</option>
                                        </select> 
                                        <FormFeedback>{errors.rating}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <FormGroup>
                                        <select name="serviceRating" className="select-list" onChange={this.handleInputChange} valid={errors.serviceRating === ''} invalid={errors.serviceRating !== ''} onBlur={this.handleBlur('serviceRating')}>
                                            <option selected disabled> Seller Rating (Required)</option>
                                            <option value ="0">0</option>
                                            <option value ="1">1</option>
                                            <option value ="2">2</option>
                                            <option value ="3">3</option>
                                            <option value ="4">4</option>
                                            <option value ="5">5</option>
                                            <option value ="6">6</option>
                                            <option value ="7">7</option>
                                            <option value ="8">8</option>
                                            <option value ="9">9</option>
                                            <option value ="10">10</option>
                                        </select> 
                                        <FormFeedback>{errors.serviceRating}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="newComment" className="form-style-label">Comment (Required)</Label>
                                        <Input type="textarea" id="newComment" name="newComment" rows="5" value={this.state.newComment} onChange={this.handleInputChange} valid={errors.newComment === ''} invalid={errors.newComment !== ''} onBlur={this.handleBlur('newComment')}/>
                                        <FormFeedback>{errors.newComment}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:3}}>
                                    <FormGroup>
                                        <Button disabled={ this.state.rating < 0 || this.state.serviceRating < 0 || this.state.newComment === '' || errors.rating != '' || errors.serviceRating != '' || errors.newComment != ''} type="submit" value="submit" style={{background:"rgba(132,0,255,0.57)", width:"100%", fontFamily:"Arial Black"}}>Submit</Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Itemdetail;