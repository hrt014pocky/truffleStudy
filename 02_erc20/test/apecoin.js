const ApeCoin = artifacts.require("ApeCoin");

contract('ApeCoin', (accounts) => {
  

  it('should get apecoin name, symbol, decimals and totalSupply correctly', async () => {
    const ApeCoinInstance = await ApeCoin.deployed();
    const name = await ApeCoinInstance.name();
    const symbol = await ApeCoinInstance.symbol();
    const decimals = await ApeCoinInstance.decimals();
    const totalSupply = await ApeCoinInstance.totalSupply();

    assert.equal(name, "Ape Coin", "Name is wrong");
    assert.equal(symbol, "APE", "Symbol is wrong");
    assert.equal(decimals, 4 , "Decimals is wrong");
    assert.equal(totalSupply, 10000000000 , "TotalSupply is wrong");
  });

  it('should put 10000000000 ApeCoin in the first account', async () => {
    const ApeCoinInstance = await ApeCoin.deployed();
    const balance = await ApeCoinInstance.balanceOf(accounts[0]);

    assert.equal(balance.valueOf(), 10000000000, "10^10 wasn't in the first account");
  });

  

  /*
  it('should put 10000 ApeCoin in the first account', async () => {
    const ApeCoinInstance = await ApeCoin.deployed();
    const balance = await ApeCoinInstance.getBalance.call(accounts[0]);

    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });
  it('should call a function that depends on a linked library', async () => {
    const ApeCoinInstance = await ApeCoin.deployed();
    const ApeCoinBalance = (await ApeCoinInstance.getBalance.call(accounts[0])).toNumber();
    const ApeCoinEthBalance = (await ApeCoinInstance.getBalanceInEth.call(accounts[0])).toNumber();

    assert.equal(ApeCoinEthBalance, 2 * ApeCoinBalance, 'Library function returned unexpected function, linkage may be broken');
  });
  it('should send coin correctly', async () => {
    const ApeCoinInstance = await ApeCoin.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await ApeCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await ApeCoinInstance.getBalance.call(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await ApeCoinInstance.sendCoin(accountTwo, amount, { from: accountOne });

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await ApeCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await ApeCoinInstance.getBalance.call(accountTwo)).toNumber();

    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
  */
});
