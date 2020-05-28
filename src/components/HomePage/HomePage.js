import React, { Component } from 'react';
import BestSellers from './BestSellers'

class HomePage extends Component {
    render() {
        return (
            <div className='container-fluid home-acordion'>
                <BestSellers />
            </div>
        );
    }
}

export default HomePage;