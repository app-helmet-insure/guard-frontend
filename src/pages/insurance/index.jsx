import React, { Component } from 'react';
import './index.less';
import Banner from '@/components/insurance/banner';
import ShowData from '@/components/insurance/shwodata';
import Header from '@/components/header';
import Footer from '@/components/footer';
class insurance extends Component {
    render() {
        return (
            <div className='insurance_container'>
                <Header />
                <Banner />
                <ShowData />
                <Footer />
            </div>
        );
    }
}

export default insurance;
