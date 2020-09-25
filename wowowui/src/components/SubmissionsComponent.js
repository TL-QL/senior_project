import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback} from 'reactstrap';

class Submissions extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="container">
                <div className="col-12">
                    <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>Your Submissions</h5>
                    <hr className="seperation" />
                </div>
            </div>
        );
    }
}

export default Submissions;