import React, { Component } from 'react';
import './index.less';
import Banner from '@/components/insurance/banner';
import ShowData from '@/components/insurance/shwodata';
import Header from '@/components/header';
class insurance extends Component {
    render() {
        return (
            <div className='insurance_container'>
                <Header />
                <Banner />
                <ShowData />
            </div>
        );
    }
}

export default insurance;
