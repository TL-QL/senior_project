import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback} from 'reactstrap';

class Favorite extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="container">
                <div className="col-12">
                    <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>My Favorites</h5>
                    <hr className="seperation" />
                </div>
            </div>
        );
    }
}

export default Favorite;