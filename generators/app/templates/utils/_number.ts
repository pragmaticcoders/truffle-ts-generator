import { BigNumber } from 'bignumber.js';
import { AnyNumber } from 'web3';

export const ETH_DECIMALS = 18;
export const FINNEY_DECIMALS = 15;
export const SZABO_DECIMALS = 12;
export const GWEI_DECIMALS = 9;
export const MWEI_DECIMALS = 6;
export const KWEI_DECIMALS = 3;
export const WEI_DECIMALS = 0;

export const UNITS = [
  { decimals: ETH_DECIMALS, unit: 'ether' },
  { decimals: FINNEY_DECIMALS, unit: 'finney' },
  { decimals: SZABO_DECIMALS, unit: 'szabo' },
  { decimals: GWEI_DECIMALS, unit: 'gwei' },
  { decimals: MWEI_DECIMALS, unit: 'mwei' },
  { decimals: KWEI_DECIMALS, unit: 'kwei' },
  { decimals: WEI_DECIMALS, unit: 'wei' }
];

export function toFinney(eth: AnyNumber) {
  return shiftNumber(eth, ETH_DECIMALS - FINNEY_DECIMALS);
}

export function toSzabo(eth: AnyNumber) {
  return shiftNumber(eth, ETH_DECIMALS - SZABO_DECIMALS);
}

export function toGwei(eth: AnyNumber) {
  return shiftNumber(eth, ETH_DECIMALS - GWEI_DECIMALS);
}

export function toMwei(eth: AnyNumber) {
  return shiftNumber(eth, ETH_DECIMALS - MWEI_DECIMALS);
}

export function toKwei(eth: AnyNumber) {
  return shiftNumber(eth, ETH_DECIMALS - KWEI_DECIMALS);
}

export function toWei(eth: AnyNumber) {
  return shiftNumber(eth, ETH_DECIMALS);
}

export function fromEth(eth: AnyNumber) {
  return shiftNumber(eth, ETH_DECIMALS);
}

export function fromFinney(finney: AnyNumber) {
  return shiftNumber(finney, FINNEY_DECIMALS);
}

export function fromSzabo(szabo: AnyNumber) {
  return shiftNumber(szabo, SZABO_DECIMALS);
}

export function fromGwei(gwei: AnyNumber) {
  return shiftNumber(gwei, GWEI_DECIMALS);
}

export function fromMwei(mwei: AnyNumber) {
  return shiftNumber(mwei, MWEI_DECIMALS);
}

export function fromKwei(kwei: AnyNumber) {
  return shiftNumber(kwei, KWEI_DECIMALS);
}

export function shiftNumber(num: AnyNumber, decimals: number): BigNumber {
  const factor = new BigNumber(10).pow(decimals);
  return new BigNumber(num).multipliedBy(factor);
}

export function ceil(num: AnyNumber) {
  return new BigNumber(num).integerValue(BigNumber.ROUND_CEIL);
}

export function floor(num: AnyNumber) {
  return new BigNumber(num).integerValue(BigNumber.ROUND_FLOOR);
}

export function toUnitString(wei: AnyNumber) {
  const digits = floor(wei).toFixed(0).length;

  for (const { decimals, unit } of UNITS) {
    if (digits > decimals) {
        return `${shiftNumber(wei, -decimals).toFixed()} ${unit}`;
    }
  }

  throw new Error('Invalid wei number');
}
