    // SPDX-License-Identifier: MIT
    pragma solidity >=0.4.0 < 0.9.0;
    
   
    
    contract Token{
        
        uint256 constant private MAX_UINT256 = 2**256 - 1;
        mapping (address => uint256) public balances;
        mapping (address => mapping (address => uint256)) public allowed;
        uint256 public totalSupply;
    
        string public name;                   
        uint8 public decimals;                //How many decimals to show.
        string public symbol;
        
        event Transfer(address indexed _from, address indexed _to, uint256 _value);
        
        event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    
        constructor() public {
            balances[msg.sender] = 100000;               // Give the creator all initial tokens
            totalSupply = 100000;                        // Update total supply
            name = "Launchnodes";                                   // Set the name for display purposes
            decimals = 2;                            // Amount of decimals for display purposes
            symbol = "LNs";                               // Set the symbol for display purposes
        }
    
        function transfer(address _to, uint256 _value) public returns (bool success) {
            require(balances[msg.sender] >= _value, "token balance is lower than the value requested");
            balances[msg.sender] -= _value;
            balances[_to] += _value;
            emit Transfer(msg.sender, _to, _value); 
            return true;
        }
    
        function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
            uint256 _allowance = allowed[_from][msg.sender];
            require(balances[_from] >= _value && _allowance >= _value, "token balance or allowance is lower than amount requested");
            balances[_to] += _value;
            balances[_from] -= _value;
            if (_allowance < MAX_UINT256) {
                allowed[_from][msg.sender] -= _value;
            }
            emit Transfer(_from, _to, _value); 
            return true;
        }
    
        function balanceOf(address _owner) public view returns (uint256 balance) {
            return balances[_owner];
        }
    
        function approve(address _spender, uint256 _value) public returns (bool success) {
            allowed[msg.sender][_spender] = _value;
            emit Approval(msg.sender, _spender, _value); //solhint-disable-line indent, no-unused-vars
            return true;
        }
    
        function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
            return allowed[_owner][_spender];
        }
    }