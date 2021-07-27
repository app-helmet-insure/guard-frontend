import React from 'react'
import cs from 'classnames'
import {FormattedMessage} from 'react-intl'
import Timer from 'react-compound-timer'
import './index.less'

export default function Countdown ({pools, aprPercentage, now, isFinish}) {
  let left_time = 0
  if (pools && pools.openDate > now) {
    left_time = (pools && pools.openDate - now) * 1000
  } else if (pools && pools.dueDate > now) {
    left_time = (pools.dueDate - now) * 1000
  }
  return (
    <div className="mining_card_apy">
      <p className="mining_card_apy_val">
        {/* pools.openDate 带有倒计时 */}
        <span>{pools && pools.earnName}</span>
        <span className="value">
          {pools && pools.name && !pools.start_at && aprPercentage + '%'}
          {pools &&
          pools.start_at &&
          (pools.start_at > now ? '-%' : aprPercentage + '%')}
        </span>
      </p>
      {pools && pools.openDate && (
        <p className="mining_card_apy_val">
          <span>
            <FormattedMessage id="mining_text5"/>
          </span>
          {pools && pools.openDate > now && !pools.dueDate && (
            <Timer
              initialTime={left_time}
              key={left_time}
              direction="backward"
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
                    `value ${pools && 'countdown_time_' + pools.networkId}`
                  )}
                >
                  <Timer.Hours/>
                  <b>
                    <FormattedMessage id="HourM"/>
                  </b>
                </span>{' '}
                <i>/</i>{' '}
                <span
                  className={cs(
                    `value ${pools && 'countdown_time_' + pools.networkId}`
                  )}
                >
                  {' '}
                  <Timer.Minutes/>
                  <b>
                    <FormattedMessage id="MinM"/>
                  </b>
                </span>
                <i>/</i>{' '}
                <span
                  className={cs(
                    `value ${pools && 'countdown_time_' + pools.networkId}`
                  )}
                >
                  {' '}
                  <Timer.Seconds/>
                  <b>
                    <FormattedMessage id="SecondM"/>
                  </b>
                </span>
              </span>
            </Timer>
          )}
          {pools && pools.openDate > now && pools.dueDate && (
            <Timer
              initialTime={left_time}
              key={left_time}
              direction="backward"
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
                    `value ${pools && 'countdown_time_' + pools.networkId}`
                  )}
                >
                  <Timer.Hours/>
                  <b>
                    <FormattedMessage id="HourM"/>
                  </b>
                </span>{' '}
                <i>/</i>{' '}
                <span
                  className={cs(
                    `value ${pools && 'countdown_time_' + pools.networkId}`
                  )}
                >
                  {' '}
                  <Timer.Minutes/>
                  <b>
                    <FormattedMessage id="MinM"/>
                  </b>
                </span>
              </span>
            </Timer>
          )}
          {pools && pools.dueDate > now && pools.openDate < now && (
            <Timer
              initialTime={left_time}
              key={left_time}
              direction="backward"
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
                    `value ${pools && 'countdown_time_' + pools.networkId}`
                  )}
                >
                  <Timer.Days/>
                  <b>
                    <FormattedMessage id="DayM"/>
                  </b>
                </span>{' '}
                <i>/</i>{' '}
                <span
                  className={cs(
                    `value ${pools && 'countdown_time_' + pools.networkId}`
                  )}
                >
                  <Timer.Hours/>
                  <b>
                    <FormattedMessage id="HourM"/>
                  </b>
                </span>
              </span>
            </Timer>
          )}
          {isFinish && (
            <span className="value">
              <FormattedMessage id="mining_text15"/>
            </span>
          )}
          {pools && !pools.dueDate && pools.openDate <= now && (
            <span className="value">
              <FormattedMessage id="mining_text6"/>
            </span>
          )}
        </p>
      )}
      {pools && !pools.openDate && left_time <= 0 && (
        <p className="mining_card_apy_val">
          <span>
            <FormattedMessage id="mining_text5"/>
          </span>
          <span className="value">
            {' '}
            <FormattedMessage id="mining_text6"/>
          </span>
        </p>
      )}
    </div>
  )
}
