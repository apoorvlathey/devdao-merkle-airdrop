// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DEV is ERC20 {
  constructor(address receiver) ERC20("DEV", "DEV") {
    _mint(receiver, 1_000_000 * (10**decimals()));
  }
}