// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './ResodeToken.sol';

contract ResodeTokenSale {
    address admin;
    uint256 public tokenPrice;
    uint256 public tokensSold;
    ResodeToken public tokenContract;

    event Sell(address _buyer, uint256 _amount);

    constructor(ResodeToken _tokenContract, uint256 _tokenPrice) {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == multiply(_numberOfTokens, tokenPrice));
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);
        require(tokenContract.transfer(msg.sender, _numberOfTokens));

        tokensSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    function endSale() public {
        require(msg.sender == admin);
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));

        selfdestruct(payable(admin));
    }
}
 