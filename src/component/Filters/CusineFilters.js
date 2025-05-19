import React from 'react';
import axios from 'axios';

const base_url = process.env.REACT_APP_API_URL;

const CuisineFilter = (props) => {

    const cusineFilter = async (event) => {
        let mealId = props.mealId;
        let cuisineID = event.target.value;
        let cuisineUrl = "";
        if(cuisineID === ""){
            cuisineUrl = `${base_url}/filter/${mealId}`;
        }else{
            cuisineUrl = `${base_url}/filter/${mealId}?cuisine=${cuisineID}`
        }

        try {
            let response = await axios.get(cuisineUrl);
            props.restPerCuisine(response.data);
        }catch (err) {
            console.error(err)
        }
    }

    
        return(
            <>
                <center><h3>Cuisine Filter</h3></center>
                <hr />
                <div style={{marginLeft: '15%'}}>
                    <label className='radio'>
                        <input type='radio' name='cuisine' value="" onChange={cusineFilter}/>All
                    </label>
                    <label className='radio'>
                        <input type='radio' name='cuisine' value="1" onChange={cusineFilter}/>North Indian
                    </label>
                    <label className='radio'>
                        <input type='radio' name='cuisine' value="2" onChange={cusineFilter}/>South Indian
                    </label>
                    <label className='radio'>
                        <input type='radio' name='cuisine' value="3" onChange={cusineFilter}/>Chinese
                    </label>
                    <label className='radio'>
                        <input type='radio' name='cuisine' value="4" onChange={cusineFilter}/>Fast Food
                    </label>
                    <label className='radio'>
                        <input type='radio' name='cuisine' value="5" onChange={cusineFilter}/>Street Food
                    </label>
                </div>

            </>
        )
    
}

export default CuisineFilter;