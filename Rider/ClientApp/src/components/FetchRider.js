import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

export class FetchRider extends Component {
    displayName = FetchRider.name

    constructor(props) {
        super(props);

        this.state =
            {
                riderList: [], loading: true,
            };

        fetch('api/Rider/Index').then(response => response.json())
            .then(data => {
                this.setState({ riderList: data, loading: false });
            });



        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleReview = this.handleReview.bind(this);
        
    }

    render() {
        let contents = this.state.loading ?
            <p><em> Loading... </em></p> :
            this.renderRiderTable(this.state.riderList);

        return (
            <div>
                <h3>Rider Details </h3>
                <p>
                    <Link to="/addRider"> Create New Rider</Link>
                </p>
                {contents}
            </div>
        );

    }
    // Handle Delete ride 
    handleDelete(id) {
        if (!window.confirm("Do you want to delete this rider"))
            return;
        else {
            fetch('api/Rider/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        riderList: this.state.riderList.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }


    handleEdit(id) {
        this.props.history.push("/riderList/edit/" + id);
    }

    handleReview(id) {
        this.props.history.push("/riderList/review/" + id);
    }

    renderRiderTable(riderList) {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th hidden></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>StartDate</th>
                    </tr>

                </thead>
                <tbody>
                    {riderList.map(rider =>
                        <tr key={rider.id} >
                            <td hidden >{rider.id}</td>
                            <td>{rider.firstName}</td>
                            <td>{rider.lastName}</td>
                            <td>{rider.phoneNumber}</td>
                            <td>{rider.email}</td>
                            <td>{new Date(rider.startDate).toLocaleDateString()}</td>
                            <td>
                                <a className="action" onClick={(id) => this.handleEdit(rider.id)}>Edit   </a>
                                <a className="action" onClick={(id) => this.handleDelete(rider.id)}> Delete  </a>
                                <a className="action" onClick={(id) => this.handleReview(rider.id)}> Review </a>

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export class RiderData {
    id = 0;
    firstName = "";
    lastName = "";
    phoneNumber = "";
    email = "";
    startDate = new Date().toDateString();
    score = 0;
    comment = "";
}