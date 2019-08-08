import React, { Component } from 'react';

import { Link, NavLink } from 'react-router-dom';
import { RiderData } from './FetchRider';

export class Review extends Component {
    displayName = Review.name;

    constructor(props) {
        super(props);
        this.state = {
            title: "", loading: true,
            reviewData: new RiderData,
            jobList: []
        };

        var id = this.props.match.params["id"];

        fetch('api/Rider/GetRideJobList/' + id)
            .then(response => response.json())
            .then(data => {
                this.setState({ title: "Review", jobList: data, loading: false });
            });

        this.handleCancel = this.handleCancel.bind(this);  
    }

    render() {
        let contents = this.state.loading ?
            <p><em> Loading... </em></p> :
            this.renderRiderTable(this.state.jobList);

        return (
            <div>
                <h3>Rider Details </h3>
                
                {contents}
            </div>
        );

    }

    handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchRider");
    }  

    renderRiderTable(jobList) {
        return (
            <form >
                <div className="form-group">
            <table className="table">
                <thead>
                    <tr>
                        <th hidden></th>
                        <th>Avarage Score</th>
                        <th>Comment</th>
                       
                    </tr>

                </thead>
                <tbody>
                    {jobList.map(job =>
                        <tr key={job.id} >
                            <td hidden >{job.id}</td>
                            <td>{job.reviewScore}</td>
                            <td>{job.reviewComment}</td>
                          
                        </tr>
                    )}
                </tbody>
                    </table>
                </div>
            <div className="form-group">
               
                <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form>
        );
    }
}