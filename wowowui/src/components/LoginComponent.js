import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback} from 'reactstrap';
import {Link} from 'react-router-dom';
var config = require('../config');

class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLoginChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleLogin(event){
        event.preventDefault();
        let databody = {
            "username": this.state.username,
            "password": this.state.password
        }
        fetch(config.serverUrl+'/users/login', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => {
            this.props.onUsernameChange(this.state.username, data.token);
            if(data.seller) this.props.history.push('/homeseller');
            else if(data.admin) this.props.history.push('/adminverify');
            else
                this.props.history.push('/home');
        })
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb className="col-5 col-sm-5 col-md-3 col-lg-2">
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Login</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="col-12 col-md-6 offset-md-3">
                    <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>Login</h5>
                    <hr className="seperation" />
                </div>
                <Form onSubmit={this.handleLogin}>
                    <Row>
                        <Col xs={12} md={{size: 6, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" value={this.state.username} onChange={this.handleLoginChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{size: 6, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" value={this.state.password} onChange={this.handleLoginChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{size: 2, offset:3}}>
                            <FormGroup>
                                <Button type="submit" value="submit" color="primary">Login</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Login;