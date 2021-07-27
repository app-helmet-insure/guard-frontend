import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import DataIcon1 from '@/assets/images/insurance/data_icon_1.svg'
import DataIcon2 from '@/assets/images/insurance/data_icon_2.svg'
import DataIcon3 from '@/assets/images/insurance/data_icon_3.svg'
import DataIcon4 from '@/assets/images/insurance/data_icon_4.svg'
import { useIndexPrice } from '../../../hooks/insurance'
import { useActiveWeb3React } from '../../../web3'
import './index.less'
import { useEffect } from 'react'

const ShowData = props => {
  const { library, active, account } = useActiveWeb3React()
  const [GuardPrice, setGuardPrice] = useState(0)
  const currentGuardPrice = async () => {
    const calldata = {
      collateral_chainid: 137,
      collateral_symbol: 'GUARD',
      collateral_decimals_number: 18,
      collateral_address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      underlying_chainid: 137,
      underlying_symbol: 'USDC',
      underlying_decimals_number: 6,
      underlying_address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    }
    const guardPrice = await useIndexPrice(library, calldata)
    console.log(guardPrice)
    const fixguardPrice = Number(guardPrice).toFixed(2)
    setGuardPrice(fixguardPrice)
  }
  useEffect(() => {
    if (account) {
      currentGuardPrice()
    }
  }, [account])
  return (
    <div className="insurance_data_wrap">
      <div className="insurance_data">
        <div className="insurance_data_icon1 data_item">
          <img src={DataIcon1} alt="" />
          <p>
            <span>
              <FormattedMessage id="insurance_text1" />
            </span>
            <span>{GuardPrice} USDC</span>
          </p>
        </div>
        <div className="insurance_data_icon2 data_item">
          <img src={DataIcon2} alt="" />
          <p>
            <span>
              <FormattedMessage id="insurance_text2" />
            </span>
            <span>10000.000000</span>
          </p>
        </div>
        <div className="insurance_data_icon3 data_item">
          <img src={DataIcon3} alt="" />
          <p>
            <span>
              <FormattedMessage id="insurance_text3" />
            </span>
            <span>10000.000000</span>
          </p>
        </div>
        <div className="insurance_data_icon4 data_item">
          <img src={DataIcon4} alt="" />
          <p>
            <span>
              <FormattedMessage id="insurance_text23" />
            </span>
            <span>10000.000000</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ShowData
