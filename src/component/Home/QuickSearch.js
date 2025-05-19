import React,{useState,useEffect} from 'react';
import QuickDisplay from './QuickDisplay'
import './QuickSearch.css';

const base_url = process.env.REACT_APP_API_URL;
const QuickSearch = () => {

    const [mealType, setMealType] =  useState([]);
        
    useEffect(()=>{
        fetch(`${base_url}/quicksearch`,{method: 'GET'})
        //returns promise
        .then((res) => res.json())
        //returns data
        .then((data) => {
            //console.log(data)
            setMealType(data);
        })
    }, []);
    
        return (
        <div className="quickSearch">
            <span id="QuickSearchHeading">
                Quick Search
            </span>
            <span id="QuickSubHeading">
                Find Resturants By Meal Type
            </span>
            <div id="mealData">
                <QuickDisplay mealData={mealType}/>
            </div>
        </div>);
    

    
}

export default QuickSearch;