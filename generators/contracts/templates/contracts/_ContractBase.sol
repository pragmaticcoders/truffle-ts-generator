pragma solidity <%= props.solidityVersion %>;

/**
 * @title YOUR CONTRACT TITLE
 * @dev YOUR CONTRACT DESCRIPTION<% if (props.author !== '') { %>
 * @author <%= props.author %> <% if (props.authorUrl !== '') { %>(<%= props.authorUrl %>)<% } %><% } %>
 */
contract <%= contractName %> {

    function <%= contractName %>() public {

    }
}
