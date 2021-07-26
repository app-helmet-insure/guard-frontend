import React, { useState, useEffect, useContext } from 'react'
import { VarContext } from '../../../context'
import Web3 from 'web3'
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
  const { library, active, account } = useActiveWeb3React()
  const CurrentInsurance = getCurrentInsurance({
    Type: InsuranceType,
    Insurance: InsuranceSymbol,
  })
  const currentIndexPrice = async () => {
    const prices = await useIndexPrice(library, CurrentInsurance)
    setIndexPrice(prices)
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
    const { collateral_address } = CurrentInsurance
    const Erc20Contracts = getContract(
      library,
      Erc20ABI.abi,
      collateral_address
    )
    Erc20Contracts.methods
      .allowance(account, OrderAddress)
      .call()
      .then(res => {
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
      const _strikePrice = toWei(
        CurrentInsurance.strikeprice + '',
        CurrentInsurance.strikeprice_decimals
      )
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
      if (InsuranceType === 'Call') {
        // 1. Number =  DPR*花费的GUARD数量*保险剩余天数
        // 2. Premium = Number - Math.min((行权价-执行价),0)
        // 3. Earned = -(Math.max((当前价-执行价),0)-Premium)
        const Numbers =
          InsuranceDPR.number * Number(InsuranceVolume) * DaysRemain
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
          (IndexPrice
            ? Number(InsuranceVolume) / IndexPrice
            : Number(InsuranceVolume)) *
          DaysRemain
        const Premium = Numbers - Math.min(IndexPrice - strikeprice, 0)
        const Earned = -(Math.max(strikeprice - IndexPrice, 0) - Premium)
        const Expect = Earned > 0 ? Earned.toFixed(8) : 0
        console.log(
          InsuranceDPR.number,
          InsuranceVolume,
          IndexPrice,
          DaysRemain
        )
        console.log(Premium, Earned, Expect)
        setEarning(Expect)
      }
    }
    if (InsuranceSymbol || InsuranceType) {
      getApproveStatus()
      currentIndexPrice()
    }
  }, [
    InsuranceDPR,
    InsuranceVolume,
    InsuranceSymbol,
    InsuranceType,
    DprStatus,
  ])
  return (
    <div className="insurance_supply">
      <div className="insurance_type">
        <button
          onClick={() => setInsuranceType('Call')}
          className={InsuranceType === 'Call' ? 'insurance_active_call' : ''}
        >
          Cover Miss Out
        </button>
        <button
          onClick={() => setInsuranceType('Put')}
          className={InsuranceType === 'Put' ? 'insurance_active_put' : ''}
        >
          Cover 50% Off
        </button>
      </div>
      <div className="insurance_form">
        <p className="between">
          <span>Insurance Price</span>
          <span>Guard: 2.0000 USD</span>
        </p>
        <div className="dpr">
          <input
            type="text"
            readOnly
            onChange={e => {
              setInsuranceDPR(e.target.value)
            }}
            onClick={() => handleClickDpr(!DprStatus)}
          />
          <span className="name">DPR</span>
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
        </div>
        <p className="left">预期最大收益: {Earning} GUARD</p>
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
          可用余额: {Balance} {CurrentInsurance.collateral_symbol}
        </p>
        <button
          className="confirm"
          onClick={() => handleClickSupplyInsurance()}
        >
          {ApproveStatus
            ? InsuranceType === 'Call'
              ? '立即创建翻倍险'
              : '立即创建腰斩险'
            : '授权'}
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
