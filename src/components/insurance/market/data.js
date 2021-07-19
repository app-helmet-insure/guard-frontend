import axios from 'axios'
export const getInsuranceList = async function () {
  axios({
    method: 'post',
    url:
            'https://api.thegraph.com/subgraphs/name/app-helmet-insure/helmet-insure',
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
  }).then(res=>{
    const data  = res.data.data.options
    console.log(data)
  })
}
