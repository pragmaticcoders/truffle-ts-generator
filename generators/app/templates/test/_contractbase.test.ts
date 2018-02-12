import { assert } from 'chai';

import * as Web3 from 'web3';

import {
  <%= contractName %>,<% if (props.examples) { %>
  ExampleAttributeChangedEvent,<% }; %>
  <%= props.mainTypeCamelcase %>Artifacts,
} from '<%= props.mainType %>';

import { ContractContextDefinition } from 'truffle';
import {
  assertNumberEqual,
  assertReverts,
  findLastLog,
  ZERO_ADDRESS
} from './helpers';

declare const web3: Web3;
declare const artifacts: <%= props.mainTypeCamelcase %>Artifacts;
declare const contract: ContractContextDefinition;

const <%= contractName %>Contract = artifacts.require('./<%= contractName %>.sol');

contract('<%= contractName %>', accounts => {
  <% if (props.examples) { %>const owner = accounts[9];
  let myContract: <%= contractName %>;

  describe('#ctor', () => {
    it('should set exampleAttribute', async () => {
      myContract = await <%= contractName %>Contract.new({ from: owner });
      assert.isOk(contract);
      assertNumberEqual(await myContract.exampleAttribute(), 10);
    });
  });

  describe('#exampleFunction', () => {
    const newValue = 15;

    beforeEach(async () => {
        myContract = await <%= contractName %>Contract.new({ from: owner });
    });

    it('should set exampleAttribute to newValue', async () => {
      await myContract.exampleFunction(newValue, { from: owner });
      assertNumberEqual(await myContract.exampleAttribute(), newValue);
    });

    it('should emit ExampleAttributeChanged event', async () => {
      const tx = await myContract.exampleFunction(newValue, { from: owner });

      const log = findLastLog(tx, 'ExampleAttributeChanged');
      assert.isOk(log);

      const event = log.args as ExampleAttributeChangedEvent;
      assertNumberEqual(event.newValue, newValue);
    });

    it('should revert for invalid value', async () => {
      await assertReverts(async () => {
        await myContract.exampleFunction(5, { from: owner });
      });
    });
  });<% }; %>
});
