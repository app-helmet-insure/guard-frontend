import { Token, Route, Pair, TokenAmount } from '@dinoswap/quickswap-sdk'
export const getPairPrice = async (Token1, Token2) => {
  // console.log(Token1, Token2)
  // const TOKEN1 = new Token(
  //   Token1.chainID,
  //   Token1.address,
  //   Token1.decimals,
  //   Token1.symbol,
  //   Token1.name
  // )
  // const TOKEN2 = new Token(
  //   Token2.chainID,
  //   Token2.address,
  //   Token2.decimals,
  //   Token2.symbol,
  //   Token2.name
  // )
  // const WEB3 = await web3()
  try {
    // const address = Pair.getAddress(TOKEN1, TOKEN2)
    // // 获取合约方法
    // const Contracts = await Pair.Contracts(address)
    // // 获取getReserves
    // const result = await Contracts.methods
    //   .getReserves()
    //   .call()
    //   .then(res => res)
    // const balances = TOKEN1.sortsBefore(TOKEN2)
    //   ? [result.reserve0, result.reserve1]
    //   : [result.reserve1, result.reserve0]
    // const pair = new Pair(
    //   new TokenAmount(TOKEN1, balances[0]),
    //   new TokenAmount(TOKEN2, balances[1])
    // )
    // const route = new Route([pair], TOKEN1)
    // const Price = route.midPrice.toSignificant(6)
    // return Price
  } catch (error) {
    console.log(error)
    return 0
  }
}
