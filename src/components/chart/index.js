import React, {Component, useEffect, useMemo, useState} from 'react'
import Highcharts from 'highcharts'
import axios from 'axios'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from '@apollo/client'
import dayjs from 'dayjs'
import {range, clone} from 'lodash'

import './index.less'
import BigNumber from 'bignumber.js'

const API = 'https://api.thegraph.com/subgraphs/name/sameepsi/quickswap03'
const WMATIC_ADDRESS = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'
/**
 * @param props
 *  - lpt_address // pair token address
 *  - over_price
 *  - off_price
 * @returns {JSX.Element}
 * @constructor
 */
export const Chart = props => {

  const {lpt_address, over_price, off_price} = props

  const [price, setPrice] = useState(0)

  const loadData = async () => {
    const client = new ApolloClient({
      uri: API,
      cache: new InMemoryCache()
    })

    const query = gql`
      {
        pairs(
          first:1,  
          where: {id: "${lpt_address.toLowerCase()}"}
        ) {
          id
          token0 {
              id
              symbol
          }
          token1 {
              id
              symbol
          }
          pairHourData(first: 30, orderBy: hourStartUnix, orderDirection: desc) {
            id
            reserve0
            reserve1
            hourStartUnix
          }
        }
      }
    `
    // query last 24 hours data
    const ret = await client.query({
      query
    })

    // init data

    const start_time = Math.floor(dayjs().startOf('hour').unix() - 24 * 3600)
    const timeline = range(start_time, start_time + 24 * 3600, 3600).map(timestamp => ({
      timestamp, value: 0
    }))


    let last_price = 0
    let pre_price = 0
    const {pairs = []} = ret.data
    if (pairs.length > 0) {
      const [pair] = pairs
      let {token1, pairHourData = []} = pair
      // reverse
      pairHourData = clone(pairHourData).reverse()

      pairHourData.map(hour_data => {
        if (WMATIC_ADDRESS.toLowerCase() === token1) {
          last_price = new BigNumber(hour_data.reserve1).dividedBy(new BigNumber(hour_data.reserve0)).toFixed(6) * 1
        } else {
          last_price = new BigNumber(hour_data.reserve0).dividedBy(new BigNumber(hour_data.reserve1)).toFixed(6) * 1
        }
        
        const index = timeline.findIndex(line => hour_data.hourStartUnix === line.timestamp)
        if (index !== -1) {
          timeline[index].value = last_price
        }

        if (hour_data.hourStartUnix <= start_time) {
          pre_price = hour_data
        }

        return hour_data
      })
    }

    let max = 0, min = Math.pow(10, 10)
    const data = timeline.map(line => {
      if (line.value === 0) {
        line.value = pre_price
      }
      pre_price = line.value

      if (line.value > max) {
        max = line.value
      }

      if (line.value < min) {
        min = line.value
      }

      return [
        line.timestamp * 1000,
        line.value
      ]
    })

    setPrice(last_price)
    return [data, min, max]
  }


  const initChart = async () => {
    const [data, min, max] = await loadData()

    Highcharts.chart(document.getElementsByClassName('chart_body')[0], {
      title: {
        text: null,
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          millisecond: '%H:%M:%S.%L',
          second: '%H:%M:%S',
          minute: '%H:%M',
          hour: '%I %p',
          day: '%I %p',
          // day: '%m-%d',
          week: '%m-%d',
          month: '%Y-%m',
          year: '%Y'
        },
        legend: {
          enabled: false
        },
        labels: {
          style: {
            color: '#CFCFD2'
          }
        },
        tickWidth: 0,
        lineWidth: 0,
        gridLineWidth: 0,
      },
      tooltip: {
        enabled: false
      },
      yAxis: {
        min: Math.min(min, off_price),
        max: Math.max(max, over_price),
        title: null,
        visible: true,
        tickWidth: 0,
        lineWidth: 0,
        gridLineWidth: 0,
        labels: {
          enabled: false
        },
        plotLines: [
          {
            color: 'red',
            width: 1,
            value: off_price,
            label: {
              text: off_price,
              style: {
                color: 'red',
              }
            }
          },
          {
            color: 'green',
            width: 1,
            value: over_price,
            label: {
              text: over_price,
              style: {
                color: 'green',
              }

            }
          },
        ]
      },
      legend: {
        enabled: false
      },
      series: [
        {
          data: data,
          color: '#4364E8',
          states: {
            hover: {
              lineWidthPlus: 0,
            },
          },
          marker: {
            enabled: false,
          },
          point: {
            events: {
              mouseOver: e => {
                const {x, y} = e.target.options
                setPrice(y)
              }
            }
          }
        }
      ],
      events: {

      },
      credits: false
    })
  }

  useEffect(() => {
    initChart()
  }, [lpt_address, over_price, off_price])
  return (
    <div className="chart">
      <div className="chart_header">
        <div className="chart_header_title">
          Last Pirce:
        </div>
        <div className="chart_header_price">
          {price} MATIC
        </div>
      </div>
      <div className="chart_body">
      </div>
    </div>
  )
}
