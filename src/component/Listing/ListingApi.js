import React,{Component} from 'react';
import './Listing.css'
import axios from 'axios';
import ListingDisplay from './ListingDisplay';
import CuisineFilter from '../Filters/CusineFilters';
import CostFilter from '../Filters/CostFilters';

const base_url = process.env.REACT_APP_API_URL;

class Listing extends Component {

    constructor(props) {
        super(props);

        this.state = {
            resturantList: [],
            mealId: this.props.match.params.mealId
        }
    }

    setDataPerFilter = (data) => {
        this.setState({resturantList: data})
    }

    render() {
        return(
            <>
                <div className="row">
                    <div id="mainListing">
                        <div id="filter">
                            <CuisineFilter mealId={this.state.mealId} 
                                restPerCuisine={(data) => {this.setDataPerFilter(data)}} />
                            <CostFilter  mealId={this.state.mealId} 
                                restPerCost={(data) => {this.setDataPerFilter(data)}} />
                        </div>
                        <ListingDisplay restList={this.state.resturantList} />
                    </div>
                </div>
            </>
        );
    }

    componentDidMount() {
        let mealId = this.state.mealId;
        sessionStorage.setItem("mealId", mealId);
        axios.get(`${base_url}/restaurant?mealtype_id=${mealId}`)
        .then((res)=> this.setState({resturantList: res.data}))

    }

}

export default Listing;
