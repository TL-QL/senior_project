import React, {Component} from 'react';
import {Button, Form} from 'reactstrap';
import { Link } from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl';
var config = require('../config');

class Shoppingcart extends Component{

    constructor(props){
        super(props);

        this.state = {
            items: []
        }

        this.handleBuy = this.handleBuy.bind(this);
    }

    componentDidMount() {
        fetch(config.serverUrl+'/shoppingcart/'+this.props.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                items: data
            })
        })
    }

    handleBuy(item_id, event){
        event.preventDefault();
        let databody = {
            "buy": -1,
            "item_id": item_id
        }
        fetch(config.serverUrl+'/shoppingcart/'+this.props.username, {
            method: 'PUT',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                alert(JSON.stringify(data.status));
                this.props.history.push('/shoppingcart');
            }
            else
                alert(JSON.stringify(data.err));
        })
    }

    render(){
        const item = this.state.items.map((item) => {
            return (
                <div key={item.item_id} className="row col-12 col-md-8 offset-md-1" style={{marginBottom:"30px", borderStyle:"solid", borderRadius:"10px", borderWidth:"1px", borderColor:"#D7D7D7"}}>
                    <div className="col-12 col-md-6 offset-md-3">
                        <img style={{width: "180px", marginTop:"20px", marginBottom:"20px"}} src={baseUrl+'/images/'+item.images} />
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Title:</strong> {item.name}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Price:</strong> {item.price}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Seller:</strong> {item.seller}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Favorite:</strong> {item.favoriteCount}</p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <p><strong>Buy:</strong> {item.shoppingCartCount}</p>
                    </div>
                    <div className="col-6 col-md-2 offset-md-6">
                        <Form onSubmit={this.handleBuy.bind(this, item.item_id)} class="form-style">
                            <Button type="submit" value="submit" style={{background:"rgba(132,0,255,0.43)", height:"40px", width:"100%", fontFamily:"Arial Black",border:"none"}}>
                                <i class="fa fa-cart-plus" aria-hidden="true"></i>
                            </Button>
                        </Form>
                    </div>
                    <div className="col-6 col-md-4 border" style={{borderRadius:"5px", backgroundColor:"rgba(132,0,255,0.43)", height:"40px",width:"100%",paddingTop:"8px", marginBottom:"20px"}}>
                        <center><strong><Link to={`/itemdetail/${item.item_id}`} style={{ color: '#FFF' }}><i class="fa fa-info-circle" aria-hidden="true"></i> More Info</Link></strong></center>
                    </div>
                </div>
            );
        });
        return(
            <div className="container">
                <div className="col-12">
                    <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>My Shopping Cart</h5>
                    <hr className="seperation" />
                </div>
                {item}
            </div>
        );
    }
}

export default Shoppingcart;