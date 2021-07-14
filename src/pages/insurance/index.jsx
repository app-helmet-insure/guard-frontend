import React, { Component } from 'react';
import './index.less';
import Banner from '@/components/insurance/banner';
import ShowData from '@/components/insurance/shwodata';
import Header from '@/components/header';
import Footer from '@/components/footer';

class insurance extends Component {
    render() {
        return (
            <>
                <Header />
                <div className='insurance_container'>
                    <Banner />
                    <ShowData />
                </div>
                <Footer />
            </>
        );
    }
}

export default insurance;
