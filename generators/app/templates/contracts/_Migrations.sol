pragma solidity <%= props.solidityVersion %>;

import { Ownable } from "./Ownable.sol";

/**
 * @title Truffle Migrations contract
 * @dev It violates standard naming convention for compatibility with Truffle suite
 * @dev It extends standard implementation with changeable owner.
 */
contract Migrations is Ownable {
    /* solhint-disable var-name-mixedcase */
    /* solhint-disable func-param-name-mixedcase */

    uint public last_completed_migration;

    function setCompleted(uint completed) public onlyOwner
    {
        last_completed_migration = completed;
    }

    function upgrade(address new_address) public onlyOwner
    {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_completed_migration);
    }

    /* solhint-enable var-name-mixedcase */
    /* solhint-enable func-param-name-mixedcase */
}
