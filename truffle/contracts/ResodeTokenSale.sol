// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import './ResodeToken.sol';

contract ResodeTokenSale {
    address admin;
    ResodeToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address _buyer, uint256 _amount);

    constructor(ResodeToken _tokenContract, uint256 _tokenPrice) {
        admin = payable(msg.sender);
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;

        // asignar 100000 tokens a address(this)
        // tokenContract.transfer(admin, 111111);
        // tokenContract.balanceOf[msg.sender] = 10000;

    }

    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == multiply(_numberOfTokens, tokenPrice));
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens); 

        require(tokenContract.transfer(msg.sender, _numberOfTokens));

        // transfer msg.value to admin
        // tokenContract.transfer(admin, msg.value); ?? 


        tokensSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    function endSale() public {
        require(msg.sender == admin);
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));

        // admin.transfer(address(this).balance);

        tokenContract.transfer(admin, tokenContract.balanceOf(address(this)));
        // transfer all unsold tokens to admin
    }
}

// interface ResodeToken {
//     function decimals () external view returns (uint8);
//     function balanceOf(address _address) external view returns (uint256);
//     function transfer(address _to, uint256 _value) external returns (bool);
// }

// // import './ResodeToken.sol';

// contract ResodeTokenSale {
//     address admin;
//     ResodeToken tokenContract;
//     uint256 public tokenPrice;
//     uint256 public tokensSold;

//     event Sell(address _buyer, uint256 _amount);

//     constructor(address _addressTokenContract, uint256 _tokenPrice) {
//         admin = msg.sender;
//         tokenContract = ResodeToken(_addressTokenContract);
//         tokenPrice = _tokenPrice;
//     }

//     function multiply(uint x, uint y) internal pure returns (uint z) {
//         require(y == 0 || (z = x * y) / y == x);
//     }

//     function buyTokens(uint _numberOfTokens) public payable {
//         require(msg.value == multiply(_numberOfTokens, tokenPrice));
//         require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);
//         require(tokenContract.transfer(msg.sender, _numberOfTokens)); // el contrato le paga al comprador

//         tokensSold += _numberOfTokens;

//         emit Sell(msg.sender, _numberOfTokens);
//     }

//     // function endSale() public {
//     //     require(msg.sender == admin);
//     //     require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));

//     //     selfdestruct(payable(admin));
//     // }
// }
