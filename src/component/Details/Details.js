import React, { useState,useEffect } from 'react';
import { Link,useSearchParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Details.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MenuDisplay from './MenuDetails'

const base_url = process.env.REACT_APP_API_URL;

const Details = () => {
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const [details,setDetails] = useState([]);
    const [menuList,setMenuList] = useState([]);
    const [userItem, setUserItem] = useState([]);
    let mealId = sessionStorage.getItem('mealId') ? sessionStorage.getItem('mealId') : 1

    useEffect(()=>{
        /**
         * Async - await : is the new way of writing promise
         */
        const fetchData = async () => {
            try {
                let restId = searchParams.getAll('restId');
                let response = await axios.get(`${base_url}/details/${restId}`);
                setDetails(response.data[0]);
                let menuData = await axios.get(`${base_url}/menu/${restId}`);
                setMenuList(menuData.data);
            } catch(err) {
                console.error(err)
            }
        }

        fetchData();
    }, []);

    const addToCart = (data) => {
        console.log(data);
        setUserItem(data);
    }

    const proceed = () => {
        sessionStorage.setItem('menu',userItem);
        navigate(`/placeOrder/${details.restaurant_name}`)
    }

    
    return(
        <>
            <div className='main'>
                <div className='tileImage'>
                    <div className='imageClass'>
                        <img src={details.restaurant_thumb} alt={details.restaurant_name} />
                    </div>
                </div>
                <div className='tileContent'>
                    <div className='content'>
                            <h1>{details.restaurant_name}</h1>
                            <span id="cfeedback">231 Customers Rating Average</span>
                            <h3>Old Price <del>Rs. {details.cost * 1.5}</del></h3>
                            <h3>Offer Price Rs. {details.cost}</h3>
                            <h3>Best Taste of Fresh Chai with Samosa At your Door or DineIn</h3>
                                <div>
                                    <div className="icons">
                                        <img src="https://i.ibb.co/wJvrhYg/veg.png" alt="pngImg1"/>
                                    </div>
                                    <div className="icons">
                                        <img src="https://i.ibb.co/mD3jpgc/sentizied.png" alt="pngImg2"/>
                                    </div>
                                </div>
                    </div>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>About</Tab>
                        <Tab>Contact</Tab>
                    </TabList>

                    <TabPanel>
                        <h2>{details.restaurant_name}</h2>
                        <p>
                            {details.restaurant_name}  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        </p>
                    </TabPanel>
                    <TabPanel>
                        <h4>{details.address}</h4>
                        <h4>Contact: {details.contact_number}</h4>
                    </TabPanel>
                </Tabs>
                <Link className="btn btn-danger" to={`/listing/${mealId}`}>
                    Back
                </Link>&nbsp;&nbsp;
                <button className='btn btn-primary'
                    onClick={proceed}>
                    Proceed
                </button>
                <div className="col-md-12">
                    <center>
                        <h2>Menu</h2>
                    </center>
                    <MenuDisplay menuList={menuList}
                        finalOrder={(data) => {addToCart(data)}}/>
                </div>
            </div>
        </>
    )
    

    /* async componentDidMount() {

        try {
            let restId = this.props.location.search.split('=')[1];
            let response = await axios.get(`${base_url}/details/${restId}`);
            let menuResponse = await axios.get(`${base_url}/menu/${restId}`);
            this.setState({details: response.data[0],menuList: menuResponse.data});
        } catch(err){
            console.error(err)
        }
    } */
}

export default Details