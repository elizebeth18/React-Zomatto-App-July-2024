import React,{Component} from 'react';
import "./Search.css";

const base_url = process.env.REACT_APP_API_URL;
class Search extends Component {

    constructor() {
        //console.log(`inside constructor`)
        super();

        this.state = {
            location: '',
            resturants: ''
        }
    }

    renderCity = (data) => {
        //console.log(`>>>>>>>>>${data}`);
        if(data) {
            return data.map((item,index) => {
                return (
                    <option value={item.state_id} 
                        key={item._id}>{item.state}</option>
                );
            });
        }
    }

    handleCity = (event) => {
        const stateId = event.target.value;

        fetch(`${base_url}/restaurant?stateId=${stateId}`,{method:'GET'})
        //returns promise
        .then((res) => res.json())
        //returns data
        .then((data) => {
            //console.log(data);
            this.setState({resturants: data});
        })
        .catch((err) => console.error(err));

    }

    renderResturant = (data) => {
        if(data) {
            return data.map((item,index) => {
                return (<option value={item.restaurant_id} key={item._id}>
                    {item.restaurant_name} | {item.address}
                </option>);
            });
        }
    }

    render() {
        //console.log("inside render")
        return (
            <div className="search">
                <div id="logo">
                    <span>D!</span>
                </div>
                <div id="heading">
                    Search Places Near To Me
                </div>
                <div id="dropdown">
                    <select onChange={this.handleCity}>
                        <option>---Select City---</option>
                        {this.renderCity(this.state.location)}
                    </select>
                    <select className="restSelect">
                        <option>---Select Resturant---</option>
                        {this.renderResturant(this.state.resturants)}
                    </select>
                </div>
            </div>
        );
    }

    
    /* => constructor, render, componentDidMount */
    componentDidMount () {
        //console.log(">>>>>>>>>>componentDidMount");
        fetch(`${base_url}/location`,{method: 'GET'})
        //returns promise
        .then((res) => res.json())
        //returns data
        .then((data) => {
            //console.log(data);
            this.setState({location: data})
        })
        .catch((err) => {
            console.error(err)
        })
    }
}

export default Search;