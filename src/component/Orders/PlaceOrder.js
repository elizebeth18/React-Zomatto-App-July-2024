import React,{Component} from 'react';
import './PlaceOrder.css';
import axios from 'axios';


const base_url = process.env.REACT_APP_API_URL;
const placeOrderUrl = "http://localhost:9112/orders";
 
class PlaceOrder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id:Math.floor(Math.random()*10000),
            rest_name: this.props.match.params.restName,
            name: 'Jilu',
            email: 'a.jilu@a.com',
            cost: 0,
            phone: '4646924955',
            address: 'U Block Delhi',
            menuItem: ''
        }
    }

    renderMenu = (data) => {
        if(data) {
            return data.map((item) => {
                return(
                    <div className='orderItem' key={item.menu_id}>
                        <img src={item.menu_image} alt={item.menu_name}/>
                        <h3>{item.menu_name}</h3>
                        <h4>Rs. {item.menu_price}</h4>
                    </div>
                )
            })
        }
    }

    placeOrder = () => {
        let obj = this.state;
        obj.menuItem = sessionStorage.getItem('menu');
        console.log(obj);

        axios.post(placeOrderUrl, JSON.stringify(obj),{
            headers:{
                'accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then((response) => {
            //console.log(response);
            this.props.history.push('/viewOrder');
        }).catch((error) => {
            console.error(error)
        })
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }


    render () {
        return (
            <div className="container">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3>Your Order from the resturant {this.state.rest_name}</h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label>Name</label>
                                <input className="form-control" name="name"
                                value={this.state.name} 
                                onChange={this.handleChange}/>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input className="form-control" name="email"
                                value={this.state.email} 
                                onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Phone</label>
                                <input className="form-control" name="phone"
                                value={this.state.phone} 
                                onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Address</label>
                                <input className="form-control" name="address"
                                value={this.state.address} 
                                onChange={this.handleChange} />
                            </div>
                            {this.renderMenu(this.state.menuItem)}
                            <div className="row">
                                <div className="col-md-12">
                                    <h2>Total Price is Rs. {this.state.cost}</h2>
                                </div>
                            </div>
                            <button className="btn btn-success" onClick={this.placeOrder}>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    //calling post api
    componentDidMount() {
        let menuItem = sessionStorage.getItem('menu');
        let orderId = [];
        let data = [];

        menuItem.split(",").map((item) => {
            orderId.push(parseInt(item));
            return 'ok';
        });

        data = JSON.stringify(orderId);
        axios.post(`${base_url}/menuItem`,data, {
            headers:{
                'accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        // .then((res) => res.json())
        .then((response) => {
            let totalPrice = 0;
            response.data.map((item) => {
                totalPrice += parseFloat(item.menu_price);
                return 'ok'
            })
            this.setState({menuItem:response.data,cost:totalPrice})
        })
        .catch(error => {
            console.error('There was an error!', error);
        });

    }
}

export default PlaceOrder;