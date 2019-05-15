pragma solidity <%= props.solidityVersion %>;


/**
 * @title <%= contractName %>
 * @dev <%= contractName %> contract allows to..<% if (props.author !== '') { %>
 * @author <%= props.author %> <% if (props.authorUrl !== '') { %>(<%= props.authorUrl %>)<% } %><% } %>
 */
contract <%= contractName %> {
    <% if (props.examples) { %>
    uint256 public exampleAttribute;

    modifier onlyExampleCondition(uint256 value) {
        require(value > 10);
        _;
    }

    event ExampleAttributeChanged(uint256 newValue);

    constructor() public {
        exampleAttribute = 10;
    }

    function exampleFunction(uint256 newValue)
        public
        onlyExampleCondition(newValue)
    {
        exampleAttribute = newValue;

        emit ExampleAttributeChanged(newValue);
    }<% } %>
}
