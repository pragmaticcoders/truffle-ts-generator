import { assert } from 'chai';

import * as Web3 from 'web3';

import { <%= contractName %>, <%= props.mainTypeCamelcase %>Artifacts } from '<%= props.mainType %>';

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
  const owner = accounts[0];
  let myContract: <%= contractName %>;

  describe('#ctor', () => {
    it('should create contract', async () => {
      myContract = await <%= contractName %>Contract.new({ from: owner });
      assert.isOk(contract);
    });
  });
});
