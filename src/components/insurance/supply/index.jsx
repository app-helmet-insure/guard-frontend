import React, { useState, useEffect, useContext, useMemo } from 'react'
import { VarContext } from '../../../context'
import Web3 from 'web3'
import { Select } from 'antd'
import { FormattedMessage } from 'react-intl'
import { toWei, fromWei } from 'web3-utils'
import { useActiveWeb3React, getContract } from '../../../web3'
import { getCurrentInsurance } from '../../../configs/insurance'
import OrderABI from '../../../web3/abi/Order.json'
import Erc20ABI from '../../../web3/abi/ERC20.json'
import './index.less'
import SubmitInsuranceDialog from '../../dialogs/submit-insurance-dialog'
import WaitingConfirmationDialog from '../../dialogs/waiting-confirmation-dialog'
import SuccessfulPurchaseDialog from '../../dialogs/successful-purchase-dialog'
import { toFixed } from 'accounting'
import BigNumber from 'bignumber.js'
import { useBalance, useEthBalance } from '../../../hooks'
import { useIndexPrice } from '../../../hooks/insurance'

const { Option } = Select
const NowTime = parseInt(Date.now() / 1000, 10)
const OrderAddress = '0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D'
const DPRlist = [
  { number: 0.0007, show: '0.07%' },
  { number: 0.0014, show: '0.14%' },
  { number: 0.0028, show: '0.28%' },
]
const Supply = props => {
  const [InsuranceType, setInsuranceType] = useState('Call')
  const [InsuranceDPR, setInsuranceDPR] = useState({
    number: 0.0007,
    show: '0.07%',
  })
  const [InsuranceVolume, setInsuranceVolume] = useState('')
  const { InsuranceSymbol } = props
  const [ApproveStatus, setApproveStatus] = useState(false)
  const [DprStatus, setDprStatus] = useState(false)
  const [Earning, setEarning] = useState(0)
  const [OpenWaiting, setOpenWaiting] = useState(false)
  const [OpenSuccess, setOpenSuccess] = useState(false)
  const [IndexPrice, setIndexPrice] = useState(0)
  const [GuardPrice, setGuardPrice] = useState({ Call: 0, Put: 0 })
  const { library, active, account } = useActiveWeb3React()
  const [dprVal, setDprVal] = useState('0.07%')
  const CurrentInsurance = getCurrentInsurance({
    Type: InsuranceType,
    Insurance: InsuranceSymbol,
  })
  const currentIndexPrice = async () => {
    const prices = await useIndexPrice(library, CurrentInsurance)
    setIndexPrice(prices)
  }
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
    const putdata = {
      underlying_chainid: 137,
      underlying_symbol: 'GUARD',
      underlying_decimals_number: 18,
      underlying_address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      collateral_chainid: 137,
      collateral_symbol: 'USDC',
      collateral_decimals_number: 6,
      collateral_address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    }
    const callprices = await useIndexPrice(library, calldata)
    const putprices = await useIndexPrice(library, putdata)
    setGuardPrice({ Call: callprices, Put: putprices })
  }
  const Balance =
    CurrentInsurance.collateral_symbol === 'MATIC'
      ? useEthBalance()
      : useBalance(
        0,
        CurrentInsurance.collateral_address,
        Erc20ABI.abi,
        CurrentInsurance.collateral_decimals_number
      )
  const onSuccessClose = () => {
    setOpenSuccess(false)
  }
  const onWaitClose = () => {
    setOpenWaiting(false)
  }
  // 获取授权状态
  const getApproveStatus = data => {
    const ApproveInsurance = getCurrentInsurance({
      Type: InsuranceType,
      Insurance: InsuranceSymbol,
    })
    const { collateral_address } = ApproveInsurance
    const Erc20Contracts = getContract(
      library,
      Erc20ABI.abi,
      collateral_address
    )
    Erc20Contracts.methods
      .allowance(account, OrderAddress)
      .call()
      .then(res => {
        console.log(res)
        if (Number(res) > 0) {
          return setApproveStatus(true)
        }
        setApproveStatus(false)
      })
  }
  // 发布保险
  const handleClickSupplyInsurance = () => {
    if (ApproveStatus) {
      const SellContracts = getContract(library, OrderABI, OrderAddress)
      const _private = false
      const _collateral = CurrentInsurance.collateral_address
      const _underlying = CurrentInsurance.underlying_address
      let _strikePrice
      if (CurrentInsurance.type === 'Put') {
        _strikePrice = toWei(
          Number(1 / CurrentInsurance.strikeprice) + '',
          CurrentInsurance.strikeprice_decimals
        )
      } else {
        _strikePrice = toWei(
          CurrentInsurance.strikeprice + '',
          CurrentInsurance.strikeprice_decimals
        )
      }
      const _expiry = CurrentInsurance.expiry
      const settleToken = CurrentInsurance.settleToken_address
      const price = toWei(
        new BigNumber(Earning).toString() + '',
        CurrentInsurance.settleToken_decimals
      )
      const volume = toWei(
        InsuranceVolume,
        CurrentInsurance.collateral_decimals
      )
      console.log(
        _private,
        _collateral,
        _underlying,
        _strikePrice,
        _expiry,
        volume,
        settleToken,
        price
      )
      if (CurrentInsurance.collateral_symbol !== 'MATIC') {
        SellContracts.methods
          .sell(
            _private,
            _collateral,
            _underlying,
            _strikePrice,
            _expiry,
            volume,
            settleToken,
            price
          )
          .send({ from: account })
          .on('transactionHash', hash => {
            setOpenWaiting(true)
          })
          .on('receipt', (_, receipt) => {
            setOpenWaiting(false)
            setOpenSuccess(true)
          })
          .on('error', ereor => {
            setOpenWaiting(false)
          })
      } else {
        SellContracts.methods
          .sellOnETH(
            _private,
            _underlying,
            _strikePrice,
            _expiry,
            settleToken,
            price
          )
          .send({
            from: account,
            value: volume,
          })
          .on('transactionHash', hash => {
            setOpenWaiting(true)
          })
          .on('receipt', (_, receipt) => {
            setOpenWaiting(false)
            setOpenSuccess(true)
          })
          .on('error', ereor => {
            setOpenWaiting(false)
          })
      }
    } else {
      const { collateral_address } = CurrentInsurance
      const Erc20Contracts = getContract(
        library,
        Erc20ABI.abi,
        collateral_address
      )
      const Infinitys =
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      Erc20Contracts.methods
        .approve(OrderAddress, Infinitys)
        .send({ from: account })
        .on('transactionHash', hash => {
          setOpenWaiting(true)
        })
        .on('receipt', (_, receipt) => {
          setOpenWaiting(false)
          setOpenSuccess(true)
        })
        .on('error', ereor => {
          setOpenWaiting(false)
        })
    }
  }
  const handleClickDpr = (flag, data = '') => {
    setDprStatus(flag)
    if (data) {
      setInsuranceDPR(data)
    }
  }
  useEffect(() => {
    const DaysRemain = Math.ceil((CurrentInsurance.expiry - NowTime) / 86400)
    const { strikeprice } = CurrentInsurance
    if (InsuranceDPR || InsuranceVolume) {
      console.log(GuardPrice)
      if (InsuranceType === 'Call') {
        // 1. Number =  DPR*花费的GUARD数量*保险剩余天数
        // 2. Premium = Number - Math.min((行权价-执行价),0)
        // 3. Earned = -(Math.max((当前价-执行价),0)-Premium)
        const Numbers =
          InsuranceDPR.number *
          (InsuranceSymbol === 'GUARD'
            ? Number(InsuranceVolume)
            : Number(InsuranceVolume * (IndexPrice / GuardPrice.Call))) *
          DaysRemain
        const Premium = Numbers - Math.min(strikeprice - IndexPrice, 0)
        const Earned = -(Math.max(IndexPrice - strikeprice, 0) - Premium)
        const Expect = Earned > 0 ? Earned.toFixed(8) : 0
        setEarning(Expect)
      } else {
        // 1. Number =  DPR*花费的GUARD数量*保险剩余天数
        // 2. Premium = Number - Math.min((当前价-执行价),0)
        // 3. Earned = -(Math.max((执行价-当前价),0)-Premium)
        const Numbers =
          InsuranceDPR.number *
          Number(InsuranceVolume) *
          GuardPrice.Put *
          DaysRemain
        const Premium = Numbers - Math.min(IndexPrice - strikeprice, 0)
        const Earned = -(Math.max(strikeprice - IndexPrice, 0) - Premium)
        const Expect = Earned > 0 ? Earned.toFixed(8) : 0

        setEarning(Expect)
      }
    }
    if (InsuranceType) {
      getApproveStatus()
      currentIndexPrice()
      currentGuardPrice()
    }
  }, [
    InsuranceDPR,
    InsuranceVolume,
    InsuranceSymbol,
    InsuranceType,
    DprStatus,
  ])

  const setDpr = val => {
    setDprVal(val)
    setInsuranceDPR(val)
  }

  return (
    <div className="insurance_supply">
      <div className="insurance_type">
        <button
          onClick={() => setInsuranceType('Call')}
          className={InsuranceType === 'Call' ? 'insurance_active_call' : ''}
        >
          <FormattedMessage id="insurance_text4" />
        </button>
        <button
          onClick={() => setInsuranceType('Put')}
          className={InsuranceType === 'Put' ? 'insurance_active_put' : ''}
        >
          <FormattedMessage id="insurance_text5" />
        </button>
      </div>
      <div className="insurance_form">
        <p className="between">
          <span>
            <FormattedMessage id="insurance_text6" />
          </span>
          <span>
            <FormattedMessage id="insurance_text7" />
            {CurrentInsurance.strikeprice} USDC
          </span>
        </p>
        <Select value={dprVal} onChange={setDpr}>
          {DPRlist.map(dpr => (
            <Option
              value={dpr.show}
              key={dpr.show}
              disabled={dpr.show === dprVal}
            >
              {dpr.show}
            </Option>
          ))}
        </Select>
        {/* <div className='dpr'>
          <input
            type="text"
            readOnly
            onChange={e => {
              setInsuranceDPR(e.target.value)
            }}
            onClick={() => handleClickDpr(!DprStatus)}
          />
          <span className="name">
            <FormattedMessage id="insurance_text13" />
          </span>
          <span className="number">{InsuranceDPR.show}</span>
          {DprStatus ? (
            <div className="select">
              {DPRlist.map(dpr => (
                <div key={dpr.show} onClick={() => handleClickDpr(false, dpr)}>
                  {dpr.show}
                </div>
              ))}
            </div>
          ) : (
            ''
          )}
        </div> */}
        <p className="left">
          <FormattedMessage id="insurance_text8" />
          {Earning} GUARD
        </p>
        <div className="volume">
          <input
            type="text"
            value={InsuranceVolume}
            maxLength="6"
            onChange={e => {
              setInsuranceVolume(e.target.value)
            }}
          />
          <span>{CurrentInsurance.collateral_symbol}</span>
        </div>
        <p className="left">
          <FormattedMessage id="insurance_text9" />
          {Balance} {CurrentInsurance.collateral_symbol}
        </p>
        <button
          className="confirm"
          onClick={() => handleClickSupplyInsurance()}
        >
          {ApproveStatus ? (
            InsuranceType === 'Call' ? (
              <FormattedMessage id="insurance_text10" />
            ) : (
              <FormattedMessage id="insurance_text11" />
            )
          ) : (
            <FormattedMessage id="insurance_text12" />
          )}
        </button>
      </div>
      <WaitingConfirmationDialog visible={OpenWaiting} onClose={onWaitClose} />
      <SuccessfulPurchaseDialog
        visible={OpenSuccess}
        onClose={onSuccessClose}
      />
    </div>
  )
}

export default Supply
