declare type Callback<T> = (err: Error | null, value: T) => void;

declare type Address = string;

declare module 'web3' {
  import { BigNumber } from 'bignumber.js';

  class Web3 {
    public eth: {
      accounts: Address[];
      defaultAccount: Address;

      getBlockNumber(callback: Callback<number>): void;
      getBlock(block: number, callback: Callback<Web3.Block>): void;

      sendTransaction(txData: Web3.TxData, callback: Callback<string>): void;
      getBalance(account: Address, callback: Callback<BigNumber>): void;
      sign(account: Address, text: string): string;
    };

    public version: {
      getNetwork(cb: Callback<string>): void;
    };

    public constructor(provider?: Web3.Provider);

    public sha3(str: string, options?: { encoding: 'hex' }): string;

    public toDecimal(hex: string): number;
    public toHex(num: number): string;
  }

  namespace Web3 {
    type AnyNumber = number | string | BigNumber;

    interface RequestPayload {
      params: any[];
      method: string;
      id: number;
      jsonrpc: string;
    }

    interface ResponsePayload {
      result: any;
      id: number;
      jsonrpc: string;
    }

    interface Provider {
      sendAsync(payload: RequestPayload, callback: (err: Error | null, result: ResponsePayload) => void): void;
    }

    interface TxData {
      from?: Address;
      to: Address;
      value?: AnyNumber;
      gas?: AnyNumber;
      gasPrice?: AnyNumber;
      data?: string;
      nonce?: AnyNumber;
    }

    interface Block {
      number: number;
      hash: string;
      parentHash: string;
      nonce: string;
      sha3Uncles: string;
      logsBloom: string;
      transactionsRoot: string;
      stateRoot: string;
      receiptsRoot: string;
      miner: string;
      difficulty: BigNumber;
      totalDifficulty: BigNumber;
      extraData: string;
      size: number;
      gasLimit: number;
      gasUsed: number;
      timestamp: number;
      transactions: string[];
      uncles: string[];
    }
  }

  export = Web3;
}
