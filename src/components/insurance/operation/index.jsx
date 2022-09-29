import React, { useState } from 'react'
import Supply from '@/components/insurance/supply'
import Market from '@/components/insurance/market'
import { FormattedMessage } from 'react-intl'
import CallSvg from '@/assets/images/insurance/call.svg'
import PutSvg from '@/assets/images/insurance/put.svg'
import Select from '@/assets/images/insurance/select.svg'
import { getCurrentInsurance } from '../../../configs/insurance'
import './index.less'
import { Chart } from '../chart'
const Operation = props => {
  const [ActionType, setActionType] = useState('')
  const [InsuranceTime] = useState('2021-07-21 24:00')
  const { InsuranceSymbol, PairUSDC, Logo, Expiry, ShowName } = props
  const PutCurrentInsurance = getCurrentInsurance({
    Type: 'Put',
    Insurance: InsuranceSymbol,
  })
  const CallCurrentInsurance = getCurrentInsurance({
    Type: 'Call',
    Insurance: InsuranceSymbol,
  })
  const handleChilciActiveType = Type => {
    if (Type === ActionType) {
      setActionType('')
    } else {
      setActionType(Type)
    }
  }
  return (
    <div className="insurance_operation_wrap">
      <div className="insurance_operation">
        <div className="insurance_control">
          <div className="insurance_operation_left">
            <div className="logo">
              <img src={Logo} alt="" />
              <p>{ShowName}</p>
              <span>{Expiry}</span>
            </div>
            <div className="price">
              <div className="call price_cell">
                <img src={CallSvg} alt="" />
                <div>
                  <span>
                    <FormattedMessage id="insurance_text14" />
                  </span>
                  <span>
                    {CallCurrentInsurance.strikeprice}{' '}
                    {CallCurrentInsurance.indextoken}
                  </span>
                </div>
              </div>
              <div className="put price_cell">
                <img src={PutSvg} alt="" />
                <div>
                  <span>
                    <FormattedMessage id="insurance_text15" />
                  </span>
                  <span>
                    {PutCurrentInsurance.strikeprice}{' '}
                    {PutCurrentInsurance.indextoken}
                  </span>
                </div>
              </div>
            </div>
            <div className="buttons">
              <button
                className="market"
                onClick={() => handleChilciActiveType('MARKET')}
              >
                <FormattedMessage id="insurance_text16" /> <img src={Select} alt="" />
              </button>
              <button
                className="supply"
                onClick={() => handleChilciActiveType('SUPPLY')}
              >
                <FormattedMessage id="insurance_text17" /> <img src={Select} alt="" />
              </button>
            </div>
          </div>
          <div className="insurance_operation_right">
            <Chart
              lpt_address={PairUSDC}
              over_price={CallCurrentInsurance.strikeprice}
              off_price={PutCurrentInsurance.strikeprice}
              tokenAddress={props.tokenAddress}
            />
          </div>
        </div>
        {ActionType === 'MARKET' ? (
          <Market InsuranceSymbol={InsuranceSymbol} />
        ) : (
          ''
        )}
        {ActionType === 'SUPPLY' ? (
          <Supply InsuranceSymbol={InsuranceSymbol} />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
export default Operation
