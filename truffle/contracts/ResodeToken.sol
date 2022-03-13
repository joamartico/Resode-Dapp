// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ResodeToken {
    string public symbol;
    string public name;
    uint256 public totalSupply;
    uint256 public decimals;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowed;

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    constructor() {
        symbol = 'RESODE';
        name = 'Resode Token';
        totalSupply = 1000000000;
        decimals = 0;

        balanceOf[msg.sender] = 10000;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        // require(_value <= balanceOf[msg.sender]);// ?
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(_value <= allowed[_from][msg.sender]);
        require(_value <= balanceOf[_from]);
        balanceOf[_from] = balanceOf[_from] - _value;
        balanceOf[_to] = balanceOf[_to] + _value;
        allowed[_from][msg.sender] = allowed[_from][msg.sender] - _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
