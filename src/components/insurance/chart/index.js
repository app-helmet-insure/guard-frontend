import React, { Component, useEffect, useMemo, useState } from 'react'
import Highcharts from 'highcharts'
import axios from 'axios'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client'
import dayjs from 'dayjs'
import { range, clone } from 'lodash'

import './index.less'
import BigNumber from 'bignumber.js'
import { getHttpWeb3 } from '../../../web3'
import { ChainId } from '../../../web3/address'
import {multicallClient} from '../../../web3/multicall'

const API = 'https://guard.insure/swapgraph'
const STATUS = 'https://api.thegraph.com/index-node/graphql'
const USDC_ADDRESS = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
/**
 * @param props
 *  - lpt_address // pair token address
 *  - over_price
 *  - off_price
 * @returns {JSX.Element}
 * @constructor
 */

const getLastBlock = async () => {
  const client = new ApolloClient({
    uri: STATUS,
    cache: new InMemoryCache(),
  })

  const query = gql`
      {
          indexingStatusForCurrentVersion(subgraphName: "sameepsi/quickswap06") {
              synced
              health
              fatalError {
                  message
                  block {
                      number
                      hash
                  }
                  handler
              }
              chains {
                  chainHeadBlock {
                      number
                  }
                  latestBlock {
                      number
                  }
              }
          }
      }
  `
  const ret = await client.query({
    query,
  })
  return ret.data.indexingStatusForCurrentVersion.chains[0].latestBlock.number
}

export const Chart = props => {
  // const [loading, setLoading] = useState(true)

  const { lpt_address, over_price, off_price } = props

  const [price, setPrice] = useState('-')

  const loadData = async () => {
    const client = new ApolloClient({
      uri: API,
      cache: new InMemoryCache(),
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
      query,
    })
    // init data
    const end_time = dayjs()
      .startOf('hour')
      .unix()
    const start_time = Math.floor(end_time - 24 * 3600)
    const timeline = range(start_time, end_time, 3600).map(timestamp => ({
      timestamp,
      value: 0,
    }))

    let last_price = 0
    let pre_price = 0
    const { pairs = [] } = ret.data
    if (pairs.length > 0) {
      const [pair] = pairs
      let { token1, pairHourData = [] } = pair
      // reverse
      pairHourData = clone(pairHourData).reverse()

      pairHourData.map(hour_data => {
        if (USDC_ADDRESS.toLowerCase() !== token1) {
          last_price =
            new BigNumber(hour_data.reserve1)
              .dividedBy(new BigNumber(hour_data.reserve0))
              .toFixed(6) * 1
        } else {
          last_price =
            new BigNumber(hour_data.reserve0)
              .dividedBy(new BigNumber(hour_data.reserve1))
              .toFixed(6) * 1
        }

        const index = timeline.findIndex(
          line => hour_data.hourStartUnix === line.timestamp
        )
        if (index !== -1) {
          timeline[index].value = last_price
        }

        if (hour_data.hourStartUnix <= start_time) {
          pre_price = last_price
        }

        return hour_data
      })
    }

    let max = 0,
      min = Math.pow(10, 10)
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

      return [line.timestamp * 1000, line.value]
    })

    setPrice(last_price)
    return [data, min, max]
  }

  const loadDataByBlock = async () => {

    const end_time = dayjs()
      .startOf('hour')
      .unix()
    const start_time = Math.floor(end_time - 24 * 3600 * 7)

    const {priceList7Day, min, max, tPrice} = await axios
      .post(
        'https://api.defined.fi/',
        {
          query:
            'query ExampleQuery($from: Int!, $resolution: String!, $symbol: String!, $to: Int!) {\n  getBars(from: $from, resolution: $resolution, symbol: $symbol, to: $to) {\n    h\n t\n }\n}\n',
          variables: {
            to: end_time,
            symbol: lpt_address + ':' + ChainId.MATIC,
            resolution: '60',
            from: start_time,
          },
          operationName: 'ExampleQuery',
        },
        {
          headers: {
            'x-api-key': 'ZDhetvbpiAB1dMn9FPP8SRkcSnoueg2hf1poyY30',
          },
        },
      )
      .then(res => {
        const priceList = res.data.data.getBars.h
        const timeLine = res.data.data.getBars.t
        const result = []
        let min_ = 0
        let max_ = 0
        for (let i = 0; i < priceList.length; i++) {
          result.push([timeLine[i] * 1000, priceList[i]])
          if (priceList[i] > max_) {
            max_ = priceList[i]
          }
          if (priceList[i] < min_) {
            min_ = priceList[i]
          }
        }
        return {
          priceList7Day: result,
          min: min_,
          max: max_,
          tPrice: result[result.length - 1][1]
        }
      })

    setPrice(tPrice)
    // data = [item.timestamp * 1000, _price]
    return [priceList7Day, min, max]
  }

  const initChart = async () => {
    const [data, min, max] = await loadDataByBlock()
    const chartDom = document.getElementById(`chart_${lpt_address}`)
    chartDom &&
      Highcharts.chart(chartDom, {
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
            year: '%Y',
          },
          legend: {
            enabled: false,
          },
          labels: {
            style: {
              color: '#CFCFD2',
            },
          },
          tickWidth: 0,
          lineWidth: 0,
          gridLineWidth: 0,
        },
        tooltip: {
          enabled: false,
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
            enabled: false,
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
                },
              },
            },
            {
              color: 'green',
              width: 1,
              value: over_price,
              label: {
                text: over_price,
                style: {
                  color: 'green',
                },
              },
            },
          ],
        },
        legend: {
          enabled: false,
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
                  const { x, y } = e.target.options
                  setPrice(y)
                },
              },
            },
          },
        ],
        events: {},
        credits: false,
      })
    // setLoading(false)
  }

  useEffect(() => {
    initChart()
  }, [lpt_address, over_price, off_price])
  return (
    <div className="chart">
      {/* {*/}
      {/*  loading && <div className="chat_loading flex_center">*/}
      {/*    loading...*/}
      {/*  </div>*/}
      {/* }*/}
      <div className="chart_header">
        <div className="chart_header_title">Last Pirce:</div>
        <div className="chart_header_price">{price} USDC</div>
      </div>
      <div id={`chart_${lpt_address}`} className={'chart_body'}></div>
    </div>
  )
}
