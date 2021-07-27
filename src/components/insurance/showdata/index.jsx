import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import DataIcon1 from '@/assets/images/insurance/data_icon_1.svg'
import DataIcon2 from '@/assets/images/insurance/data_icon_2.svg'
import DataIcon3 from '@/assets/images/insurance/data_icon_3.svg'
import DataIcon4 from '@/assets/images/insurance/data_icon_4.svg'
import { useIndexPrice } from '../../../hooks/insurance'
import { useActiveWeb3React } from '../../../web3'
import Erc20ABI from '../../../web3/abi/ERC20.json'
import { getBalance, getShortTokenValue } from '../../../hooks/insurance'
import { formatNumber } from 'accounting'
import './index.less'
import axios from 'axios'

const ShowData = props => {
  const { library, active, account } = useActiveWeb3React()
  const [Data1, setData1Price] = useState(0)
  const [Data2, setData2Price] = useState(0)
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
    const fixguardPrice = Number(guardPrice).toFixed(2)
    setData1Price(fixguardPrice)
  }
  const Data4 = getBalance(
    '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
    '0x000000000000000000000000000000000000dead',
    Erc20ABI.abi,
    18
  )
  const Data3 = 100000
  const getData2 = async () => {
    const Datas = await getShortTokenValue(library)
    setData2Price(Datas)
    console.log(Datas)
  }
  useEffect(() => {
    if (account) {
      currentGuardPrice()
      getData2()
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
            <span>$ {Data1}</span>
          </p>
        </div>
        <div className="insurance_data_icon2 data_item">
          <img src={DataIcon2} alt="" />
          <p>
            <span>
              <FormattedMessage id="insurance_text2" />
            </span>
            <span>$ {Data2}</span>
          </p>
        </div>
        <div className="insurance_data_icon3 data_item">
          <img src={DataIcon3} alt="" />
          <p>
            <span>
              <FormattedMessage id="insurance_text3" />
            </span>
            <span>{formatNumber(Data3)}</span>
          </p>
        </div>
        <div className="insurance_data_icon4 data_item">
          <img src={DataIcon4} alt="" />
          <p>
            <span>
              <FormattedMessage id="insurance_text23" />
            </span>
            <span>{formatNumber(Data4)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ShowData
