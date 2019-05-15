import * as Web3 from 'web3';

import { BigNumber } from 'bignumber.js';
import { assert } from 'chai';
import { findLast, propEq } from 'ramda';
import { TransactionLog, TransactionOptions, TransactionResult } from 'truffle';

import { fromEth, toUnitString } from '../utils';

declare const web3: Web3;

export const ZERO_ADDRESS = '0x' + '0'.repeat(40);
export const HUNDRED_PERCENT = fromEth(1);
export const ACCEPTABLE_ERROR = 0.001;

export function fromHours(hours: number) {
  return Math.round(hours * 60 * 60);
}

export function toPercent(num: Web3.AnyNumber) {
  return `${new BigNumber(num).multipliedBy(100).toFixed()}%`;
}

export async function assertReverts(func: () => void) {
  try {
    await func();
  } catch (error) {
    assertRevertError(error);
    return;
  }
  assert.fail({}, {}, 'Should have reverted');
}

export function assertRevertError(error: { message: string }) {
  if (error && error.message) {
    if (error.message.search('revert') === -1) {
      assert.fail(error, {}, 'Expected revert error, instead got: ' + error.message);
    }
  } else {
    assert.fail(error, {}, 'Expected revert error');
  }
}

export function assertNumberEqual(actual: Web3.AnyNumber, expect: Web3.AnyNumber) {
  const actualNum = new BigNumber(actual);
  const expectNum = new BigNumber(expect);

  if (!actualNum.eq(expectNum)) {
    assert.fail(actualNum.toFixed(), expectNum.toFixed(), `${actualNum.toFixed()} == ${expectNum.toFixed()}`, '==');
  }
}

export function assertValueEqual(actual: Web3.AnyNumber, expect: Web3.AnyNumber) {
  const actualNum = new BigNumber(actual);
  const expectNum = new BigNumber(expect);

  if (!actualNum.eq(expectNum)) {
    assert.fail(
      toUnitString(actualNum),
      toUnitString(expectNum),
      `${toUnitString(actualNum)} == ${toUnitString(expectNum)}`,
      '=='
    );
  }
}

export function assertValueAlmostEqual(
  actual: Web3.AnyNumber,
  expect: Web3.AnyNumber,
  epsilon: Web3.AnyNumber = ACCEPTABLE_ERROR
) {
  const actualNum = new BigNumber(actual);
  const expectNum = new BigNumber(expect);
  const epsilonAbsolute = expectNum.multipliedBy(epsilon);

  if (actualNum.isLessThan(expectNum.minus(epsilonAbsolute)) ||
    actualNum.isGreaterThan(expectNum.plus(epsilonAbsolute))) {
    assert.fail(
      actualNum.toFixed(),
      expectNum.toFixed(),
      `${toUnitString(actualNum)} == ${toUnitString(expectNum)} ` + `(precision ${toUnitString(epsilonAbsolute)})`,
      '=='
    );
  }
}

export function findLastLog(trans: TransactionResult, event: string): TransactionLog {
  return findLast(propEq('event', event))(trans.logs);
}

export function createSignature(
  signer: Address,
  destination: Address,
  nonce: Web3.AnyNumber,
  web3Lib: Web3,
  parameters: any[]
): string {
  function stripHex(hex: string): string {
    return hex.startsWith('0x') ? hex.slice(2) : hex;
  }

  function numToHex(num: Web3.AnyNumber, len: number): string {
    const hex = new BigNumber(num).toString(16);
    const padLen = len - hex.length + 1;
    const padStr = new Array(padLen).join('0');
    return hex.length < len ? padStr.concat(hex) : hex;
  }

  function stringToHex(str: string, len: number): string {
    return Buffer.from(str).toString('hex');
  }

  function normalizeParams(params: any[]): any[] {
    const normalized: any[] = [];

    for (const param of params) {
      if (typeof param === 'number') {
        normalized.push(numToHex(param, 64));
      } else if (param.startsWith('0x')) {
        normalized.push(stripHex(param));
      } else {
        normalized.push(stringToHex(param, 64));
      }
    }

    return normalized;
  }

  const prefix = 0x19;
  const version = 0x0;

  const message = [
    '0x',
    numToHex(prefix, 2),
    numToHex(version, 2),
    stripHex(destination),
    ...normalizeParams(parameters),
    numToHex(nonce, 64)
  ].join('');

  const hash = web3Lib.sha3(message, { encoding: 'hex' });

  const signature = web3Lib.eth.sign(signer, hash);

  return signature;
}
