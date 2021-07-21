import axios from 'axios'

export const getInsuranceList = function () {
  return axios({
    method: 'post',
    url: 'https://api.thegraph.com/subgraphs/name/app-helmet-insure/guard',
    data: {
      query: `{
                options(first: 1000) {
                  id
                  creator
                  collateral 
                  underlying
                  strikePrice
                  expiry
                  long
                  short
                  asks {
                    askID
                    seller
                    volume
                    settleToken
                    price
                    isCancel
                    binds {
                      bidID
                      askID
                      buyer
                      volume
                      amount
                    }
                  }
                }
              }
              `,
    },
  })
}
