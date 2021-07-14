import React, { useState } from 'react';
import LogoSvg from '@/assets/images/insurance/logo.svg';
import CallSvg from '@/assets/images/insurance/call.svg';
import PutSvg from '@/assets/images/insurance/put.svg';
import Select from '@/assets/images/insurance/select.svg';

import './index.less';
const Operation = (props) => {
    return (
        <div className='insurance_operation'>
            <div className='insurance_operation_left'>
                <div className='logo'>
                    <img src={LogoSvg} alt='' />
                    <span>2021-07-21 24:00</span>
                </div>
                <div className='price'>
                    <div className='call price_cell'>
                        <img src={CallSvg} alt='' />
                        <div>
                            <span>Cover Miss Out Pirce</span>
                            <span>2.0000 Matic</span>
                        </div>
                    </div>
                    <div className='put price_cell'>
                        <img src={PutSvg} alt='' />{' '}
                        <div>
                            <span>50% Off Price</span>
                            <span>2.0000 Matic</span>
                        </div>
                    </div>
                </div>
                <div className='buttons'>
                    <button className='market'>
                        Buy Insurance <img src={Select} alt='' />
                    </button>
                    <button className='supply'>
                        Supply
                        <img src={Select} alt='' />
                    </button>
                </div>
            </div>
            <div className='insurance_operation_right'></div>
        </div>
    );
};
export default Operation;
