const ApeCoin = artifacts.require("ApeCoin");


contract('ApeCoin', (accounts) => {

  let ApeCoinInstance
  let admin = accounts[0]
  let user1 = accounts[1]
  let user2 = accounts[2]
  let user3 = accounts[3]
  let TOTAL = 10000000000
  let TRANSNUM = 50000
  
  before(async () => {

    ApeCoinInstance = await ApeCoin.deployed()
  });

  describe('ApeCoin deployed', async () => {

    it('should get apecoin name, symbol, decimals and totalSupply correctly', async () => {
      
      const name = await ApeCoinInstance.name()
      const symbol = await ApeCoinInstance.symbol()
      const decimals = await ApeCoinInstance.decimals()
      const totalSupply = await ApeCoinInstance.totalSupply()
  
      assert.equal(name, "Ape Coin", "Name is wrong")
      assert.equal(symbol, "APE", "Symbol is wrong")
      assert.equal(decimals, 4 , "Decimals is wrong")
      assert.equal(totalSupply, TOTAL , "TotalSupply is wrong")
    });
  
    it('should put 10000000000 ApeCoin in the first account', async () => {
      const balance = await ApeCoinInstance.balanceOf(accounts[0])
  
      assert.equal(balance.valueOf(), TOTAL, "10^10 wasn't in the first account")
    });

    it('should transfer 2000 coins to user correctly', async () => {
      await ApeCoinInstance.transfer(user1, 50000, {from : admin});
      const balanceUser1 = await ApeCoinInstance.balanceOf(user1)
      const balanceAdmin = await ApeCoinInstance.balanceOf(admin)

      assert.equal(balanceAdmin.toNumber(), TOTAL - TRANSNUM, 
        "Sender's balance is not 10^10 - 50000")
      assert.equal(balanceUser1.toNumber(), TRANSNUM, " receiver balance is not 50000")
    });

    it('should transferFrom correctly', async () => {
      const APPROVENUM = 10000;
      const TRANSFROMNUM = 3000;
      await ApeCoinInstance.approve(user2, APPROVENUM, {from : user1})
      var allowance = await ApeCoinInstance.allowance(user1, user2)
      assert.equal(allowance.toNumber(), APPROVENUM, "Approve is not 10000")

      await ApeCoinInstance.transferFrom(user1, user2, TRANSFROMNUM, {from : user2})
      allowance = await ApeCoinInstance.allowance(user1, user2)
      const balanceUser1 = await ApeCoinInstance.balanceOf(user1)
      const balanceUser2 = await ApeCoinInstance.balanceOf(user2)
      assert.equal(allowance.toNumber(), APPROVENUM - TRANSFROMNUM, 
        "allowance is not 7000 after transferFrom()")
      assert.equal(balanceUser1.toNumber(), TRANSNUM - TRANSFROMNUM, 
        "User1 balance is not 47000 after transferFrom()")
      assert.equal(balanceUser2.toNumber(), TRANSFROMNUM, 
        "User1 balance is not 3000 after transferFrom()")
    })
  })
});
