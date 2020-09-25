import React, { Component } from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Signupseller from './SignupsellerComponent';
import Signupbuyer from './SignupbuyerComponent';
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

class Main extends Component {
    render() {

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route exact path="/signupseller" component={Signupseller}/>
                    <Route exact path="/signupbuyer" component={Signupbuyer}/>
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
        );
    }
}

export default withRouter(Main);