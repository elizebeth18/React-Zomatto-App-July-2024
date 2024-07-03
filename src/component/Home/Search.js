import React,{Component} from 'react';
import "./Search.css";

const base_url = process.env.REACT_APP_API_URL;
class Search extends Component {

    constructor() {
        console.log(`inside constructor`)
        super();

        this.state = {
            location: ''
        }
    }

    renderCity(data) {
        console.log(`>>>>>>>>>${data}`);
        if(data) {
            return data.map((item,index) => {
                return (
                    <option value={item.state_id} 
                        key={item._id}>{item.state}</option>
                );
            });
        }
    }

    render() {
        console.log("inside render")
        return (
            <div className="search">
                <div id="logo">
                    <span>D!</span>
                </div>
                <div id="heading">
                    Search Place Near To You
                </div>
                <div id="dropdown">
                    <select>
                        <option>---Select City---</option>
                        {this.renderCity(this.state.location)}
                    </select>
                    <select className='restSelect'>
                        <option>---Select Resturant---</option>
                    </select>
                </div>
            </div>
        );
    }

    
    /* => constructor, render, componentDidMount */
    componentDidMount () {
        console.log(">>>>>>>>>>componentDidMount");
        fetch(`${base_url}/location`,{method: 'GET'})
        //returns promise
        .then((res) => res.json())
        //returns data
        .then((data) => {
            console.log(data);
            this.setState({location: data})
        })
        .catch((err) => {
            console.error(err)
        })
    }
}

export default Search;