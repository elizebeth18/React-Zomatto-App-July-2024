import React,{Component} from 'react';
import './Listing.css'
import axios from 'axios';
import ListingDisplay from './ListingDisplay';

const base_url = process.env.REACT_APP_API_URL;

class Listing extends Component {

    constructor(props) {
        super(props);

        this.state = {
            resturantList: [],
            mealId: this.props.match.params.mealId
        }
    }

    render() {
        return(
            <>
                <div className="row">
                    <div id="mainListing">
                        <div id="filter">

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
