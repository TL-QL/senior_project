import React, {Component} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl';

class Header extends Component{

    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isModalSignUpOpen: false,
            isModalLoginOpen: false,
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModalSignUp = this.toggleModalSignUp.bind(this);
        this.toggleModalLogin = this.toggleModalLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModalSignUp(){
        this.setState({
            isModalSignUpOpen: !this.state.isModalSignUpOpen,
        });
    }

    toggleModalLogin(){
        this.setState({
            isModalLoginOpen: !this.state.isModalLoginOpen,
        });
    }

    handleSignup(event){
        this.toggleModalSignUp();
        alert("Username: "+this.username.value + " Password: "+this.password.value+" Remember: "+this.remember.checked);
        event.preventDefault();
    }

    handleLogin(event){
        this.toggleModalLogin();
        alert("Username: "+this.username.value + " Password: "+this.password.value+" Remember: "+this.remember.checked);
        event.preventDefault();
    }

    render(){
        return(
            <>
                <Navbar dark bg-primary expand="lg">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src={baseUrl+'/images/logo.png'} height="30" width="41" alt="Wow" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home"><span className="fa fa-home fa-lg"></span> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/profile"><span className="fa fa-user-circle-o fa-lg"></span> Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button className="button-mr" outline onClick={this.toggleModalSignUp}>
                                        <span className="fa fa-user-plus fa-lg"></span> Sign up
                                    </Button>
                                </NavItem>
                                <NavItem>
                                    <Button className="button-mr" outline onClick={this.toggleModalLogin}>
                                        <span className="fa fa-sign-in fa-lg"></span> Login
                                    </Button>
                                </NavItem>
                                <NavItem>
                                    <Button outline className="button-mr">
                                        <span className="fa fa-sign-out fa-lg"></span> Logout
                                    </Button>
                                </NavItem>
                                <NavItem>
                                    <span className="fa fa-heart-o fa-lg fa-cog fa-margin-right fa-margin-top"></span>
                                </NavItem>
                                <NavItem>
                                    <span className="fa fa-shopping-cart fa-lg fa-cog fa-margin-top"></span>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row rowheader">
                            <div className="col-12 col-sm-7">
                                <h1>Welcome to</h1> 
                                <h2>Second-hand Goods Trading Platform!</h2>
                                <p>We will provide you with the best experience of second-hand goods trading at CWRU! You can find cheap goods with good condition here. Or you can post your idle goods here for find their next owners.</p>
                                <p>Start your journey with us NOW!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalSignUpOpen} toggle={this.toggleModalSignUp}>
                    <ModalHeader toggle={this.toggleModalSignUp}>Sign Up</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div class="col-12 col-sm-1"></div>
                            <form action="home.html" className= "col-12 col-sm-4">
                                <Button type="submit" value="submit" color="primary">Sign up as buyer</Button>
                            </form>
                                <div class="col-12 col-sm-2"></div>
                            <form action="home.html" className= "col-12 col-sm-4">
                                <Button type="submit" value="submit" color="primary">Sign up as seller</Button>
                            </form>
                            <div class="col-12 col-sm-1"></div>
                        </div>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isModalLoginOpen} toggle={this.toggleModalLogin}>
                    <ModalHeader toggle={this.toggleModalLogin}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default Header;