import * as Generator from 'yeoman-generator';
import { slugify } from './helpers';

export = class extends Generator {
  private props: any;

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Package name:',
        default: this.appname,
        filter: function(input: string) {
          return slugify(input);
        }
      },
      {
        type: 'input',
        name: 'version',
        message: 'Version:',
        default: '1.0.0'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description:',
        default: ''
      },
      {
        type: 'input',
        name: 'gitRepository',
        message: 'Git repository:',
        default: ''
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author:',
        default: ''
      },
      {
        type: 'input',
        name: 'authorUrl',
        message: 'Author url:',
        default: '',
        when: answers => {
          return answers.author !== '';
        }
      },
      {
        type: 'input',
        name: 'license',
        message: 'License:',
        default: 'ISC'
      },
      {
        type: 'input',
        name: 'mainType',
        message: 'Main project type name:',
        default: 'project',
        filter: function(input: string) {
          return input.toLowerCase();
        }
      },
      {
        type: 'confirm',
        name: 'generateContracts',
        message: 'Would you like to generate contracts?'
      },
      {
        type: 'input',
        name: 'contracts',
        message: 'Provide contracts names separated by space:',
        when: answers => {
          return answers.generateContracts;
        },
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
        message: 'Would you like to generate examples?',
        when: answers => {
          return answers.generateContracts;
        }
      },
      {
        type: 'input',
        name: 'solidityVersion',
        message: 'Set Solidity version:',
        default: ''
      },
    ]).then(answers => {
      answers['mainTypeCamelcase'] =
        answers['mainType'].charAt(0).toUpperCase() +
        answers['mainType'].slice(1);
      this.props = answers;
    });
  }

  configuring() {
    this._storePromptValues();
  }

  writing() {
    this._writingConfig();
    this._writingUtils();
    this._writingTypes();
    this._writingContracts();
    this._writingTest();
    this._writingMigrations();
  }

  install() {
    this.installDependencies({
      bower: false,
      npm: true
    }).then(() => console.log("You're ready to go!"));
  }

  _storePromptValues() {
    this.config.set('name', this.props['name']);
    this.config.set('mainType', this.props['mainType']);
    if (this.props.hasOwnProperty('author')) {
      this.config.set('author', this.props['author']);
    }
    if (this.props.hasOwnProperty('authorUrl')) {
      this.config.set('authorUrl', this.props['authorUrl']);
    }
    if (this.props.hasOwnProperty('contracts')) {
      this.config.set('contracts', this.props['contracts']);
    }
    this.config.set('solidityVersion', this.props['solidityVersion']);
  }

  _writingConfig() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        props: this.props
      }
    );
    this.fs.copyTpl(
      this.templatePath('_tsconfig.json'),
      this.destinationPath('tsconfig.json'),
      {
        props: this.props
      }
    );
    this.fs.copyTpl(
      this.templatePath('_tslint.json'),
      this.destinationPath('tslint.json'),
      {
        props: this.props
      }
    );
    this.fs.copyTpl(
      this.templatePath('_truffle-config.ts'),
      this.destinationPath('truffle-config.ts'),
      {
        props: this.props
      }
    );
    this.fs.copyTpl(
      this.templatePath('_.prettierignore'),
      this.destinationPath('.prettierignore'),
      {
        props: this.props
      }
    );
    this.fs.copyTpl(
      this.templatePath('_.prettierrc'),
      this.destinationPath('.prettierrc'),
      {
        props: this.props
      }
    );
    this.fs.copyTpl(
      this.templatePath('_.soliumignore'),
      this.destinationPath('.soliumignore'),
      {
        props: this.props
      }
    );
    this.fs.copyTpl(
      this.templatePath('_.soliumrc.json'),
      this.destinationPath('.soliumrc.json'),
      {
        props: this.props
      }
    );
    this.fs.copyTpl(
      this.templatePath('_.solhint.json'),
      this.destinationPath('.solhint.json'),
      {
        props: this.props
      }
    );
    this.fs.copyTpl(
      this.templatePath('_.gitignore'),
      this.destinationPath('.gitignore'),
      {
        props: this.props
      }
    );
    this.fs.copyTpl(
      this.templatePath('_.gitlab-ci.yml'),
      this.destinationPath('.gitlab-ci.yml'),
      {
        props: this.props
      }
    );
  }

  _writingUtils() {
    const utlisPath = 'utils/';

    this.fs.copyTpl(
      this.templatePath(utlisPath + '_block.ts'),
      this.destinationPath(utlisPath + 'block.ts'),
      {}
    );
    this.fs.copyTpl(
      this.templatePath(utlisPath + '_common.ts'),
      this.destinationPath(utlisPath + 'common.ts'),
      {}
    );
    this.fs.copyTpl(
      this.templatePath(utlisPath + '_index.ts'),
      this.destinationPath(utlisPath + 'index.ts'),
      {}
    );
    this.fs.copyTpl(
      this.templatePath(utlisPath + '_number.ts'),
      this.destinationPath(utlisPath + 'number.ts'),
      {}
    );
    this.fs.copyTpl(
      this.templatePath(utlisPath + '_regex.ts'),
      this.destinationPath(utlisPath + 'regex.ts'),
      {}
    );
    this.fs.copyTpl(
      this.templatePath(utlisPath + '_web3.ts'),
      this.destinationPath(utlisPath + 'web3.ts'),
      {}
    );
  }

  _writingTypes() {
    const typesPath = 'types/';

    this.fs.copyTpl(
      this.templatePath(typesPath + '_truffle.d.ts'),
      this.destinationPath(typesPath + 'truffle.d.ts'),
      {}
    );

    this.fs.copyTpl(
      this.templatePath(typesPath + '_web3.d.ts'),
      this.destinationPath(typesPath + 'web3.d.ts'),
      {}
    );

    this.fs.copyTpl(
      this.templatePath(typesPath + '_project.d.ts'),
      this.destinationPath(typesPath + this.props['mainType'] + '.d.ts'),
      {
        props: this.props
      }
    );
  }

  _writingContracts() {
    const contractsPath = 'contracts/';
    
    this.fs.copyTpl(
      this.templatePath(contractsPath + '_Ownable.sol'),
      this.destinationPath(contractsPath + 'Ownable.sol'),
      { props: this.props }
    );

    this.fs.copyTpl(
      this.templatePath(contractsPath + '_Migrations.sol'),
      this.destinationPath(contractsPath + 'Migrations.sol'),
      { props: this.props }
    );

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

  _writingMigrations() {
    const migrationsPath = 'migrations/';

    this.fs.copyTpl(
      this.templatePath(migrationsPath + '_1_initial_migration.ts'),
      this.destinationPath(migrationsPath + '1_initial_migration.ts'),
      {
        props: this.props
      }
    );
  }

  _writingTest() {
    const testPath = 'test/';

    this.fs.copyTpl(
      this.templatePath(testPath + '_helpers.ts'),
      this.destinationPath(testPath + 'helpers.ts'),
      {}
    );

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
};
