import React, { useState } from 'react';
import MyPolicy from '../mypolicy/index';
import MySupply from '../mysupply/index';
import './index.less';
const PolicyTab = (props) => {
    const [ActiveTab, SetActiveTab] = useState('MYPOLICY');
    return (
        <div className='insurance_tabcheck'>
            <div className='insurance_tabcheck_buttons'>
                <button
                    onClick={() => SetActiveTab('MYPOLICY')}
                    className={
                        ActiveTab === 'MYPOLICY'
                            ? 'MYPOLICY my_policy'
                            : 'my_policy'
                    }>
                    <span>我的保单</span>
                </button>
                <button
                    onClick={() => SetActiveTab('MYSUPPLY')}
                    className={
                        ActiveTab === 'MYSUPPLY'
                            ? 'MYSUPPLY my_supply'
                            : 'my_supply'
                    }>
                    <span>我发布的保险</span>
                </button>
                <button
                    onClick={() => SetActiveTab('MYSETTLE')}
                    className={
                        ActiveTab === 'MYSETTLE'
                            ? 'MYSETTLE my_settle'
                            : 'my_settle'
                    }>
                    <span>我的结算</span>
                </button>
            </div>
            {ActiveTab === 'MYPOLICY' ? (
                <MyPolicy />
            ) : ActiveTab === 'MYSUPPLY' ? (
                <MySupply />
            ) : (
                ''
            )}
        </div>
    );
};

export default PolicyTab;
