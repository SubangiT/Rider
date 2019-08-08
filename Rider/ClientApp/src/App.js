import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FetchRider } from './components/FetchRider';
import { AddRider } from './components/AddRider';
import { Review } from './components/Review';


export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <Layout>
                <Route exact path='/' component={FetchRider} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetchdata' component={FetchData} />
                <Route path='/fetchRider' component={FetchRider} />
                <Route path='/addRider' component={AddRider} />
                <Route path='/riderList/edit/:id' component={AddRider} />
                <Route path='/riderList/review/:id' component={Review} />
            </Layout>
        );
    }
}
