// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TestToken
 * @dev A Token ERC20 token for crowdfunding campaigns.
 */
contract Token is ERC20, Ownable {
    constructor() ERC20("Token", "TK") {}

    /**
     * @dev Mints `_amount` tokens to `_to` address.
     * Only the owner (deployer) can call this function.
     */
    function mint(address _to, uint256 _amount) external onlyOwner {
        _mint(_to, _amount);
    }
}