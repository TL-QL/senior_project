import React, { Component } from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import ProfileSeller from './ProfileSellerComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

class Main extends Component {
    render() {

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route exact path="/aboutus" component={About}/>
                    <Route exact path="/contactus" component={Contact}/>
                    <Route exact path="/profileseller" component={ProfileSeller}/>
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(Main);