import React, { Component } from 'react';
import Header from './HeaderComponent';
import Headerseller from './HeadersellerComponent';
import Home from './HomeComponent';
import Homeseller from './HomesellerComponent';
import Signupseller from './SignupsellerComponent';
import Signupbuyer from './SignupbuyerComponent';
import Login from './LoginComponent';
import About from './AboutComponent';
import Aboutseller from './AboutsellerComponent';
import Contact from './ContactComponent';
import Contactseller from './ContactsellerComponent';
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

const UsernameContext = React.createContext('');

class Main extends Component{

    constructor(props){
        super(props);
        this.state = { username: '', token: ''};
    }

    onUsernameChange = (username, token) => {
        this.setState({ 
            username: username,
            token: token
        });
    }

    render(){
        const exclusionArray = [
            '/users/signupseller',
            '/profileseller',
            '/homeseller',
            '/contactusseller',
            '/aboutusseller',
            '/postsub',
            '/submissions',
            '/adminverify'
        ]
        return(
            <div>
                <UsernameContext.Provider value={{state: this.state}}>
                    {exclusionArray.indexOf(this.props.location.pathname) < 0 && <Header />}
                    {exclusionArray.indexOf(this.props.location.pathname) >= 0 && <Headerseller />}
                    <Switch>
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/homeseller" component={Homeseller} />
                        <Route exact path="/users/signupseller" component={Signupseller}/>
                        <Route exact path="/users/signupbuyer" component={Signupbuyer}/>
                        <Route exact path="/users/login" component={()=><Login history={this.props.history} onUsernameChange={this.onUsernameChange}/>} />
                        <Route exact path="/aboutus" component={About}/>
                        <Route exact path="/aboutusseller" component={Aboutseller}/>
                        <Route exact path="/contactus" component={()=><Contact history={this.props.history} token={this.state.token}/>}/>
                        <Route exact path="/contactusseller" component={()=><Contactseller history={this.props.history} token={this.state.token}/>}/>
                        <Route exact path="/profileseller" component={()=><ProfileSeller history={this.props.history} username={this.state.username} token={this.state.token}/>}/>
                        <Route exact path="/profilebuyer" component={()=><ProfileBuyer history={this.props.history} username={this.state.username} token={this.state.token}/>}/>
                        <Route exact path="/search" component={Search}/>
                        <Route exact path="/favorite" component={Favorite}/>
                        <Route exact path="/shoppingcart" component={Shoppingcart}/>
                        <Route exact path="/postsub" component={()=><Postsub history={this.props.history} token={this.state.token}/>}/>
                        <Route exact path="/submissions" component={Submissions}/>
                        <Route exact path="/adminverify" component={Adminverify}/>
                        <Redirect to="/home" />
                    </Switch>
                    <Footer />
                </UsernameContext.Provider>
            </div>
        );
    }
}

export default withRouter(Main);