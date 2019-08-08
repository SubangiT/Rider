import React, { Component } from 'react';

import { Link, NavLink } from 'react-router-dom';
import { RiderData } from './FetchRider';

export class AddRider extends Component {
    displayName = AddRider.name;

    constructor(props) {
        super(props);
        this.state = {
            title: "", loading: true,
            rideData: new RiderData,
            jobList : []
        };

        fetch('api/Rider/GetJobList').then(response => response.json())
            .then(data => {
                this.setState ({ jobList : data });

            });
        var id = this.props.match.params["id"];


        // This will set state for Edit   
        if (id > 0) {
            fetch('api/Rider/GetRiderDetails_ByID/' + id)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Edit", loading: false, rideData: data });
                });
        }
        // This will set state for Add   
        else {
            this.state = { title: "Create", loading: false, jobList: [], rideData: new RiderData };
        }  

        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);  
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.jobList);
        return (<div>
            <h1>{this.state.title}</h1>
            <h3>Rider</h3>
            <hr />
            {contents}
        </div>);
    }

    // This will handle the submit form event.  
     handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        // PUT request for Edit employee.  
        if (this.state.rideData.id) {
            fetch('api/Rider/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchRider");
                })
        }
        // POST request for Add employee.  
        else {
            fetch('api/Rider/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchRider");
                })
        }
    }  

    // This will handle Cancel button click event.  
     handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchRider");
    }  

    renderCreateForm(jobList) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="id" value={this.state.rideData.id} />
                </div>
                
                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="FirstName">First Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="firstName" defaultValue={this.state.rideData.firstName} required />
                    </div>
                </div >

                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Last Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="lastName" defaultValue={this.state.rideData.lastName} required />
                    </div>
                </div >

                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="phoneNumber">Phone Number </label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="phoneNumber" defaultValue={this.state.rideData.phoneNumber} required />
                    </div>
                </div >

                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="email">Email</label>
                    <div className="col-md-4">
                        <input className="form-control" type="email" name="email"
                            
                            defaultValue={this.state.rideData.email} required />
                    </div>
                    <div className="col-md-6 frmError">
                       
                    </div>

                </div >

              

                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="StratDate">Start Date</label>
                    <div className="col-md-4">
                        <input className="form-control" type="datetime-local" name="startDate"
                            defaultValue={this.state.rideData.startDate}
                            required />

                    </div>
                </div >
               

                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >

            //<div className="col-md-4">
            //    <DatePicker className="form-control"
            //        selected={this.state.rideData.endDate}
            //        onChange={this.handleEndDateChange}
            //        dateFormat="dd/MM/yyyy"
            //        minDate={this.state.rideData.startDate}
            //    />
            //</div>
            //<div className="col-md-4">
            //    <DatePicker className="form-control"
            //        selected={this.state.rideData.startDate}
            //        onChange={this.handleStartDateChange}
            //        dateFormat="dd/MM/yyyy"
            //        minDate={new Date()}/>
            //</div>

        )
    }

}
