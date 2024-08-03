import React,{Component} from 'react';

class DisplayOrder extends Component {

    constructor(props) {
        super(props);
    }

    renderTable(props) {
        if(props.orderData){
            console.log(props.orderData);
        }
    }

    render() {
        return(
            <div className="container">
                <center><h3>Orders</h3></center>
                <table>
                    <thead>
                        <tr>
                            <th>OrderId</th>
                            <th>RName</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable(props)}
                    </tbody>
                </table>
            </div>
        );
    }

    componentDidMount() {

    }
}

export default DisplayOrder;