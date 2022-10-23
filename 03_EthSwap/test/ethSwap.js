const ApeCoin = artifacts.require("ApeCoin")
const EthSwap = artifacts.require("EthSwap")



contract('EthSwap', (accounts) => {
  let token, ethSwap
  let TotalSupply = 10000000000
  let buyNum = 1000
  let sellNum = 6
  let admin = accounts[0]
  let user1 = accounts[1]
  let tokenRate = 100 // 100 wei : 1 token

  before(async () => {
    token = await ApeCoin.new()
    ethSwap = await EthSwap.new(token.address)
    await token.transfer(ethSwap.address, TotalSupply)
  })

  describe('EthSwap deployed', async () => {
    it('ethswap infomation', async () => {
      const name = await ethSwap.name()
      assert.equal(name, "EthSwap Instant Exchange", "EthSwap name is not correctly")
    })
    
    it('EthSwap has token', async () => {
      const balance = await token.balanceOf(ethSwap.address)
      assert.equal(balance.toNumber(), TotalSupply, "ethSwap does not have token contract")
    })
  })

  describe('Buy and sell tokens', async () => {

    it('Allow users to buy Ape Coins in a price', async () => {
      let result = await ethSwap.buyTokens({from : user1, value : buyNum})
      const balanceEthSwap = await token.balanceOf(ethSwap.address)
      const balanceUser1 = await token.balanceOf(user1)
      assert.equal(balanceEthSwap.toNumber(), TotalSupply - buyNum * tokenRate, "balance of Eth Swap should decrise 10")
      assert.equal(balanceUser1.toNumber(), buyNum * tokenRate, "balance of user1 is 1000")

      const event = result.logs[0].args
      assert.equal(event.account, user1)
      assert.equal(event.token, token.address)
      assert.equal(event.tokenAmount, buyNum * tokenRate)
      assert.equal(event.rate , tokenRate)
    })

    it('Allow users to sell Ape Coins in a price', async () => {
      await token.approve(ethSwap.address, 1000, {from : user1})
      let result = await ethSwap.sellTokens(500, {from : user1})

      const balance1 = buyNum * tokenRate - 500;
      const balance2 = await token.balanceOf(user1)
      assert.equal(balance1 , balance2.toNumber())

      const event = result.logs[0].args
      assert.equal(event.account, user1)
      assert.equal(event.token, token.address)
      assert.equal(event.tokenAmount, 500)
      assert.equal(event.rate , tokenRate)
    })
  })
})
