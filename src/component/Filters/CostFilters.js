import React,{Component} from 'react';
import axios from 'axios';

const base_url = process.env.REACT_APP_API_URL;

class CostFilter extends Component {

    constructor(props) {
        super(props);
    }

    costFilter = (event) => {
        let mealId = this.props.mealId;
        let cost = event.target.value.split('-');
        let lcost = cost[0];
        let hcost = cost[1];
        let costUrl = "";
        if(event.target.value === ""){
            costUrl = `${base_url}/filter/${mealId}`;
        }else{
            costUrl = `${base_url}/filter/${mealId}?hcost=${hcost}&lcost=${lcost}`
        }

        axios.get(costUrl).then((res) => {
            this.props.restPerCost(res.data)
        }).catch(err => console.error(err));
    }

    render() {
        return(
            <>
                <center><h3>Cost Filter</h3></center>
                <hr />
                <div style={{marginLeft: '15%'}}>
                    <label className='radio'>
                        <input type='radio' name='cost' value="" onChange={this.costFilter}/>All
                    </label>
                    <label className='radio'>
                        <input type='radio' name='cost' value="0-300" onChange={this.costFilter}/>0-300
                    </label>
                    <label className='radio'>
                        <input type='radio' name='cost' value="301-600" onChange={this.costFilter}/>301-600
                    </label>
                    <label className='radio'>
                        <input type='radio' name='cost' value="601-900" onChange={this.costFilter}/>601-900
                    </label>
                    <label className='radio'>
                        <input type='radio' name='cost' value="901-5000" onChange={this.costFilter}/>901-5000
                    </label>
                </div>

            </>
        )
    }
}

export default CostFilter;