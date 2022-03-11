// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ResodeToken {
    string public symbol = 'RESO';
    string public name = 'Resode Token';
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint)) public allowed; 

    constructor() {
        symbol = 'RESO';
        name = 'Resode Token';
        decimals = 10;
        totalSupply = 1000000;
    }


    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(_to != address(0)); 
        require(_value <= balanceOf[msg.sender]);
        balanceOf[msg.sender] = balanceOf[msg.sender] - _value;
        balanceOf[_to] = balanceOf[_to] + _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[msg.sender]);// ?
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint  _value) public returns (bool success) {
        require(_value <= allowed[_from][msg.sender]);
        require(_value <= balanceOf[_from]);
        balanceOf[_from] = balanceOf[_from] - _value;
        balanceOf[_to] = balanceOf[_to] + _value;
        allowed[_from][msg.sender] = allowed[_from][msg.sender] - _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
