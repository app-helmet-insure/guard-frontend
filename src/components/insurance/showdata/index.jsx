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
import { formatAmount } from '../../../utils/format'
import BigNumber from 'bignumber.js'
import { ChainId } from '../../../web3/address'

const ShowData = props => {
  const { library, active, account } = useActiveWeb3React()
  const [Data1, setData1Price] = useState('-')
  const [Data2, setData2Price] = useState('-')
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
    const fixguardPrice = Number(guardPrice).toFixed(5)
    setData1Price(fixguardPrice)
  }
  const Data4 = getBalance(
    '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
    '0x000000000000000000000000000000000000dead',
    Erc20ABI.abi,
    18
  )
  const Data3Balance = getBalance(
    '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
    '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699',
    Erc20ABI.abi,
    18,
    ChainId.MATIC
  )

  // 矿山初始值 400W - 当前矿山的量(3,994,969) + 常数(10W) 每天递减
  const diminish_start = 1631894400
  const thisTime = (new Date().getTime() / 1000).toFixed(0) * 1
  let constant = 100000
  if (thisTime >= diminish_start) {
    const diminishD = parseInt(String((thisTime - diminish_start) / 86400), 10) + 1
    if (diminishD >= 30) {
      constant = 0
    } else {
      const diminishAmount = constant * diminishD / 30
      constant = constant - diminishAmount
    }
  }
  console.log('constant', constant)
  const Data3 =
    Data3Balance > 0
      ? formatNumber(
        new BigNumber(4000000).minus(new BigNumber(Data3Balance)).plus(constant)
      )
      : '-'
  const getData2 = async () => {
    const Datas = await getShortTokenValue(library)
    console.log('Datas', Datas)
    setData2Price(formatAmount(Datas, 0))
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
            <span className="flex_center_up_and_down">
              $ {Data1}
              <a
                href="https://quickswap.exchange/#/swap?inputCurrency=0x2791bca1f2de4661ed88a30c99a7a9449aa84174&outputCurrency=0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8"
                target="_blank"
                className="buy_btn"
              >
                <FormattedMessage id="insurance_text26" />
              </a>
            </span>
          </p>
        </div>
        <div className="insurance_data_icon2 data_item">
          <img src={DataIcon2} alt="" />
          <p>
            <span>
              <FormattedMessage id="insurance_text2" />
            </span>
            <span>$ {formatNumber(Data2, 2)}</span>
          </p>
        </div>
        <div className="insurance_data_icon3 data_item">
          <img src={DataIcon3} alt="" />
          <p>
            <span>
              <FormattedMessage id="insurance_text3" />
            </span>
            <span>{Data3}</span>
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
