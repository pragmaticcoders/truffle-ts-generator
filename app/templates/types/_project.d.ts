declare module '<%= props.mainType %>' {
  import {
    AnyContract,
    Contract,
    ContractBase,
    TransactionOptions,
    TransactionResult,
    TruffleArtifacts
  } from 'truffle';

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

    <% props.contracts.forEach (function (contract) { %>
    interface <%= contract %> extends ContractBase {
    }
    <% }); %>

    interface MigrationsContract extends Contract<Migrations> {
      'new'(options?: TransactionOptions): Promise<Migrations>;
    }

    <% props.contracts.forEach (function (contract) { %>
    interface <%= contract %>Contract extends Contract<<%= contract %>> {
      'new'(options?: TransactionOptions): Promise<<%= contract %>>;
    }
    <% }); %>

    interface <%= props.mainTypeCamelcase %>Artifacts extends TruffleArtifacts {
      require(name: string): AnyContract;
      require(name: './Migrations.sol'): MigrationsContract;
      <% props.contracts.forEach (function (contract) { %>require(name: './<%= contract %>.sol'): <%= contract %>Contract;
      <% }); %>
    }
  }

  export = <%= props.mainType %>;
}
