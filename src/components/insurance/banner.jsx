import React, { Component } from 'react';
import Banner from '@/images/insurance/banner.png';
class banner extends Component {
    render() {
        return (
            <div className='insurance_banner'>
                <div className='insurance_banner_wrap'>
                    <img src={Banner} alt='' />
                    <div>
                        <h3>
                            🎅Merry Christmas! HELMET airdrop million insurance
                            policy
                        </h3>
                        <p>
                            Hold a policy before you "Yeild Farming" at
                            AMMs，you will claim rewards with frictionless.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default banner;
