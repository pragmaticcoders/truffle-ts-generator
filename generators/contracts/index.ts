import * as Generator from 'yeoman-generator';

export = class extends Generator {
  private props: any;

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'newContracts',
        message: 'Provide contracts names separated by space:',
        filter: function(input: any) {
          if (typeof input == 'string') {
            input = input.replace(',', ' ').split(' ');

            for (let i in input) {
              input[i] = input[i].charAt(0).toUpperCase() + input[i].slice(1);
            }
          }

          return input;
        }
      },
      {
        type: 'confirm',
        name: 'examples',
        message: 'Would you like to generate examples?'
      }
    ]).then(answers => {
      const config = this.config.getAll();

      answers['author'] = config.author;
      answers['authorUrl'] = config.authorUrl;
      answers['solidityVersion'] = config.solidityVersion;

      answers['contracts'] = this._removeDuplicatedContracts(
        answers['newContracts'],
        config.contracts
      );

      this.config.set(
        'contracts',
         config.contracts ? config.contracts.concat(answers['contracts']) : answers['contracts']
      );
      this.props = answers;
    });
  }

  writing() {
    this._writingContracts();
    this._writingTest();
  }

  _writingContracts() {
    const contractsPath = 'contracts/';

    for (let key in this.props['contracts']) {
      this.fs.copyTpl(
        this.templatePath(contractsPath + '_ContractBase.sol'),
        this.destinationPath(
          contractsPath + this.props['contracts'][key] + '.sol'
        ),
        {
          props: this.props,
          contractName: this.props['contracts'][key]
        }
      );
    }
  }

  _writingTest() {
    const testPath = 'test/';

    for (let key in this.props['contracts']) {
      this.fs.copyTpl(
        this.templatePath(testPath + '_contractbase.test.ts'),
        this.destinationPath(
          testPath + this.props['contracts'][key].toLowerCase() + '.test.ts'
        ),
        {
          props: this.props,
          contractName: this.props['contracts'][key]
        }
      );
    }
  }

  _removeDuplicatedContracts(newContracts: string[], contracts: any) {
    let noDuplicates: string[] = [];

    if (contracts && contracts.length > 0) {
      for (let newContract of newContracts) {
        if (contracts.indexOf(newContract) > -1) {
          this.log('Skipping duplicate: ' + newContract);
        } else {
          noDuplicates.push(newContract);
        }
      }
    } else {
      noDuplicates = newContracts;
    }

    return noDuplicates;
  }
};
