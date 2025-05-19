import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Listing.css';
import ListingDisplay from './ListingDisplay';
import CuisineFilter from '../Filters/CusineFilters';
import CostFilter from '../Filters/CostFilters';

const base_url = process.env.REACT_APP_API_URL;

const Listing = () => {
    const params = useParams();
    let [mealId] = useState(params.mealId);
    const [restaurants, setResturants] = useState([]);

    useEffect(()=>{
        sessionStorage.setItem("mealId",mealId);
        axios.get(`${base_url}/restaurant?mealtype_id=${mealId}`)
        .then((res)=> setResturants(res.data))
        .catch((err) => console.error(err))

    },[mealId]);

    const setDataPerFilter = (data) => {
        setResturants(data);
    }

    return (
        <div className='row'>
            <div id='mainListing'>
                <div id='filter'>
                    <CuisineFilter mealId={mealId} 
                        restPerCuisine={(data)=>{setDataPerFilter(data)}} />
                    <hr />
                    <CostFilter mealId={mealId} 
                        restPerCost={(data)=>{setDataPerFilter(data)}}/>
                </div>
                <ListingDisplay resturantList={restaurants} />
            </div>
        </div>
    );
}

export default Listing;