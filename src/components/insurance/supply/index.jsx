import React, { useState, useEffect, useContext, useMemo } from 'react'
import { withRouter } from 'react-router'
import { VarContext } from '../../../context'
import PolicySvg from '../../../assets/images/insurance/policy.svg'
import { Select, Tooltip } from 'antd'
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
import PoolList from '../../../configs/mining'
import { getMiningInfo, getAPR, getMdxARP } from '../../../hooks/mining'
import BigNumber from 'bignumber.js'
import { useBalance, useEthBalance } from '../../../hooks'
import { useIndexPrice } from '../../../hooks/insurance'
import InfoSvg from '../../../assets/images/insurance/info.svg'
import StakeChaimDialog from '@/components/dialogs/stake-chaim-dialog'
import ERC20 from '../../../web3/abi/ERC20.json'
import moment from 'moment'

const { Option } = Select
const NowTime = parseInt(Date.now() / 1000, 10)
const OrderAddress = '0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D'
const DPRlist = [
  { number: 0.0007, show: '0.07%' },
  { number: 0.0014, show: '0.14%' },
  { number: 0.0028, show: '0.28%' },
]
const Supply = props => {
  const { blockHeight } = useContext(VarContext)
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
  const [OpenSubmit, setOpenSubmit] = useState(false)
  const [OpenStake, setOpenStake] = useState(false)
  const [IndexPrice, setIndexPrice] = useState(0)
  const [GuardPrice, setGuardPrice] = useState({ Call: 0, Put: 0 })
  const { library, active, account } = useActiveWeb3React()
  const [aprPercentage, setPercentage] = useState('-')
  const [miningPools, setMiningPools] = useState(null)
  const [Apr, setApr] = useState('0')
  const [MdexApr, setMdexApr] = useState('0')
  const CurrentInsurance = getCurrentInsurance({
    Type: InsuranceType,
    Insurance: InsuranceSymbol,
  })
  const CurrentPool =
    PoolList.filter(
      pool =>
        pool.cover === CurrentInsurance.type &&
        pool.name.toUpperCase() === CurrentInsurance.insurance
    )[0] || ''
  // 获取池子信息
  useMemo(() => {
    if (blockHeight !== 0 && CurrentPool) {
      // 静态的 不做任何请求
      if (CurrentPool.is_coming) {
        setMiningPools(CurrentPool)
        return
      }
      getMiningInfo(CurrentPool.address, account).then(miningPools_ => {
        setMiningPools(miningPools_)
        getAPR(miningPools_, miningPools_.earnName === 'APY' ? 2 : 1).then(
          setApr
        )
        if (miningPools_.mdexReward) {
          // 奖励2的apr
          getMdxARP(miningPools_).then(res => {
            setMdexApr(res.apr)
          })
        }
      })
    }
  }, [blockHeight, account, InsuranceType, InsuranceSymbol])

  const Balance =
    CurrentInsurance.collateral_symbol === 'MATIC'
      ? useEthBalance()
      : useBalance(
        1,
        CurrentInsurance.collateral_address,
        Erc20ABI.abi,
        CurrentInsurance.collateral_decimals_number
      ) || 0
  const LpBalance = useBalance(
    blockHeight,
    CurrentPool && CurrentPool.MLP,
    ERC20.abi,
    CurrentPool && CurrentPool.mlpDecimal
  )
  useMemo(() => {
    if (
      Apr > 0 &&
      miningPools &&
      (!miningPools.mdexReward || MdexApr > 0) &&
      !miningPools.is_coming
    ) {
      const percentage_ = (Apr * 100 + MdexApr * 100).toFixed(2)
      if (isFinite(percentage_)) {
        setPercentage(percentage_)
      }
    }
  }, [Apr, MdexApr])

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
  const currentIndexPrice = async () => {
    const data = getCurrentInsurance({
      Type: 'Call',
      Insurance: InsuranceSymbol,
    })
    const prices = await useIndexPrice(library, data)
    setIndexPrice(prices)
  }
  const onSuccessClose = () => {
    setOpenSuccess(false)
  }
  const onWaitClose = () => {
    setOpenWaiting(false)
  }
  const onSubmitClose = () => {
    setOpenSubmit(false)
  }
  const onStakeClose = () => {
    setOpenStake(false)
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
        if (Number(res) > 0) {
          return setApproveStatus(true)
        }
        setApproveStatus(false)
      })
  }
  // 发布保险
  const supplyInsurance = () => {
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
      new BigNumber((Earning / InsuranceVolume).toFixed(8)).toString() + '',
      CurrentInsurance.settleToken_decimals
    )
    const volume = toWei(InsuranceVolume, CurrentInsurance.collateral_decimals)
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
  }
  const submitNotice = flag => {
    if (flag) {
      setOpenSubmit(false)
      supplyInsurance()
    }
  }
  const handleClickSupply = () => {
    if (ApproveStatus) {
      setOpenSubmit(true)
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
          setApproveStatus(true)
        })
        .on('error', ereor => {
          setOpenWaiting(false)
        })
    }
  }
  const handleClickDpr = data => {
    setInsuranceDPR({ number: data.key, show: data.value })
  }
  const handleClickStake = () => {
    setOpenStake(true)
  }
  useEffect(() => {
    if (!active) {
      return
    }
    const DaysRemain = Math.ceil((CurrentInsurance.expiry - NowTime) / 86400)
    const { strikeprice } = CurrentInsurance
    if (InsuranceDPR || InsuranceVolume || InsuranceType || InsuranceSymbol) {
      if (InsuranceType === 'Call') {
        // 1. Number =  DPR*花费的GUARD数量*保险剩余天数
        // 2. Premium = Number - Math.min((行权价-当前价),0)
        // 3. Earned = -(Math.max((当前价-行权价),0)-Premium)
        const NumberDPR =
          InsuranceDPR.number *
          (InsuranceSymbol === 'GUARD'
            ? Number(InsuranceVolume)
            : Number((IndexPrice * InsuranceVolume) / GuardPrice.Call)) *
          DaysRemain
        const NumberMIN =
          (Math.min(Number(strikeprice) - Number(IndexPrice), 0) *
            InsuranceVolume) /
          GuardPrice.Call
        const Premium = NumberDPR - NumberMIN
        const Expecting = Number(Premium) > 0 ? Premium.toFixed(8) : 0
        setEarning(Expecting)
      } else {
        // 1. Number =  DPR*花费的GUARD数量*保险剩余天数
        // 2. Premium = Number - Math.min((当前价-行权价),0)
        // 3. Earned = -(Math.max((行权价-当前价),0)-Premium)
        const NumberDPR =
          InsuranceDPR.number *
          Number(InsuranceVolume) *
          GuardPrice.Put *
          DaysRemain
        const NumberMIN =
          (Math.min(Number(IndexPrice) - Number(strikeprice), 0) *
            InsuranceVolume) /
          GuardPrice.Call
        const Premium = NumberDPR - NumberMIN
        const Expecting = Number(Premium) > 0 ? Premium.toFixed(8) : 0
        setEarning(Expecting)
      }
    }
    if (InsuranceType || InsuranceSymbol) {
      currentGuardPrice()
      currentIndexPrice()
      getApproveStatus()
      setPercentage('-')
    }
  }, [
    InsuranceDPR,
    InsuranceVolume,
    InsuranceSymbol,
    InsuranceType,
    DprStatus,
    active,
  ])
  const ToolTipText = <FormattedMessage id={'insurance_text28'} />
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
            {CurrentInsurance.insurance} {CurrentInsurance.strikeprice} USDC
          </span>
        </p>
        <div className="select">
          <Tooltip placement="top" title={ToolTipText}>
            <img src={InfoSvg} alt="" />
          </Tooltip>
          <Select
            defaultValue={InsuranceDPR.show}
            onChange={(value, option) => handleClickDpr(option)}
          >
            {DPRlist.map(dpr => (
              <Option
                value={dpr.show}
                key={dpr.number}
                disabled={dpr.show === InsuranceDPR.show}
              >
                {dpr.show}
              </Option>
            ))}
          </Select>
        </div>
        <p className="left">
          <FormattedMessage id="insurance_text8" />
          {Earning} GUARD
        </p>
        <div className="volume">
          <input
            type="text"
            value={InsuranceVolume}
            maxLength="7"
            onChange={e => {
              setInsuranceVolume(e.target.value)
            }}
          />
          <p>
            <span className="max" onClick={() => setInsuranceVolume(Balance)}>
              Max
            </span>
            <span className="symbol">{CurrentInsurance.collateral_symbol}</span>
          </p>
        </div>
        <p className="left">
          <FormattedMessage id="insurance_text9" />
          {Balance} {CurrentInsurance.collateral_symbol}
        </p>
        <button
          className={`confirm ${!CurrentInsurance.status ? 'diasable' : ''}`}
          onClick={() => handleClickSupply()}
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
        {CurrentPool ? (
          <div className="short_mining">
            <img src={PolicySvg} alt="" />
            <div>
              <p>
                <FormattedMessage id="insurance_tips1"></FormattedMessage>
              </p>
              <div className="stake">
                <span className="apr">APR: {aprPercentage}%</span>
                <button onClick={() => handleClickStake()}>STAKE</button>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      <SubmitInsuranceDialog
        visible={OpenSubmit}
        onClose={onSubmitClose}
        submit={value => submitNotice(value)}
        params={{
          type: CurrentInsurance.type,
          symbol: CurrentInsurance.insurance,
          collateral: CurrentInsurance.collateral_symbol,
          volume: InsuranceVolume,
          strikeprice: CurrentInsurance.strikeprice,
          price: Earning,
          expiry: moment(new Date(CurrentInsurance.expiry * 1000)).format(
            'YYYY/MM/DD HH:mm:ss'
          ),
        }}
      />
      <StakeChaimDialog
        visible={OpenStake}
        tab={'Stake'}
        pool={CurrentPool}
        onClose={onStakeClose}
        balance={LpBalance}
        isEnd={false}
        showTabs={'Stake'}
      />
      <WaitingConfirmationDialog visible={OpenWaiting} onClose={onWaitClose} />
      <SuccessfulPurchaseDialog
        visible={OpenSuccess}
        onClose={onSuccessClose}
      />
    </div>
  )
}

export default withRouter(Supply)
