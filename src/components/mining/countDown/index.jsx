import React from 'react'
import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import Timer from 'react-compound-timer'
import './index.less'

export default function Countdown({ pools, aprPercentage, now, isFinish }) {
  let left_time = 0
  if (pools && pools.start_at > now) {
    left_time = (pools && pools.start_at - now) * 1000
  } else if (pools && pools.dueDate > now) {
    left_time = (pools.dueDate - now) * 1000
  }

  if (!pools) {
    return null
  }
  return (
    <div className='mining_card_apy'>
      <p className='mining_card_apy_val'>
        {/* pools.start_at 带有倒计时 */}
        <span>{pools.earnName}</span>
        {
          pools.is_coming ? (
            <span className='value'>-%</span>
          ) : (
            <span className='value'>
              {pools.name && !pools.start_at && aprPercentage + '%'}
              {pools.start_at &&
              (pools.start_at > now ? '-%' : aprPercentage + '%')}
            </span>
          )
        }
      </p>
      {
        pools.is_coming ? (
          <p className='mining_card_apy_val'>
            <FormattedMessage id="mining_text24"/>
          </p>
        ):(
          <>
            {pools.start_at && (
              <p className='mining_card_apy_val'>
          <span>
            <FormattedMessage id='mining_text5' />
          </span>
                {pools.start_at > now && !pools.dueDate && (
                  <Timer
                    initialTime={left_time}
                    key={left_time}
                    direction='backward'
                    formatValue={(number) => {
                      if (number === 0) return '00'
                      if (number < 10) {
                        return `0${number}`
                      }
                      return number
                    }}
                  >
              <span>
                <span
                  className={cs(
                    `value ${'countdown_time_' + pools.networkId}`
                  )}
                >
                  <Timer.Hours />
                  <b>
                    <FormattedMessage id='HourM' />
                  </b>
                </span>{' '}
                <i>/</i>{' '}
                <span
                  className={cs(
                    `value ${'countdown_time_' + pools.networkId}`
                  )}
                >
                  {' '}
                  <Timer.Minutes />
                  <b>
                    <FormattedMessage id='MinM' />
                  </b>
                </span>
                <i>/</i>{' '}
                <span
                  className={cs(
                    `value ${'countdown_time_' + pools.networkId}`
                  )}
                >
                  {' '}
                  <Timer.Seconds />
                  <b>
                    <FormattedMessage id='SecondM' />
                  </b>
                </span>
              </span>
                  </Timer>
                )}
                {pools.start_at > now && pools.dueDate && (
                  <Timer
                    initialTime={left_time}
                    key={left_time}
                    direction='backward'
                    formatValue={(number) => {
                      if (number === 0) return '00'
                      if (number < 10) {
                        return `0${number}`
                      }
                      return number
                    }}
                  >
              <span>
                <span
                  className={cs(
                    `value ${'countdown_time_' + pools.networkId}`
                  )}
                >
                  <Timer.Hours />
                  <b>
                    <FormattedMessage id='HourM' />
                  </b>
                </span>{' '}
                <i>/</i>{' '}
                <span
                  className={cs(
                    `value ${'countdown_time_' + pools.networkId}`
                  )}
                >
                  {' '}
                  <Timer.Minutes />
                  <b>
                    <FormattedMessage id='MinM' />
                  </b>
                </span>
              </span>
                  </Timer>
                )}
                {pools.dueDate > now && pools.start_at < now && (
                  <Timer
                    initialTime={left_time}
                    key={left_time}
                    direction='backward'
                    formatValue={(number) => {
                      if (number === 0) return '00'
                      if (number < 10) {
                        return `0${number}`
                      }
                      return number
                    }}
                  >
              <span>
                <span
                  className={cs(
                    `value ${'countdown_time_' + pools.networkId}`
                  )}
                >
                  <Timer.Days />
                  <b>
                    <FormattedMessage id='DayM' />
                  </b>
                </span>{' '}
                <i>/</i>{' '}
                <span
                  className={cs(
                    `value ${'countdown_time_' + pools.networkId}`
                  )}
                >
                  <Timer.Hours />
                  <b>
                    <FormattedMessage id='HourM' />
                  </b>
                </span>
              </span>
                  </Timer>
                )}
                {isFinish && (
                  <span className='value'>
              <FormattedMessage id='mining_text15' />
            </span>
                )}
                {!pools.dueDate && pools.start_at <= now && (
                  <span className='value'>
              <FormattedMessage id='mining_text6' />
            </span>
                )}
              </p>
            )}
            {!pools.start_at && left_time <= 0 && (
              <p className='mining_card_apy_val'>
          <span>
            <FormattedMessage id='mining_text5' />
          </span>
                <span className='value'>
            {' '}
                  <FormattedMessage id='mining_text6' />
          </span>
              </p>
            )}
          </>
        )
      }
    </div>
  )
}
