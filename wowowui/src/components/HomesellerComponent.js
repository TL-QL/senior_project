import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl';


class Homeseller extends Component{

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
                <div className="row">
                    <div className="col-6">
                        <Link to={'/postsub'}>
                            <CardImg style={{width:"60%",marginTop:"5%"}} src={baseUrl+"/images/post.png"} alt="Post your goods" />
                            <CardImgOverlay>
                                <CardTitle>Post Your Goods</CardTitle>
                            </CardImgOverlay>
                        </Link>
                    </div>
                    <div className="col-6">
                        <Link to={'/submissions'}>
                            <CardImg style={{width:"60%",height:"80%",marginTop:"10%"}} src={baseUrl+"/images/submissions.png"} alt="Your submissions" />
                            <CardImgOverlay>
                                <CardTitle>Your Submissions</CardTitle>
                            </CardImgOverlay>	
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homeseller;