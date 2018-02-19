declare module '<%= props.mainType %>' {
  import { BigNumber } from 'bignumber.js';
  import {
    AnyContract,
    Contract,
    ContractBase,
    TransactionOptions,
    TransactionResult,
    TruffleArtifacts
  } from 'truffle';
    import { AnyNumber } from 'web3';

  namespace <%= props.mainType %> {
    interface Migrations extends ContractBase {
      setCompleted(
        completed: number,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      upgrade(
        address: Address,
        options?: TransactionOptions
      ): Promise<TransactionResult>;
    }
    <% for (key in props.contracts) { %>
    interface <%= props.contracts[key] %> extends ContractBase {
      <% if (props.examples) { %>exampleAttribute(): Promise<BigNumber>;

      exampleFunction(
        newValue: AnyNumber,
        options?: TransactionOptions
      ): Promise<TransactionResult>;<% } %>
    }
    <% }; %>
    <% if (props.examples) { %>
    interface ExampleAttributeChangedEvent {
      newValue: BigNumber;
    }<% } %>

    interface MigrationsContract extends Contract<Migrations> {
      'new'(options?: TransactionOptions): Promise<Migrations>;
    }
    <% for (key in props.contracts) { %>
    interface <%= props.contracts[key] %>Contract extends Contract<<%= props.contracts[key] %>> {
      'new'(options?: TransactionOptions): Promise<<%= props.contracts[key] %>>;
    }
    <% }; %>
    interface <%= props.mainTypeCamelcase %>Artifacts extends TruffleArtifacts {
      require(name: string): AnyContract;
      require(name: './Migrations.sol'): MigrationsContract;<% for (key in props.contracts) { %>
      require(name: './<%= props.contracts[key] %>.sol'): <%= props.contracts[key] %>Contract;<% }; %>
    }
  }

  export = <%= props.mainType %>;
}
