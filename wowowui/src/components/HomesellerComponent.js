import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback} from 'reactstrap';

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
                    <div className="col-12">
                        <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>Wowwww</h5>
                        <hr className="seperation" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Homeseller;