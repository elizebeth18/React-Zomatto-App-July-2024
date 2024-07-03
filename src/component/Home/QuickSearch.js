import React,{Component} from 'react';
import QuickDisplay from './QuickDisplay'
import './QuickSearch.css';

class QuickSearch extends Component {
    constructor () {
        super();
    }

    render () {
        return (
        <div className="quickSearch">
            <span id="QuickSearchHeading">
                Quick Search
            </span>
            <span id="quickSubHeading">
                Find Resturants By MealType
            </span>
            <div>
                <QuickDisplay />
            </div>
        </div>);
    }
}

export default QuickSearch;