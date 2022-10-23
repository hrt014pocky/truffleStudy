// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./ApeCoin.sol";

contract EthSwap {


  string public name = "EthSwap Instant Exchange";
  ApeCoin public token;
  uint public rate = 100;

  event TokenPurchased(
    address account,
    address token,
    uint256 tokenAmount,
    uint256 rate
  );

  event TokenSold(
    address account,
    address token,
    uint256 tokenAmount,
    uint256 rate
  );

  constructor(ApeCoin _token) {
    token = _token;
  }

  function buyTokens() public payable returns (bool success) {
    //1. 计算购买的代币数量
    //2. 判断合约的代币余额是否充足
    //3. 代币转账
    //4. 发射消息

    uint256 tokenAmount = rate * msg.value;
    require(token.balanceOf(address(this)) > tokenAmount);
    token.transfer(msg.sender, tokenAmount);
    emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);

    return true;
  }

  function sellTokens(uint256 _amount) public returns (bool success) {
    //1. 计算卖出代币等值的以太数量
    //2. 判断账户是否有充足的代币
    //3. 判断合约中的以太数量是否充足
    //4. 代币转账
    //5. 以太转账
    //6. 发射消息

    uint256 etherAmount = _amount / rate;
    require(token.balanceOf(msg.sender) >= _amount, "Not enough tokens" );
    require(address(this).balance >= etherAmount, "Contract ether not enough");

    address payable seller = payable(msg.sender);
    token.transferFrom(msg.sender, address(this), _amount);
    seller.transfer(etherAmount);

    emit TokenSold(msg.sender, address(token), _amount, rate);
    return true;
  }
}

