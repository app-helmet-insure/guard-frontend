import React, { useState } from 'react';

import './index.less';
const Supply = (props) => {
    const [InsuranceType, SetInsuranceType] = useState('CALL');
    return (
        <div className='insurance_supply'>
            <div className='insurance_type'>
                <button
                    onClick={() => SetInsuranceType('CALL')}
                    className={
                        InsuranceType === 'CALL' ? 'insurance_active_call' : ''
                    }>
                    Cover Miss Out
                </button>
                <button
                    onClick={() => SetInsuranceType('PUT')}
                    className={
                        InsuranceType === 'PUT' ? 'insurance_active_put' : ''
                    }>
                    Cover 50% Off
                </button>
            </div>
            <div className='insurance_form'>
                <p className='between'>
                    <span>Insurance Price</span>
                    <span>Guard: 2.0000 USD</span>
                </p>
                <div className='dpr'>
                    <input type='text' />
                </div>
                <p className='left'>预期最大收益: 0 HELMET</p>
                <div className='volume'>
                    <input type='text' />
                </div>
                <p className='left'>可用余额: 0 HELMET</p>
                <button className='confirm'>立即创建翻倍险</button>
            </div>
        </div>
    );
};
export default Supply;
