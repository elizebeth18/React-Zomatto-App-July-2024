import React,{Component} from 'react';
import axios from 'axios';

const base_url = process.env.REACT_APP_API_URL;

class CuisineFilter extends Component {

    constructor(props) {
        super(props);
    }

    cusineFilter = (event) => {
        let mealId = this.props.mealId;
        let cuisineID = event.target.value;
        let cuisineUrl = "";
        if(cuisineID === ""){
            cuisineUrl = `${base_url}/filter/${mealId}`;
        }else{
            cuisineUrl = `${base_url}/filter/${mealId}?cuisine=${cuisineID}`
        }

        axios.get(cuisineUrl).then((res) => {
            this.props.restPerCuisine(res.data)
        }).catch(err => console.error(err));
    }

    render() {
        return(
            <>
                <center><h3>Cuisine Filter</h3></center>
                <hr />
                <div style={{marginLeft: '15%'}}>
                    <label className='radio'>
                        <input type='radio' name='cuisine' value="" onChange={this.cusineFilter}/>All
                    </label>
                    <label className='radio'>
                        <input type='radio' name='cuisine' value="1" onChange={this.cusineFilter}/>North Indian
                    </label>
                    <label className='radio'>
                        <input type='radio' name='cuisine' value="2" onChange={this.cusineFilter}/>South Indian
                    </label>
                    <label className='radio'>
                        <input type='radio' name='cuisine' value="3" onChange={this.cusineFilter}/>Chinese
                    </label>
                    <label className='radio'>
                        <input type='radio' name='cuisine' value="4" onChange={this.cusineFilter}/>Fast Food
                    </label>
                    <label className='radio'>
                        <input type='radio' name='cuisine' value="5" onChange={this.cusineFilter}/>Street Food
                    </label>
                </div>

            </>
        )
    }
}

export default CuisineFilter;