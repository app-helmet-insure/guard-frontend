import React, { Component } from 'react';
import DataIcon1 from '@/assets/images/insurance/data_icon_1.svg';
import DataIcon2 from '@/assets/images/insurance/data_icon_2.svg';
import DataIcon3 from '@/assets/images/insurance/data_icon_3.svg';
import './index.less';

const ShowData = (props) => {
    return (
        <div className='insurance_data'>
            <div className='insurance_data_icon1 data_item'>
                <img src={DataIcon1} alt='' />
                <p>
                    <span>已成交保单</span>
                    <span>3221</span>
                </p>
            </div>
            <div className='insurance_data_icon2 data_item'>
                <img src={DataIcon2} alt='' />
                <p>
                    <span>LONG当前总价值</span>
                    <span>10000.000000</span>
                </p>
            </div>
            <div className='insurance_data_icon3 data_item'>
                <img src={DataIcon3} alt='' />
                <p>
                    <span>Gurad 流通量</span>
                    <span>10000.000000</span>
                </p>
            </div>
        </div>
    );
};

export default ShowData;
