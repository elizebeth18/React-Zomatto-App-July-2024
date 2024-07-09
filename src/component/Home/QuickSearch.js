import React,{Component} from 'react';
import QuickDisplay from './QuickDisplay'
import './QuickSearch.css';

const base_url = process.env.REACT_APP_API_URL;
class QuickSearch extends Component {

    constructor () {
        super();

        this.state = {
            mealType: []
        }
    }

    render () {
        return (
        <div className="quickSearch">
            <span id="QuickSearchHeading">
                Quick Search
            </span>
            <span id="QuickSubHeading">
                Find Resturants By Meal Type
            </span>
            <div id="mealData">
                <QuickDisplay mealData={this.state.mealType}/>
            </div>
        </div>);
    }

    //api calling on page load
    componentDidMount () {
        fetch(`${base_url}/quicksearch`,{method: 'GET'})
        //returns promise
        .then((res) => res.json())
        //returns data
        .then((data) => {
            this.setState({mealType: data});
          //this.setState({location: data})
        })
    }
}

export default QuickSearch;