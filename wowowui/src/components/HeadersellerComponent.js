import React, {Component} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {NavLink, Link} from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl';

class Headerseller extends Component{

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
        this.handeLogout = this.handeLogout.bind(this);
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

    handeLogout(event){
        event.preventDefault();
        this.props.onUsernameChange(this.state.username, '');
        this.props.history.push('/');
    }

    render(){
        return(
            <>
                <Navbar dark bg-primary expand="lg">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/homeseller">
                            <img src={baseUrl+'/images/logo.png'} height="30" width="41" alt="Wow" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/homeseller"><span className="fa fa-home fa-lg"></span> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/profileseller"><span className="fa fa-user-circle-o fa-lg"></span> Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/aboutusseller'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/contactusseller'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
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
                                    <Button className="button-mr" outline onClick={this.handeLogout}>
                                        <span className="fa fa-sign-out fa-lg"></span> Logout
                                    </Button>
                                </NavItem>
                                <NavItem>
                                    <Link to={"/helpseller"} style={{ color: '#FFF' }}>
                                        <span className="fa fa-question-circle fa-lg fa-cog fa-margin-right fa-margin-top"></span>
                                    </Link>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row rowheader">
                            <div className="col-12 col-sm-8">
                                <h1>Welcome to</h1>
                                <h2>Second-hand Goods Trading Platform</h2>
                                <p>We will provide you with the best experience of second-hand goods trading at CWRU! You can find cheap goods with good condition here. Or you can post your idle goods here for find their next owners.</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalSignUpOpen} toggle={this.toggleModalSignUp}>
                    <ModalHeader toggle={this.toggleModalSignUp}>Sign Up</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div class="col-12 col-sm-1"></div>
                            <form action="/users/signupbuyer" className= "col-12 col-sm-4">
                                <Button type="submit" value="submit" color="primary">Sign up as buyer</Button>
                            </form>
                                <div class="col-12 col-sm-2"></div>
                            <form action="/users/signupseller" className= "col-12 col-sm-4">
                                <Button type="submit" value="submit" color="primary">Sign up as seller</Button>
                            </form>
                            <div class="col-12 col-sm-1"></div>
                        </div>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isModalLoginOpen} toggle={this.toggleModalLogin}>
                    <ModalHeader toggle={this.toggleModalLogin}>Login</ModalHeader>
                    <ModalBody>
                    <div className="row">
                            <form action="/users/login" className= "col-12 col-sm-4 offset-sm-4">
                                <Button type="submit" value="submit" color="primary">Go to Login Page</Button>
                            </form>
                    </div>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default Headerseller;