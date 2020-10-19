import React, { Component } from 'react';
import Header from './HeaderComponent';
import Headerseller from './HeadersellerComponent';
import Home from './HomeComponent';
import Homeseller from './HomesellerComponent';
import Signupseller from './SignupsellerComponent';
import Signupbuyer from './SignupbuyerComponent';
import Login from './LoginComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import ProfileSeller from './ProfileSellerComponent';
import ProfileBuyer from './ProfileBuyerComponent';
import Search from './SearchComponent';
import Favorite from './FavoriteComponent';
import Shoppingcart from './ShoppingcartComponent';
import Postsub from './PostsubComponent';
import Submissions from './SubmissionsComponent';
import Adminverify from './AdminverifyComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

const exclusionArray = [
    '/users/signupseller',
    '/profileseller',
    '/homeseller',
    '/postsub',
    '/submissions',
    '/adminverify'
]

const Main = ({location}) => (
    <div>
        {exclusionArray.indexOf(location.pathname) < 0 && <Header />}
        {exclusionArray.indexOf(location.pathname) >= 0 && <Headerseller />}
        <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/homeseller" component={Homeseller} />
            <Route exact path="/users/signupseller" component={Signupseller}/>
            <Route exact path="/users/signupbuyer" component={Signupbuyer}/>
            <Route exact path="/users/login" component={Login} />
            <Route exact path="/aboutus" component={About}/>
            <Route exact path="/contactus" component={Contact}/>
            <Route exact path="/profileseller" component={ProfileSeller}/>
            <Route exact path="/profilebuyer" component={ProfileBuyer}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path="/favorite" component={Favorite}/>
            <Route exact path="/shoppingcart" component={Shoppingcart}/>
            <Route exact path="/postsub" component={Postsub}/>
            <Route exact path="/submissions" component={Submissions}/>
            <Route exact path="/adminverify" component={Adminverify}/>
            <Redirect to="/home" />
        </Switch>
        <Footer />
    </div>
)

export default withRouter(Main);