import React,{useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PlaceOrder.css';
import axios from 'axios';


const base_url = process.env.REACT_APP_API_URL;
const placeOrderUrl = "http://localhost:7834/orders";
 
const PlaceOrder = () => {

    let {restName} = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
            id: Math.floor(Math.random()*10000),
            name: 'Jilu',
            email: 'a.jilu@a.com',
            cost: 0,
            phone: '4646924955',
            address: 'U Block Delhi',
            menuItem: ''
        });

    useEffect(() => {
        let menuItem = sessionStorage.getItem('menu');
        let orderId = menuItem ? menuItem.split(",").map(Number):[];
        let data = [];

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
            });
            
            setFormData((prevState) => ({
                ...prevState,
                menuItem: response.data,
                cost: totalPrice
            }));
        })
        .catch(error => {
            console.error('There was an error!', error);
        });

    },[]);
    

    const renderMenu = (data) => {
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

    const placeOrder = () => {
        let obj = {...formData,
            restName: restName,
            menuItem: sessionStorage.getItem('menu')
        };
        console.log(obj);

        axios.post(placeOrderUrl, JSON.stringify(obj),{
            headers:{
                'accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then((response) => {
            console.log(response);
            navigate('/viewOrder');

        }).catch((error) => {
            console.error(error)
        })
    }

    const handleChange = (event) => {
        setFormData({...formData,[event.target.name]: event.target.value});
    }


    
        return (
            <div className="container">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3>Your Order from the resturant {restName}</h3>
                    </div>
                    <div className="panel-body">
                        <input type='hidden' name='cost' value={formData.cost} />
                        <input type='hidden' name='id' value={formData.id} />
                        <input type='hidden' name='restName' value={restName} />
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label>Name</label>
                                <input className="form-control" name="name"
                                value={formData.name} 
                                onChange={handleChange}/>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input className="form-control" name="email"
                                value={formData.email} 
                                onChange={handleChange} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Phone</label>
                                <input className="form-control" name="phone"
                                value={formData.phone} 
                                onChange={handleChange} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Address</label>
                                <input className="form-control" name="address"
                                value={formData.address} 
                                onChange={handleChange} />
                            </div>
                            {renderMenu(formData.menuItem)}
                            <div className="row">
                                <div className="col-md-12">
                                    <h2>Total Price is Rs. {formData.cost}</h2>
                                </div>
                            </div>
                            <button className="btn btn-success" onClick={placeOrder}>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        );

}

export default PlaceOrder;