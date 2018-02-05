import * as Generator from 'yeoman-generator';

export = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Package name:',
        default: this.appname
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
        name: 'entryPoint',
        message: 'Entry point:',
        default: 'index.js'
      },
      {
        type: 'input',
        name: 'testCommand',
        message: 'Test command:',
        default: 'npm run compile && truffle test'
      },
      {
        type: 'input',
        name: 'mainType',
        message: 'Main project type name:',
        default: 'project'
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
        default: ''
      },
      {
        type: 'input',
        name: 'license',
        message: 'License:',
        default: 'ISC'
      },
      {
        type: 'confirm',
        name: 'generateContracts',
        message: 'Would you like to add contracts?'
      }
    ]).then(answers => {
      this.props = answers;
      this.props['mainTypeCamelcase'] =
        this.props['mainType'].charAt(0).toUpperCase() +
        this.props['mainType'].slice(1);

      if (answers.generateContracts) {
        return this.prompt([
          {
            type: 'input',
            name: 'contractsNames',
            message: 'Provide contracts names separated by space:'
          }
        ]).then(answers => {
          console.log(answers.contractsNames);
          this.props['contracts'] = answers.contractsNames.split(' ');
          console.log(this.props['contracts']);
        });
      }
    });
  }

  paths() {}

  writing() {
    this._writingConfig();
    this._writingUtils();
    this._writingTypes();
    this._writingContracts();
    this._writingTest();
    this._writingMigrations();
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
      this.templatePath('_.gitignore'),
      this.destinationPath('.gitignore'),
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
      {
        props: this.props
      }
    );

    this.fs.copyTpl(
      this.templatePath(typesPath + '_web3.d.ts'),
      this.destinationPath(typesPath + 'web3.d.ts'),
      {
        props: this.props
      }
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
      this.templatePath(contractsPath + '_Migrations.sol'),
      this.destinationPath(contractsPath + 'Migrations.sol'),
      {}
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

  // install() {
  //   this.installDependencies();
  // }
};
