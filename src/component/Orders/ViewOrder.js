import React,{Component} from "react";
import axios from 'axios';
import Display from "./DisplayOrder";

const url = "http://localhost:9112/orders";

class ViewOrder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: ''
        }
    }

    render() {
        return(
            <>
                <Display orderData={this.state.orders} />
            </>
        )
    }

    componentDidMount() {
        axios.get(url)
            .then((response) => {
                this.setState({orders: response.data})
            })
    }
}

export default ViewOrder;