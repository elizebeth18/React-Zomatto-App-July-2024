import React,{useState,useEffect} from 'react';
import "./Search.css";

const base_url = process.env.REACT_APP_API_URL;
const Search = () => {

    const [location, setLocation] = useState([]);
    const [resturants, setResturants] = useState([]);
    
    //anything you want on page load
    /******************
     * With the help of useEffect we achieve the 
     * following lifecycle events :
     * componentWillMount = when first time component will load
     * componentDidUpdate = when state change happen
     * componentWillUnmount = when we leave the component
     */
    useEffect(() => {
        
        fetch(`${base_url}/location`,{method: 'GET'})
        //returns promise
        .then((res) => res.json())
        //returns data
        .then((data) => {
            //console.log(data);
            setLocation(data);
        })
        .catch((err) => {
            console.error(err)
        })
    },[]);

    const renderCity = (data) => {
        //console.log(`>>>>>>>>>${data}`);
        if(data) {
            return data.map((item,index) => {
                return (
                    <option value={item.state_id} 
                        key={item._id}>{item.state}</option>
                );
            });
        }
    }

    const handleCity = (event) => {
        const stateId = event.target.value;

        fetch(`${base_url}/restaurant?stateId=${stateId}`,{method:'GET'})
        //returns promise
        .then((res) => res.json())
        //returns data
        .then((data) => {
            //console.log(data);
            setResturants(data);
        })
        .catch((err) => console.error(err));

    }

    const renderResturant = (data) => {
        if(data) {
            return data.map((item,index) => {
                return (<option value={item.restaurant_id} key={item._id}>
                    {item.restaurant_name} | {item.address}
                </option>);
            });
        }
    }


    return (
        <div className="search">
            <div id="logo">
                <span>D!</span>
            </div>
            <div id="heading">
                Search Places Near To Me
            </div>
            <div id="dropdown">
                <select onChange={handleCity}>
                    <option>---Select City---</option>
                    {renderCity(location)}
                </select>
                <select className="restSelect">
                    <option>---Select Resturant---</option>
                    {renderResturant(resturants)}
                </select>
            </div>
        </div>
    );
    
}

export default Search;